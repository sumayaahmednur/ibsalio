import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import { Logo } from './components/Logo'
import { SocialIcons, type SocialLink } from './components/SocialIcons'

type SelectedProject = {
  title: string
  role: string
  scope: string
  contribution: string
  outcomes: string[]
}

const PROFILE = {
  name: 'Ibsa Aliyi Usmane',
  shortName: 'Ibsa',
  title:
    'Food Systems Specialist | Climate Economics Expert | Policy, Institutions & Innovation Advisor',
  tagline:
    'Senior development practitioner and research leader with a track record of directing multi-million-dollar programs, institutional partnerships, and evidence-led policy initiatives across food systems, climate resilience, and rural transformation.',
  summary:
    'I hold a PhD in Policy, Institutions and Innovations (Climate Smart Agriculture and Biodiversity Conservation), an MSc in Rural Development, and a BSc in Rural Development and Agricultural Extension. I am a researcher, consultant, development practitioner, and leader with over a decade of experience in research and community development projects, project management, and policy formulation. My research expertise spans food systems, institutions and innovations, entrepreneurship, digital literacy, climate change economics, biodiversity conservation, and sustainable farming practices for both agrarian and pastoralist communities. Throughout my career, I have conducted thorough field research to assess the effectiveness of development interventions, gathering firsthand insights to evaluate project impacts and inform data-driven decision-making. My research outcomes have been published in reputable international journals and presented at national and global conferences, forums, and symposiums. I have successfully managed multimillion-dollar research and development projects both nationally and internationally, funded by organizations including USAID, IDRC, JICA, the EU, the World Bank Group, ACIAR, the Bill & Melinda Gates Foundation, the Ethiopian Red Cross Society, the Netherlands Government through its Embassy in Addis Ababa, and others. I am skilled in data analysis, monitoring and evaluation practices, and effectively communicating complex research findings to diverse stakeholders—from small-scale farmers and local communities to international scientists and policymakers. My work has empowered countless agriculturalists and pastoralists to enhance their economic situations, while my research continues to inform and inspire professionals worldwide. I am a resilient professional.',
  email: 'ibsaaly2012@gmail.com',
  location: 'Harar, Ethiopia',
  linkedin: 'https://www.linkedin.com/in/ibsa-aliyi-usmane-7017b698',
  facebook: 'https://web.facebook.com/ibsa.aliyi.988',
  /** Add URLs when set — shown in Contact and footer (not in hero) */
  x: 'https://x.com/Ibsa_A_usmane',
  youtube: '',
  gainrep: 'https://www.gainrep.com/profile?un=ibsa.aliyi_usmane',
  orcid: '',
  /** Optional: place a portrait in `public/` (e.g. `public/photo.jpg`) and set to `/photo.jpg` */
  heroImage: '/ibsa.jpg',
}

function buildSocialLinks(): SocialLink[] {
  const raw: (SocialLink | null)[] = [
    { id: 'linkedin', label: 'LinkedIn profile', href: PROFILE.linkedin },
    { id: 'email', label: `Email ${PROFILE.email}`, href: `mailto:${PROFILE.email}` },
    PROFILE.x.trim()
      ? { id: 'x', label: 'X (Twitter) profile', href: PROFILE.x.trim() }
      : null,
    PROFILE.facebook.trim()
      ? { id: 'facebook', label: 'Facebook profile', href: PROFILE.facebook.trim() }
      : null,
    PROFILE.youtube.trim()
      ? { id: 'youtube', label: 'YouTube channel', href: PROFILE.youtube.trim() }
      : null,
    PROFILE.gainrep.trim()
      ? { id: 'gainrep', label: 'GainRep profile', href: PROFILE.gainrep.trim() }
      : null,
    PROFILE.orcid.trim()
      ? { id: 'orcid', label: 'ORCID profile', href: PROFILE.orcid.trim() }
      : null,
  ]
  return raw.filter((l): l is SocialLink => l !== null && l.href.length > 0)
}

const SOCIAL_LINKS = buildSocialLinks()

const NAV_LINKS = [
  { href: '#profile', label: 'Profile' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#projects', label: 'Projects' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
] as const

const keyAchievements = [
  'Directed and coordinated multi-million-dollar donor-funded initiatives with cross-institutional stakeholders in Ethiopia and international partner ecosystems.',
  'Led research and implementation programs that informed policy dialogue, institutional strategy, and practical field interventions for farmers and pastoral communities.',
  'Built high-performing multidisciplinary teams across operations, research, and community engagement functions in both public and private sector contexts.',
  'Produced and co-delivered evidence published in reputable journals and presented at national and global conferences, forums, and symposiums.',
]

const coreCompetencies = [
  'Executive Operations Management',
  'Operational Execution',
  'Research Project Management',
  'Policy & Institutional Advisory',
  'Program Strategy & Delivery',
  'Stakeholder Engagement',
  'Business Development Services',
  'Socio-Economic Research Leadership',
]

const areasOfExpertise = [
  'Food Systems Development',
  'Economics of Climate Change',
  'Sustainable Agriculture & Biodiversity',
  'Rural and Pastoral Livelihoods',
  'Entrepreneurship and Digital Literacy',
  'Monitoring, Learning, and Evidence Use',
  'Capacity Building and Institutional Strengthening',
]

const leadershipExperience = [
  {
    organization: 'Kavle Consulting',
    title: 'Director of Operations',
    period: 'Feb 2026 - Present',
    location: 'Washington, United States',
  },
  {
    organization: 'Haramaya University',
    title: 'Director, Community Engagement Office',
    period: 'Jan 2024 - Present',
    location: 'Ethiopia',
  },
  {
    organization: 'ELPI',
    title: 'Researcher',
    period: 'Jan 2023 - Present',
    location: 'Ethiopia',
  },
  {
    organization: 'Dadimos Development PLC',
    title: 'Research Coordinator',
    period: 'Aug 2024 - Aug 2025',
    location: 'Addis Ababa, Ethiopia',
  },
  {
    organization: 'World Vision Ethiopia',
    title: 'Local PI (IHEYC Program)',
    period: 'Apr 2024 - Aug 2025',
    location: 'Addis Ababa, Ethiopia',
  },
  {
    organization: 'FHI 360',
    title: 'Local PI',
    period: 'Sep 2024 - Feb 2025',
    location: 'Ethiopia',
  },
  {
    organization: 'USAID & Bill and Melinda Gates Foundation Programs',
    title: 'Project Coordinator',
    period: 'Aug 2017 - Dec 2022',
    location: 'Ethiopia',
  },
  {
    organization: 'Oromia Agricultural Research Institute',
    title: 'Researcher, Project Manager, and Coordinator',
    period: 'Aug 2012 - Aug 2017',
    location: 'Addis Ababa, Ethiopia',
  },
]

const ConferenceParticipations = [
  {
    organization: 'National Conference on Entrepreneurship Research',
    title: 'Participant',
    period: '27 Nov 2025',
    location: 'Sheraton Addis, Ethiopia',
  },
  {
    organization: 'Food Safety Forum & Public-Private Partnership Workshop',
    title: 'Participant',
    period: '19–21 Sep 2024',
    location: 'Addis Ababa, Ethiopia',
  },
  {
    organization: 'International Conference on Pastoralism in the 21st Century: Trends and Prospects',
    title: 'Participant',
    period: '30–31 May 2024',
  },
  {
    organization: 'International Research Conference on Indigenous Knowledge for Innovations and Societal Transformation',
    title: 'Participant',
    period: '24 May 2024',
    location: 'Bule Hora University, Ethiopia',
  },
  {
    organization: 'International Conference on Advance of Science and Technology',
    title: 'Participant',
    period: '1–3 Nov 2024',
  },
  {
    organization: 'International Conference on Climate Adaptability and Sustainability: Nile River Basin and the Sudd Wetlands',
    title: 'Participant',
    period: '20–21 2023',
    location: 'USA (Virtual)',
  },
  {
    organization: 'International Conference on Transforming Food System Through Climate Smart Agriculture',
    title: 'Participant',
    period: '27–28 Oct 2022',
  },
]

const publications = [
  {
    title: 'Renewable Energy Resources in Ethiopia for a Green Economy: Policy Review, Challenges, and Opportunities',
    authors: 'Usmane, I. A., Woreka, B. B., Ahmed, K. K., & Mohammed, L. S.',
    year: '2025',
    source: 'Sustainable Development Research in Materials and Renewable Energy Engineering (Springer, Cham)',
  },
  {
    title: 'Examining the Role of Women’s Engagement in Khat Production on Child Nutritional Outcomes',
    authors: 'Mechlowitz, K. et al., including Usmane, I. A.',
    year: '2024',
    source: 'medRxiv',
  },
  {
    title: 'Women’s Empowerment and Child Nutrition in a Context of Shifting Livelihoods in Eastern Oromia, Ethiopia',
    authors: 'Mechlowitz, K. et al., including Usmane, I. A.',
    year: '2023',
    source: 'Frontiers in Nutrition, 10',
  },
  {
    title: 'Prevalence and Load of the Campylobacter Genus in Infants and Associated Household Contacts in Rural Eastern Ethiopia',
    authors: 'Deblais, L. et al., including Usmane, I. A.',
    year: '2023',
    source: 'Applied and Environmental Microbiology, 89(7)',
  },
  {
    title: 'Unravelling the Reservoirs for Colonization of Infants with Campylobacter spp. in Rural Ethiopia: Protocol for a Longitudinal Study',
    authors: 'Havelaar, A. H. et al., including Usmane, I. A.',
    year: '2022',
    source: 'BMJ Open, 12(10)',
  },
]

const training = [
  {
    title: 'Leadership and Management Capacity Strengthening in African Universities',
    period: '22–23 Jan 2026',
    organization: 'Haramaya University',
    location: 'Ethiopia',
  },
  {
    title: 'Exploring Pathways for Commercial Impact: Turning Scientific Work into Market-Ready Solutions',
    period: '20–23 Jan 2026',
    organization: 'Haramaya University',
    location: 'Ethiopia',
  },
  {
    title: 'Qualitative Data Management and Analysis Using ATLAS.ti',
    period: '2025',
    organization: 'Ethiopian Economics Association',
    location: 'Ethiopia',
  },
  {
    title: 'Food Systems',
    period: '2023',
    organization: 'Wageningen Centre for Development Innovation',
    location: 'Netherlands',
  },
  {
    title: 'Digital and Information Literacy and Research Tools',
    period: '2021',
    organization: 'Haramaya University',
    location: 'Ethiopia',
  },
  {
    title: 'Integrated Decision Support Systems',
    period: '2021',
    organization: 'Haramaya University',
    location: 'Ethiopia',
  },
  {
    title: 'CAGED and ECXAM Projects: Field Data Collection Methods',
    period: '20–30 Oct 2020',
  },
  {
    title: 'Scientific Report Writing, Data Management, and Analysis Using R Software',
    period: '2013',
    organization: 'EIAR',
    location: 'Ethiopia',
  },
]

const memberships = [
  {
    organization: 'Ethiopian Economics Association',
    role: 'Member',
    period: '2024 – Present',
  },
  {
    organization: 'Ethiopian Society of Horticultural Sciences',
    role: 'Member',
    period: '2017 – Present',
  },
  {
    organization: 'Ethiopian Society of Rural Development and Agricultural Extension',
    role: 'Member',
    period: '2014 – Present',
  },
  {
    organization: 'Ethiopia Pasture and Rangeland Forum & Ethiopian Society of Animal Production',
    role: 'Member',
    period: '2013 – Present',
  },
]

const selectedProjects: SelectedProject[] = [
  {
    title: 'Cultivate Africa Future-2 Program',
    role: 'Project Coordinator and Focal Person',
    scope:
      'Large-scale agricultural development initiative designed to improve productivity, resilience, and market outcomes.',
    contribution:
      'Led program coordination, stakeholder alignment, and implementation oversight across institutional and community partners.',
    outcomes: [
      'Strengthened implementation discipline and delivery quality across partner teams.',
      'Supported better uptake of evidence-informed approaches in agricultural development activities.',
    ],
  },
  {
    title: 'Harnessing Opportunity and Productivity Enhancement-2 (HOPE-2)',
    role: 'Project Manager and Focal Person',
    scope:
      'Program focused on productivity enhancement and economic opportunities for target beneficiaries.',
    contribution:
      'Managed execution planning, cross-functional coordination, and delivery monitoring to keep project milestones on track.',
    outcomes: [
      'Improved operational consistency through structured project management practices.',
      'Enabled stronger partner coordination for sustained field-level implementation.',
    ],
  },
  {
    title: 'Farmers Research Group-2 (JICA)',
    role: 'Project Coordinator',
    scope:
      'Research and extension initiative to strengthen farmer-centered evidence generation and knowledge transfer.',
    contribution:
      'Coordinated institutional research teams and local stakeholders to align priorities, methodologies, and dissemination channels.',
    outcomes: [
      'Expanded practical use of research outputs among local farming communities.',
      'Reinforced collaboration between research institutions and end-user beneficiaries.',
    ],
  },
  {
    title: 'ASARECA Socio-Economic Research Component',
    role: 'Team Leader',
    scope:
      'Regional socio-economic research effort supporting agricultural policy and extension decision-making.',
    contribution:
      'Provided technical and team leadership for socio-economic research design, implementation, and stakeholder reporting.',
    outcomes: [
      'Delivered actionable socio-economic insights for project and policy use.',
      'Contributed to stronger evidence pathways across multi-country research collaboration.',
    ],
  },
]

const certifications = [
  'Data Science for Research and Institutional Intelligence',
  'Certificate of Recognition',
  'Research for Market-Ready Impact',
  'Certified Outsourcing Professional - Business Development (COP-BD)',
  'Leadership and Management in Higher Education',
]

const education = [
  'PhD, Fellow in Climate Smart Agriculture and Biodiversity Conservation - ACE (2021-present)',
  'MSc, Master of Science in Rural Development , Haramaya University, Ethiopia | September 2016 – April 2019',
  'BSc, Bachelor of Science in Agriculture (Rural Development and Agricultural Extension) Haramaya University, Ethiopia | September 2009 – July 2011',
  'Postgraduate Diploma, Teaching in Higher Education - College of Education and Behavioral Sciences',
]

const referees = [
  {
    name: 'Dr. Jemal Yousuf Hassen',
    title: 'Associate Professor & President',
    organization: 'Haramaya University',
    location: 'Ethiopia',
  },
  {
    name: 'Prof. Arie H. Havelaar',
    title: 'Professor',
    organization: 'University of Florida',
    location: 'USA',
  },
  {
    name: 'Dr. Sarah L. McKune',
    title: 'Associate Professor & Interim Chair',
    organization: 'Department of Environmental and Global Health, University of Florida',
    location: 'USA',
  },
]

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('nav-open')
    } else {
      document.body.classList.remove('nav-open')
    }
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-bar">
          <a className="logo-brand" href="#" onClick={closeMenu}>
            <Logo decorative className="logo-svg" />
            <span className="logo-wordmark">
              {PROFILE.shortName}
              <span className="logo-accent"> Aliyi</span>
            </span>
          </a>

          <div className="header-actions">
            <nav className="nav-desktop" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Portal: fixed overlay must not live inside sticky header (backdrop-filter breaks fixed positioning) */}
      {typeof document !== 'undefined'
        ? createPortal(
            <>
              <div
                className={`nav-backdrop${menuOpen ? ' is-open' : ''}`}
                aria-hidden={!menuOpen}
                onClick={closeMenu}
              />

              <nav
                id="nav-drawer"
                className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
                aria-label="Mobile navigation"
                aria-hidden={!menuOpen}
                inert={!menuOpen}
              >
                <div className="nav-drawer-top">
                  <span className="nav-drawer-title">Menu</span>
                  <button
                    type="button"
                    className="nav-drawer-close"
                    aria-label="Close menu"
                    onClick={closeMenu}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={22}
                      height={22}
                      aria-hidden
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ul className="nav-drawer-list">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} onClick={closeMenu}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>,
            document.body,
          )
        : null}

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-inner hero-split">
            <div className="hero-content">
              <p className="eyebrow">Executive Portfolio</p>
              <h1 id="hero-heading">{PROFILE.name}</h1>
              <p className="hero-title">{PROFILE.title}</p>
              <p className="hero-tagline">{PROFILE.tagline}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#leadership">
                  Leadership record
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Get in touch
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-glow" aria-hidden />
              <div className="hero-visual-ring hero-visual-ring--outer" aria-hidden />
              <div className="hero-visual-ring hero-visual-ring--inner" aria-hidden />
              <div className="hero-visual-card">
                {PROFILE.heroImage ? (
                  <img
                    className="hero-photo"
                    src={PROFILE.heroImage}
                    alt={`${PROFILE.name} — portrait`}
                    width={400}
                    height={480}
                  />
                ) : (
                  <div className="hero-avatar hero-avatar-portrait" aria-hidden="true">
                    {PROFILE.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                )}
                <div className="hero-visual-badge hero-visual-badge--loc">
                  <span className="hero-badge-dot" aria-hidden />
                  {PROFILE.location}
                </div>
                <div className="hero-visual-badge hero-visual-badge--role">
                  Food systems · Policy · Research
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="profile" className="section section-alt" aria-labelledby="profile-heading">
          <h2 id="profile-heading">Executive Profile</h2>
          <p className="section-lead">{PROFILE.summary}</p>
        </section>

        <section className="section" aria-labelledby="achievements-heading">
          <h2 id="achievements-heading">Key Achievements</h2>
          <ul className="bullet-list">
            {keyAchievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </section>

        <section className="section section-alt" aria-labelledby="competencies-heading">
          <h2 id="competencies-heading">Core Competencies</h2>
          <ul className="chip-list">
            {coreCompetencies.map((competency) => (
              <li key={competency}>{competency}</li>
            ))}
          </ul>
        </section>

        <section className="section" aria-labelledby="expertise-heading">
          <h2 id="expertise-heading">Areas of Expertise</h2>
          <ul className="chip-list">
            {areasOfExpertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="leadership" className="section section-alt" aria-labelledby="leadership-heading">
          <h2 id="leadership-heading">Leadership Experience</h2>
          <ul className="timeline">
            {leadershipExperience.map((item) => (
              <li key={`${item.organization}-${item.period}`} className="timeline-item">
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.organization}</p>
                <p className="timeline-meta">
                  {item.period} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="conferences"
          className="section section-alt"
          aria-labelledby="conferences-heading"
        >
          <h2 id="conferences-heading">Conference Participation</h2>

          <ul className="timeline">
            {ConferenceParticipations.map((item) => (
              <li
                key={`${item.organization}-${item.period}`}
                className="timeline-item"
              >
                <h3>{item.organization}</h3>

                <p className="timeline-role">{item.title}</p>

                <p className="timeline-meta">
                  {item.period} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
  id="publications"
  className="section"
  aria-labelledby="publications-heading"
>
  <h2 id="publications-heading">Selected Publications</h2>

  <ul className="timeline">
    {publications.map((pub) => (
      <li
        key={`${pub.title}-${pub.year}`}
        className="timeline-item"
      >
        <h3>{pub.title}</h3>

        <p className="timeline-authors">{pub.authors}</p>

        <p className="timeline-meta">
          {pub.source} · {pub.year}
        </p>
      </li>
    ))}
  </ul>
</section>


<section
  id="training"
  className="section section-alt"
  aria-labelledby="training-heading"
>
  <h2 id="training-heading">Professional Development & Training</h2>

  <ul className="timeline">
    {training.map((item) => (
      <li
        key={`${item.title}-${item.period}`}
        className="timeline-item"
      >
        <h3>{item.title}</h3>

        <p className="timeline-org">{item.organization}</p>

        <p className="timeline-meta">
          {item.period} · {item.location}
        </p>
      </li>
    ))}
  </ul>
</section>

<section
  id="memberships"
  className="section"
  aria-labelledby="memberships-heading"
>
  <h2 id="memberships-heading">Professional Memberships</h2>

  <ul className="timeline">
    {memberships.map((item) => (
      <li
        key={`${item.organization}-${item.period}`}
        className="timeline-item"
      >
        <h3>{item.organization}</h3>

        <p className="timeline-role">{item.role}</p>

        <p className="timeline-meta">{item.period}</p>
      </li>
    ))}
  </ul>
  </section>
  
        <section id="projects" className="section" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Selected Projects</h2>
          <p className="section-intro">

            <code></code>.
          </p>
          <ul className="project-grid">
            {selectedProjects.map((project) => (
              <li key={project.title}>
                <article className="project-card">
                  <h3>{project.title}</h3>
                  <p>
                    <strong>Role:</strong> {project.role}
                  </p>
                  <p>
                    <strong>Scope:</strong> {project.scope}
                  </p>
                  <p>
                    <strong>Contribution:</strong> {project.contribution}
                  </p>
                  <ul className="project-outcomes">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section
  id="referees"
  className="section section-alt"
  aria-labelledby="referees-heading"
>
  <h2 id="referees-heading">Referees</h2>

  <ul className="timeline">
    {referees.map((ref) => (
      <li
      >
        <h3>{ref.name}</h3>

        <p className="timeline-org">
          {ref.title}, {ref.organization}
        </p>

        <p className="timeline-meta">{ref.location}</p>
      </li>
    ))}
  </ul>
</section>

        <section id="credentials" className="section section-alt" aria-labelledby="credentials-heading">
          <h2 id="credentials-heading">Credentials</h2>
          <div className="credentials-grid">
            <article className="credential-card">
              <h3>Education</h3>
              <ul className="bullet-list">
                {education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="credential-card">
              <h3>Certifications</h3>
              <ul className="bullet-list">
                {certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="credential-card">
              <h3>Publications & Professional Affiliations</h3>
              <p>
                Research outputs from Ibsa&apos;s programs have been published in reputable international
                journals and presented at global conferences, forums, and symposiums. Detailed lists are
                available on request and can be added as structured entries in this portfolio.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <p className="section-lead">
            Open to executive advisory mandates, institutional partnerships, and research-driven
            development opportunities.
          </p>
          <p className="contact-email">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
          <p className="contact-meta">{PROFILE.location}</p>
          <p className="contact-social-heading">Social</p>
          <div className="contact-social-row">
            <SocialIcons links={SOCIAL_LINKS} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} {PROFILE.name}. 
          </p>
          <SocialIcons links={SOCIAL_LINKS} className="footer-social" />
        </div>
      </footer>
    </>
  )
}

export default App
