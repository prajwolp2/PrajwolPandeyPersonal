import profile from '../images/profile.jpg';
import kalshiDashboard from '../images/kalshiDashboard.jpg';
import kalshiDailyPnl from '../images/kalshiDailyPnl.jpg';

export const site = {
  name: 'Prajwol Pandey',
  firstName: 'Prajwol',
  lastName: 'Pandey',
  role: 'Software & Data Engineer',
  location: 'Queens, New York',
  email: 'prajwolpandey0730@gmail.com',
  github: 'https://github.com/prajwolp2',
  linkedin: 'https://www.linkedin.com/in/prajwol-pandey-841175289/',
  resume: `${process.env.PUBLIC_URL}/resume.pdf`,
  availability: 'Open to Summer 2027 internships',
  profile,
};

export const hero = {
  kicker: ['Software & data engineer', 'Queens, New York'],
  headline: [
    { text: 'I build' },
    { text: 'software', accent: true },
    { text: 'and work with data.' },
  ],
  lede:
    'I study Computer Science and Economics at Stony Brook University. This past summer I analyzed fleet data for New York City, and the summer before that I interned at JPMorgan Chase.',
};

export const now = [
  { label: 'Now', value: 'Software Developer, Stony Brook Campus Residences IT' },
  { label: 'Studying', value: 'B.S. Computer Science and Economics, Stony Brook University' },
  { label: 'Status', value: 'Open to Summer 2027 internships' },
];

export const about = {
  paragraphs: [
    'I am a Computer Science and Economics student at Stony Brook University. I like building tools that solve real problems, and most of my work combines software with data.',
    'Right now I build web apps for the Campus Residences IT team at Stony Brook. On my own time I work on a trading bot for Kalshi. I speak English, Nepali, Hindi and French.',
  ],
  facts: [
    { label: 'Based in', value: 'Queens, NY' },
    { label: 'Studying', value: 'CS and Economics, Stony Brook' },
    { label: 'Graduating', value: 'May 2029' },
    { label: 'Languages', value: 'English, Nepali, Hindi, French' },
    { label: 'Certified', value: 'Google Cybersecurity' },
  ],
  stats: [
    { value: 100000, suffix: '+', label: 'Fleet records analyzed for NYC' },
    { value: 10000, suffix: '+', label: 'Excel rows turned into SQL at JPMorgan' },
    { value: 100, suffix: '+', label: 'Staff using apps I built' },
    { value: 4, suffix: '', label: 'Languages spoken' },
  ],
};

export const experience = [
  {
    company: 'NYC Department of Citywide Administrative Services',
    unit: 'Fleet Division',
    role: 'Data Analysis & Systems Administration Intern',
    period: 'Jun to Aug 2026',
    year: '2026',
    location: 'Manhattan, NY',
    bullets: [
      'Analyzed 100,000+ maintenance and usage records for the city’s 30,000-vehicle fleet to find what was driving costs and downtime. The Fleet Systems team adopted my recommendations.',
      'Built Excel pivot tables showing vehicle use and maintenance spending by city division, so managers no longer had to pull the data by hand each time.',
      'Wrote SQL queries in AssetWorks to pull data for weekly fleet reports.',
      'Checked 10,000+ records in the fleet systems for errors before they reached reports.',
    ],
    tags: ['SQL', 'AssetWorks', 'Excel', 'Data analysis'],
  },
  {
    company: 'JPMorgan Chase & Co.',
    unit: '',
    role: 'Data Engineering Intern',
    period: 'Jul to Aug 2025',
    year: '2025',
    location: 'Jersey City, NJ',
    bullets: [
      'Built a Python tool that writes SQL queries from Excel files with 10,000+ rows, cutting a recurring task from about 2 hours to about 2 minutes.',
      'Built ETL workflows to load, clean and standardize data in internal databases before analysis.',
      'Presented the results to 10+ senior engineers.',
    ],
    tags: ['Python', 'SQL', 'ETL', 'Excel'],
  },
  {
    company: 'Stony Brook Campus Residences',
    unit: 'Department of IT',
    role: 'Software Developer',
    period: 'Sep 2025 to present',
    year: '2025',
    location: 'Stony Brook, NY',
    bullets: [
      'Build and maintain 4+ full-stack web apps (React, Node.js, Express, MongoDB) that 100+ staff use to track devices across 60+ residence halls. They replaced spreadsheets.',
      'Built REST API endpoints so the apps can pull university data in real time.',
      'Work with IT staff to turn what their department needs into technical plans.',
      'Set up and support 200+ devices across the residence halls.',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  {
    company: 'NYC Department of Education',
    unit: 'Division of Instructional & Information Technology',
    role: 'Research Collaborator',
    period: 'Apr to May 2024',
    year: '2024',
    location: 'New York, NY',
    bullets: [
      'Worked with the NYC DOE’s Division of Instructional and Information Technology on a better way to store and track student records for a district of 1M+ students.',
      'Researched ways to organize student records so they are easier to find and more secure.',
      'Presented our design and findings to the department.',
    ],
    tags: ['Systems design', 'Research', 'Data security'],
  },
];

export const education = {
  school: 'Stony Brook University',
  program: 'B.S. in Computer Science and Economics (double major)',
  period: 'Expected May 2029',
  courses: [
    'Big Data & Warehousing',
    'Data Structures',
    'Applied Linear Algebra',
    'Discrete Mathematics',
    'Systems Programming',
    'IT and Infrastructure',
    'Calculus I & II',
  ],
};

export const projects = [
  {
    id: 'kalshi',
    title: 'Kalshi Algorithmic Trading Bot',
    year: '2026',
    kind: 'Algorithmic trading',
    description:
      'A live, real-money bot for Kalshi’s 15-minute Bitcoin contracts. It prices each contract as a digital option under a Brownian-motion model and buys only when momentum agrees and the edge clears 2¢ after fees. Backtested on 30,561 windows with walk-forward validation; +$145 across 349 live trades so far, a 61% win rate and a 97% fill rate. Runs 24/7 on a Linux server with percent-of-equity risk limits and 147 unit tests.',
    tags: ['Python', 'Linux', 'REST APIs', 'Statistical modeling'],
    link: 'https://github.com/prajwolp2/kalshi-bot',
    images: [
      { src: kalshiDashboard, alt: 'Live dashboard: cash, P&L, win rate, the current market window and daily P&L' },
      { src: kalshiDailyPnl, alt: 'Daily P&L chart and table for 349 settled trades, Nov 8 to 23, 2026' },
    ],
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'HTML/CSS'] },
  { group: 'Frameworks & libraries', items: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Pandas'] },
  { group: 'Databases & tools', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Git/GitHub', 'Linux', 'REST APIs', 'Jira', 'Agile/Scrum'] },
  { group: 'Data & analytics', items: ['Excel (pivot tables, VLOOKUP)', 'Power BI', 'ETL', 'Data validation', 'Reporting'] },
  { group: 'Quantitative methods', items: ['Backtesting', 'Probability modeling', 'Risk management', 'Kelly criterion', 'Bootstrap resampling'] },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
