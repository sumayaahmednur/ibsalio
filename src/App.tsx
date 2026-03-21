import './App.css'

const SITE = {
  name: 'Your Name',
  title: 'Developer & designer',
  tagline:
    'I build thoughtful web experiences with clean code and attention to detail.',
  about:
    "I'm a developer focused on accessible, performant interfaces. I enjoy turning complex problems into simple, elegant solutions. When I'm not coding, I'm learning something new or contributing to open source.",
  email: 'hello@example.com',
  location: 'Earth',
  social: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'X', href: 'https://x.com' },
  ],
  projects: [
    {
      title: 'Project Alpha',
      description:
        'A full-stack app with auth, real-time updates, and a polished UI.',
      stack: ['React', 'TypeScript', 'Node'],
      href: '#',
    },
    {
      title: 'Project Beta',
      description:
        'Design system and component library used across multiple products.',
      stack: ['Storybook', 'CSS', 'A11y'],
      href: '#',
    },
    {
      title: 'Project Gamma',
      description:
        'CLI tool and API that automates repetitive workflows for teams.',
      stack: ['Go', 'REST', 'Docker'],
      href: '#',
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Node.js',
    'HTML & CSS',
    'Git',
    'Testing',
    'Performance',
    'Accessibility',
  ],
}

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <a className="logo" href="#">
          {SITE.name.split(' ')[0]}
          <span className="logo-dot">.</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-avatar" aria-hidden="true">
            {SITE.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)}
          </div>
          <p className="eyebrow">Portfolio</p>
          <h1 id="hero-heading">{SITE.name}</h1>
          <p className="hero-title">{SITE.title}</p>
          <p className="hero-tagline">{SITE.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-heading">
          <h2 id="about-heading">About</h2>
          <p className="section-lead">{SITE.about}</p>
        </section>

        <section
          id="projects"
          className="section"
          aria-labelledby="projects-heading"
        >
          <h2 id="projects-heading">Projects</h2>
          <p className="section-intro">
            Selected work. Replace links and copy in <code>src/App.tsx</code>.
          </p>
          <ul className="project-grid">
            {SITE.projects.map((p) => (
              <li key={p.title}>
                <article className="project-card">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <ul className="project-stack">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <a
                    className="project-link"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project
                    <span aria-hidden="true"> →</span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills</h2>
          <ul className="skill-list">
            {SITE.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section id="contact" className="section section-contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <p className="section-lead">
            Open to collaborations and interesting opportunities. Reach out by
            email or social.
          </p>
          <p className="contact-email">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p className="contact-meta">{SITE.location}</p>
          <ul className="contact-social">
            {SITE.social.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Built with Vite & React.
        </p>
      </footer>
    </>
  )
}

export default App
