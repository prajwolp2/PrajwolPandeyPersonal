import React, { useEffect, useMemo, useRef, useState } from 'react';
import Reveal from './Reveal';

/*
 * The live bot's pricing math (kalshi_paper/model.py), simplified for the page:
 * a fixed volatility, no settlement-index gap correction, and a 1¢ spread.
 */
const STRIKE = 60000;
const VOL_PER_MIN = 0.00066; // a typical stdev of BTC 1-minute log returns
const SIGMA_S = (1.05 * VOL_PER_MIN) / Math.sqrt(60);
const MIN_EDGE = 2; // cents per contract, after fees
const BASE_SIZE = 10; // the edge check always uses the fee at 10 contracts
const GAP_MIN = -300;
const GAP_MAX = 300;

// Abramowitz & Stegun 7.1.26, accurate to about 1e-7.
function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

const normCdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));

/** Chance (0–1) that BTC settles at or above the strike. Settlement averages the last 60 s, so the horizon is T − 40 s. */
function fairYes(gap, secondsLeft) {
  const z = Math.log((STRIKE + gap) / STRIKE) / (SIGMA_S * Math.sqrt(secondsLeft - 40));
  return normCdf(z);
}

/** Taker fee in cents per contract: 7% × contracts × P × (1 − P), rounded up to the cent per order. */
function feePerContract(priceCents) {
  const p = priceCents / 100;
  return Math.ceil(7 * BASE_SIZE * p * (1 - p) - 1e-9) / BASE_SIZE;
}

function evaluate({ gap, minutesLeft, yesAsk, trend }) {
  const fair = fairYes(gap, minutesLeft * 60) * 100;
  const noAsk = 101 - yesAsk;
  const feeYes = feePerContract(yesAsk);
  const feeNo = feePerContract(noAsk);
  const edgeYes = fair - yesAsk - feeYes;
  const edgeNo = 100 - fair - noAsk - feeNo;
  const mid = yesAsk - 0.5;

  let decision;
  if (mid < 10 || mid > 90) {
    decision = { buy: null, reason: 'The YES price is outside 10–90¢, so the bot skips.' };
  } else if (trend === 'none') {
    decision = { buy: null, reason: 'No clear BTC trend, so the bot skips.' };
  } else {
    const side = trend === 'up' ? 'YES' : 'NO';
    const edge = side === 'YES' ? edgeYes : edgeNo;
    decision =
      edge >= MIN_EDGE
        ? { buy: side, reason: `${fmtCents(edge, true)} of edge after fees, and the trend agrees.` }
        : { buy: null, reason: `The trend says ${side}, but its edge is under 2¢ after fees.` };
  }

  return { fair, noAsk, feeYes, feeNo, edgeYes, edgeNo, decision };
}

function fmtCents(c, signed = false) {
  const v = Math.round(c * 10) / 10;
  const s = `${Math.abs(v).toFixed(1)}¢`;
  if (!signed) return s;
  return v > 0 ? `+${s}` : v < 0 ? `−${s}` : s;
}

const fmtGap = (g) => (g === 0 ? '$0' : `${g > 0 ? '+' : '−'}$${Math.abs(g)}`);

function useWidth(ref, fallback) {
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

function Chart({ gap, minutesLeft, yesAsk, feeYes, noAsk, feeNo, fair }) {
  const wrap = useRef(null);
  const width = useWidth(wrap, 560);
  const height = width < 480 ? 220 : Math.round(Math.min(380, Math.max(240, width * 0.5)));
  const pad = { l: 44, r: 12, t: 12, b: 30 };
  const w = Math.max(width - pad.l - pad.r, 10);
  const h = height - pad.t - pad.b;
  const x = (g) => pad.l + ((g - GAP_MIN) / (GAP_MAX - GAP_MIN)) * w;
  const y = (c) => pad.t + (1 - c / 100) * h;

  const points = useMemo(() => {
    const out = [];
    for (let g = GAP_MIN; g <= GAP_MAX; g += 5) out.push([g, fairYes(g, minutesLeft * 60) * 100]);
    return out;
  }, [minutesLeft]);

  const curve = points.map(([g, c], i) => `${i ? 'L' : 'M'}${x(g).toFixed(1)},${y(c).toFixed(1)}`).join('');

  // Shade where the model clears the price + fee + 2¢ on each side.
  const yesLine = y(Math.min(yesAsk + feeYes + MIN_EDGE, 100));
  const noLine = y(Math.max(100 - noAsk - feeNo - MIN_EDGE, 0));
  const zone = (edgeY, pick) =>
    points.map(([g, c], i) => `${i ? 'L' : 'M'}${x(g).toFixed(1)},${pick(y(c), edgeY).toFixed(1)}`).join('') +
    `L${x(GAP_MAX).toFixed(1)},${edgeY.toFixed(1)}L${x(GAP_MIN).toFixed(1)},${edgeY.toFixed(1)}Z`;

  return (
    <div ref={wrap} className="demo__chart">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Model chance of YES across BTC moves from −$300 to +$300 with ${minutesLeft} minutes left. At ${fmtGap(gap)} the model says ${fair.toFixed(1)}%.`}
      >
        {[0, 25, 50, 75, 100].map((c) => (
          <g key={c}>
            <line className="demo__grid" x1={pad.l} x2={pad.l + w} y1={y(c)} y2={y(c)} />
            {c % 50 === 0 && (
              <text className="demo__tick" x={pad.l - 8} y={y(c)} dy="0.32em" textAnchor="end">
                {c}¢
              </text>
            )}
          </g>
        ))}
        {[GAP_MIN, GAP_MIN / 2, 0, GAP_MAX / 2, GAP_MAX].map((g) => (
          <text
            key={g}
            className="demo__tick"
            x={x(g)}
            y={height - 8}
            textAnchor={g === GAP_MIN ? 'start' : g === GAP_MAX ? 'end' : 'middle'}
          >
            {fmtGap(g)}
          </text>
        ))}

        <path className="demo__zone demo__zone--yes" d={zone(yesLine, Math.min)} />
        <path className="demo__zone demo__zone--no" d={zone(noLine, Math.max)} />
        <line className="demo__ask" x1={pad.l} x2={pad.l + w} y1={y(yesAsk)} y2={y(yesAsk)} />
        <path className="demo__curve" d={curve} />

        <line className="demo__marker" x1={x(gap)} x2={x(gap)} y1={pad.t} y2={pad.t + h} />
        <circle className="demo__dot" cx={x(gap)} cy={y(fair)} r="5" />
      </svg>
      <ul className="demo__legend mono">
        <li>
          <i className="demo__swatch demo__swatch--curve" />
          Model chance of YES
        </li>
        <li>
          <i className="demo__swatch demo__swatch--ask" />
          Kalshi YES price
        </li>
        <li>
          <i className="demo__swatch demo__swatch--yes" />
          YES has 2¢+ edge
        </li>
        <li>
          <i className="demo__swatch demo__swatch--no" />
          NO has 2¢+ edge
        </li>
      </ul>
    </div>
  );
}

function Slider({ id, label, value, display, ...rest }) {
  return (
    <div className="demo__control">
      <div className="demo__control-head">
        <label htmlFor={id} className="mono">
          {label}
        </label>
        <output htmlFor={id}>{display}</output>
      </div>
      <input id={id} type="range" value={value} {...rest} />
    </div>
  );
}

const TRENDS = [
  { value: 'down', label: 'Down' },
  { value: 'none', label: 'None' },
  { value: 'up', label: 'Up' },
];

const fmtTime = (m) => `${Math.floor(m)}:${m % 1 ? '30' : '00'}`;

export default function PricingDemo() {
  const [gap, setGap] = useState(40);
  const [minutesLeft, setMinutesLeft] = useState(8);
  const [yesAsk, setYesAsk] = useState(58);
  const [trend, setTrend] = useState('up');

  const r = evaluate({ gap, minutesLeft, yesAsk, trend });

  return (
    <Reveal as="section" id="pricing-demo" className="demo" y={16} aria-labelledby="demo-title">
      <div className="demo__head">
        <p className="mono">Try it</p>
        <h3 id="demo-title" className="demo__title display">
          How the bot prices a contract
        </h3>
        <p className="demo__intro">
          Each contract pays $1 if Bitcoin finishes the 15-minute window at or above its target price. Move the
          sliders to see what the bot&rsquo;s model thinks that chance is, and whether it would buy.
        </p>
      </div>

      <div className="demo__panel">
        <div className="demo__chart-area">
          <div className="demo__panel-label mono">
            <span>Model chance of YES</span>
            <span>{fmtTime(minutesLeft)} left</span>
          </div>
          <Chart
            gap={gap}
            minutesLeft={minutesLeft}
            yesAsk={yesAsk}
            feeYes={r.feeYes}
            noAsk={r.noAsk}
            feeNo={r.feeNo}
            fair={r.fair}
          />
        </div>

        <div className="demo__result">
          <div className={`demo__decision ${r.decision.buy ? 'is-buy' : ''}`} aria-live="polite">
            <span className="mono">Bot decision</span>
            <span className="demo__verdict display">{r.decision.buy ? `Buy ${r.decision.buy}` : 'Skip'}</span>
            <span className="demo__reason">{r.decision.reason}</span>
          </div>

          <dl className="demo__stats">
            <div>
              <dt className="mono">Chance of YES</dt>
              <dd>{r.fair.toFixed(1)}%</dd>
            </div>
            <div>
              <dt className="mono">YES / NO price</dt>
              <dd>
                {yesAsk}¢ / {r.noAsk}¢
              </dd>
            </div>
            <div>
              <dt className="mono">YES edge</dt>
              <dd className={r.edgeYes >= MIN_EDGE ? 'is-good' : ''}>{fmtCents(r.edgeYes, true)}</dd>
            </div>
            <div>
              <dt className="mono">NO edge</dt>
              <dd className={r.edgeNo >= MIN_EDGE ? 'is-good' : ''}>{fmtCents(r.edgeNo, true)}</dd>
            </div>
          </dl>

          <div className="demo__model">
            <span className="mono">The model · edges are after fees</span>
            <p
              className="demo__formula"
              aria-label="P of YES equals the normal CDF of the log of spot over strike, divided by sigma times the square root of T minus 40 seconds."
            >
              P(YES) = Φ(ln(S/K) ÷ σ√(T − 40s))
            </p>
          </div>
        </div>

        <div className="demo__controls">
          <Slider
            id="demo-gap"
            label="BTC vs target"
            min={GAP_MIN}
            max={GAP_MAX}
            step={5}
            value={gap}
            display={fmtGap(gap)}
            onChange={(e) => setGap(Number(e.target.value))}
          />
          <Slider
            id="demo-time"
            label="Time left"
            min={2}
            max={14}
            step={0.5}
            value={minutesLeft}
            display={fmtTime(minutesLeft)}
            onChange={(e) => setMinutesLeft(Number(e.target.value))}
          />
          <Slider
            id="demo-ask"
            label="Kalshi YES price"
            min={5}
            max={95}
            step={1}
            value={yesAsk}
            display={`${yesAsk}¢`}
            onChange={(e) => setYesAsk(Number(e.target.value))}
          />
          <div className="demo__control">
            <span className="mono" id="demo-trend-label">
              BTC trend
            </span>
            <div className="demo__segmented" role="group" aria-labelledby="demo-trend-label">
              {TRENDS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={trend === t.value ? 'is-active' : ''}
                  aria-pressed={trend === t.value}
                  onClick={() => setTrend(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="demo__note">
        Simplified for this page: fixed volatility, a $60,000 target, no correction for the gap between exchange prices
        and Kalshi&rsquo;s settlement index, and a 1¢ spread. The live bot also runs a fixed list of safety checks
        (fresh data, clock skew, order-book depth and more) and waits 4 seconds to confirm a signal before it trades.
      </p>
    </Reveal>
  );
}
