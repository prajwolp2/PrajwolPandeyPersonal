import financeProject from '../images/financeProject.png';
import profile from '../images/profile.jpg';

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
    { text: 'I turn' },
    { text: 'messy data', accent: true },
    { text: 'into software people actually use.' },
  ],
  lede:
    'Computer Science student at Stony Brook University. I spent last summer analyzing a 30,000-vehicle fleet for New York City, and the one before that automating SQL at JPMorgan Chase.',
};

export const now = [
  { label: 'Now', value: 'Technical Analyst, Stony Brook Campus Residences IT' },
  { label: 'Studying', value: 'B.S. Computer Science, Stony Brook University' },
  { label: 'Status', value: 'Open to Summer 2027 internships' },
];

export const about = {
  paragraphs: [
    'I like the whole arc of building something: a blank editor, a rough idea, a first ugly prototype, and finally a tool someone actually uses. Most of my work sits where software engineering meets data, whether that is a Python script that writes its own SQL or a React app that retires a spreadsheet.',
    'Outside of class I am usually shipping internal tools for the campus IT team, poking at finance data, or learning how the systems underneath the web actually work. I speak four languages and I am always happy to talk about anything from data warehousing to gardening.',
  ],
  facts: [
    { label: 'Based in', value: 'Queens, NY' },
    { label: 'Studying', value: 'Computer Science, Stony Brook' },
    { label: 'Graduating', value: 'May 2029' },
    { label: 'Languages', value: 'English, Nepali, Hindi, French' },
    { label: 'Certified', value: 'Google Cybersecurity' },
  ],
  stats: [
    { value: 100000, suffix: '+', label: 'Fleet records analyzed for NYC' },
    { value: 10000, suffix: '+', label: 'Rows automated at JPMorgan' },
    { value: 100, suffix: '+', label: 'Staff using my internal tools' },
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
      'Analyzed 100,000+ maintenance and utilization records across a 30,000-vehicle municipal fleet to identify cost and downtime drivers, producing recommendations adopted by the Fleet Systems team.',
      'Built pivot table models summarizing utilization and maintenance spend by government division, giving managers a repeatable view that replaced one-off manual data pulls.',
      'Authored SQL queries in AssetWorks to extract operational datasets supporting weekly fleet reporting.',
      'Administered internal fleet tooling and validated data accuracy across 10,000+ records, supporting the reliability of division reporting.',
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
      'Built a Python tool automating SQL query generation from 10,000+ row Excel datasets, reducing a recurring manual process from about 2 hours to about 2 minutes per run.',
      'Validated data integrity across 4+ internal datasets, surfacing discrepancies that informed pipeline design decisions.',
      'Designed ETL workflows loading data into internal databases, standardizing how datasets were cleaned before analysis.',
      'Presented automation results and pipeline findings to 10+ senior engineers, translating technical work into business impact.',
    ],
    tags: ['Python', 'SQL', 'ETL', 'Excel'],
  },
  {
    company: 'Stony Brook Campus Residences',
    unit: 'Department of IT',
    role: 'Technical Analyst',
    period: 'Sep 2025 to present',
    year: '2025',
    location: 'Stony Brook, NY',
    bullets: [
      'Partnered with university IT staff to scope requirements for 4+ internal applications, translating non-technical departmental workflows into technical specifications.',
      'Built and maintained internal web applications used by 100+ staff to track all devices across 60+ residence halls, replacing manual spreadsheet processes.',
      'Engineered RESTful API endpoints enabling real-time retrieval of university resource data across internal applications.',
      'Provided technical support and system deployment across campus, supporting 200+ devices.',
    ],
    tags: ['React', 'REST APIs', 'Web apps', 'IT support'],
  },
  {
    company: 'NYC Department of Education',
    unit: 'Division of Instructional & Information Technology',
    role: 'Research Collaborator',
    period: 'Apr to May 2024',
    year: '2024',
    location: 'New York, NY',
    bullets: [
      'Partnered with NYC DOE’s Division of Instructional and Information Technology to architect a scalable student record-keeping solution, scoping requirements across the nation’s largest school district serving 1M+ students.',
      'Researched and proposed data organization frameworks to modernize student record accessibility, improving retrieval efficiency and security compliance across district systems.',
      'Presented system architecture and research findings directly to department stakeholders, delivering a structured roadmap for infrastructure modernization adoptable at the district level.',
    ],
    tags: ['Systems architecture', 'Research', 'Data security'],
  },
];

export const education = {
  school: 'Stony Brook University',
  program: 'B.S. in Computer Science',
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
    id: 'finance',
    title: 'Accelerated Finance Dashboard',
    year: '2025',
    kind: 'Data visualization',
    description:
      'A market overview dashboard that charts the S&P 500 trend alongside the return of the ten most-watched tickers. Built to make a pile of pricing data readable at a glance.',
    tags: ['Python', 'Data viz', 'Finance'],
    image: financeProject,
  },
  {
    id: 'diit',
    title: 'Student Records Modernization',
    year: '2024',
    kind: 'Systems design, NYC DOE',
    description:
      'Research collaboration with the NYC Department of Education to architect a scalable, more secure approach to student record-keeping for a district serving over a million students.',
    tags: ['Systems design', 'Data security', 'Research'],
  },
  {
    id: 'portfolio',
    title: 'This Website',
    year: '2026',
    kind: 'Web',
    description:
      'The site you are reading. A React single-page app with Framer Motion handling the reveals and transitions, and plain CSS for everything else. Deployed on GitHub Pages.',
    tags: ['React', 'Framer Motion', 'GitHub Pages'],
    link: 'https://github.com/prajwolp2/PrajwolPandeyPersonal',
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript', 'HTML', 'CSS'] },
  { group: 'Frameworks & libraries', items: ['React', 'Node', 'Express', 'Pandas'] },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { group: 'Data & tools', items: ['Excel', 'Pivot tables', 'Power BI', 'Tableau', 'Google Sheets', 'Jira'] },
  { group: 'Also comfortable with', items: ['Unix', 'Bash', 'Git', 'C++', 'Kotlin', 'Arduino'] },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
