import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
const github = 'https://github.com/RayanHaque';
const projects = [
  {
    area: 'Reinforcement learning / Network security',
    status: 'Ongoing',
    period: 'Jan 2026 – Present',
    title: 'Adaptive Quantum-Safe Communication',
    summary: 'Built an adaptive communication platform combining BB84, B92, and E91 quantum key distribution with LWE-based post-quantum cryptography and hybrid schemes. Trained a PPO agent to select protocols under changing threats and network noise.',
    detail: 'Simulated 10M+ labeled samples and built a real-time FastAPI and WebSockets backend for protocol monitoring and security analytics.',
    stack: ['Python', 'PyTorch', 'Stable-Baselines3', 'FastAPI', 'Docker', 'AWS'],
    repo: 'ai_quantum_security',
    evidence: 'Browse source and setup notes',
  },
  {
    area: 'Computer vision / Deep learning',
    status: 'Preprint',
    period: 'Jan – Oct 2025',
    title: 'ThoraxSense',
    summary: 'Developed PyTorch DenseNet121 and TensorFlow/Keras VGG16 pipelines for multi-disease chest X-ray classification, with weighted loss to address class imbalance across 14 classes.',
    detail: 'Used CUDA-aware memory management, adaptive learning-rate scheduling, and gradient clipping for training on constrained hardware.',
    stack: ['PyTorch', 'TensorFlow', 'Keras', 'CUDA'],
    repo: 'ThoraxSense',
    evidence: 'Browse training notebooks',
  },
  {
    area: 'Generative AI / Full stack',
    status: 'In development',
    period: 'Nov 2026 – Present',
    title: 'LLM-Powered Automated Code Review',
    summary: 'The public starter uses FastAPI and Gemini to review submitted code. It includes SQLite-backed review history, API tests, and a labeled offline mode.',
    detail: 'The next version calls for JWT authentication, PostgreSQL, and a React interface for structured findings.',
    stack: ['Python', 'FastAPI', 'Gemini API', 'SQLite'],
    repo: 'LLM-Code-Review-System',
    evidence: 'Browse the code review starter',
  },
  {
    area: 'Retrieval-augmented generation',
    status: 'In development',
    period: 'Nov 2026 – Present',
    title: 'Intelligent PDF Chatbot',
    summary: 'The public starter extracts text from PDFs, retrieves passages with TF-IDF, and uses Gemini to answer with page references when configured.',
    detail: 'Earlier experiments explored OCR, FAISS, embeddings, and a Streamlit interface.',
    stack: ['Python', 'FastAPI', 'PyMuPDF', 'Gemini'],
    repo: 'Intelligent-RAG-Document-Assistant',
    evidence: 'Browse the document assistant starter',
  },
];

const skillGroups = [
  ['Languages', ['Python', 'Java', 'C', 'SQL', 'JavaScript']],
  ['AI & Machine Learning', ['PyTorch', 'TensorFlow', 'Keras', 'Stable-Baselines3', 'Reinforcement Learning (PPO)', 'Deep Learning', 'NumPy', 'Pandas']],
  ['Backend & Cloud', ['FastAPI', 'WebSockets', 'Docker', 'Apache Parquet', 'AWS', 'Google Cloud Platform']],
  ['Frontend', ['React.js', 'HTML', 'CSS', 'Responsive Web Design']],
  ['Domains', ['Computer Vision', 'NLP', 'Network Security', 'RAG']],
];

const links = [
  ['About', 'about'], ['Projects', 'projects'], ['Research', 'research'],
  ['Skills', 'skills'], ['Education', 'education'], ['Contact', 'contact'],
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef(null);

  function handleEscape(event) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      toggle.current?.focus();
    }
  }

  function followLink(event) {
    if (!menuOpen) return;
    document.getElementById(event.currentTarget.hash.slice(1))?.focus({ preventScroll: true });
    setMenuOpen(false);
  }

  return (
    <header className="site-header" onKeyDown={handleEscape}>
      <div className="container header-inner">
        <a className="brand" href="#home" onClick={followLink}>
          <span className="monogram" aria-hidden="true">RH</span> Rayan Haque
        </a>
        <button className="menu-toggle" type="button" ref={toggle} onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen} aria-controls="main-nav">
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
        <nav id="main-nav" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={followLink}>{label}</a>)}
          <a className="nav-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <span className="sr-only">(PDF, opens in a new tab)</span></a>
        </nav>
      </div>
    </header>
  );
}

function Tags({ items }) {
  return <ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

function ProjectCard({ project }) {
  const { area, status, period, title, summary, detail, stack, repo, evidence } = project;
  return (
    <article className="project-card">
      <div className="project-meta"><p className="project-area">{area}</p><p>{status} · {period}</p></div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{summary}</p>
        <p>{detail}</p>
        <Tags items={stack} />
        <a className="evidence-link" href={`${github}/${repo}`}>{evidence} on GitHub</a>
      </div>
    </article>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <Header />
      <main id="home" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-name">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="availability"><span aria-hidden="true" /> Open to internships and research opportunities</p>
              <h1 id="hero-name">Rayan Haque</h1>
              <p className="hero-role">Computer science student in Bengaluru</p>
              <p className="hero-intro">I study Computer Science and Engineering at BMS College of Engineering. I’m interested in how models behave when training hardware is limited, network conditions change, or an answer needs a source.</p>
              <div className="actions">
                <a className="button primary" href="#projects">Explore projects</a>
                <a className="button secondary" href={resumeUrl} target="_blank" rel="noopener noreferrer">View résumé <span className="sr-only">(PDF, opens in a new tab)</span></a>
              </div>
            </div>
            <aside className="hero-note" aria-label="Current work">
              <p>Currently working on</p>
              <ul><li>Protocol selection with reinforcement learning</li><li>Code review with Gemini</li><li>PDF question answering with page references</li></ul>
            </aside>
          </div>
        </section>

        <section className="section about container" id="about" tabIndex={-1} aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <div>
            <p className="about-lead">My research work started with chest X-rays and a practical constraint: limited GPU memory.</p>
            <p>On ThoraxSense, I worked with PyTorch and TensorFlow/Keras to compare two training pipelines. More recently I’ve been exploring how a reinforcement learning agent can choose a communication protocol as network conditions change.</p>
          </div>
        </section>

        <section className="section tinted" id="projects" tabIndex={-1} aria-labelledby="projects-title">
          <div className="container">
            <h2 id="projects-title">Selected projects</h2>
            <div className="project-grid">{projects.map(project => <ProjectCard key={project.title} project={project} />)}</div>
          </div>
        </section>

        <section className="section container" id="research" tabIndex={-1} aria-labelledby="research-title">
          <h2 id="research-title">Research</h2>
          <article className="research-card">
            <div>
              <p className="research-journal">Preprint · December 2025</p>
              <h3>ThoraxSense: Enhanced Thoracic Multi-Disease Detection on Chest X-Rays Using DenseNet121 and Class-Imbalance Optimization</h3>
              <p>Ansh Srivastava, Rishi Raj, Rishit Sharma, Rayan Haque, Rashmi K.B., and Shobana T.S.</p>
              <p>The study compared PyTorch DenseNet121 and TensorFlow/Keras VGG16 with class-imbalance compensation for multi-disease prediction. The AUROC values shown are for VGG16.</p>
              <a className="evidence-link" href="https://doi.org/10.21203/rs.3.rs-8277163/v1">Read the preprint</a>
            </div>
            <dl className="metrics">
              <div><dt>Disease classes</dt><dd>14</dd></div>
              <div><dt>Mean AUROC</dt><dd>0.8003</dd></div>
              <div><dt>Micro AUROC</dt><dd>0.8406</dd></div>
            </dl>
          </article>
        </section>

        <section className="section tinted" id="skills" tabIndex={-1} aria-labelledby="skills-title">
          <div className="container">
            <h2 id="skills-title">Technical skills</h2>
            <div className="skills-grid">
              {skillGroups.map(([name, items]) => <div className="skill-group" key={name}><h3>{name}</h3><Tags items={items} /></div>)}
            </div>
          </div>
        </section>

        <section className="section container background-grid" id="education" tabIndex={-1} aria-label="Education and certifications">
          <div>
            <h2>Education</h2>
            <ul className="record-list">
              <li><p className="record-date">Aug 2023 – May 2027 (expected)</p><h3>BMS College of Engineering</h3><p>B.Tech in Computer Science and Engineering · Bengaluru, India</p><p>CGPA 8.925 / 10</p></li>
              <li><p className="record-date">2020</p><h3>Ryan International School (ICSE)</h3><p>Secondary (Class X) · India · 90.00%</p></li>
            </ul>
          </div>
          <div>
            <h2>Certifications</h2>
            <ul className="record-list">
              <li><p className="record-date">2026</p><h3>Google Cloud Career Launchpad Program</h3><p>Google Cloud</p></li>
              <li><p className="record-date">2026</p><h3>Full-Stack Web Development</h3><p>Udemy</p></li>
            </ul>
          </div>
        </section>

        <section className="section contact" id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <div className="container contact-inner">
            <div><h2 id="contact-title">Get in touch</h2><p>I’m open to AI/ML research and software engineering internships.</p></div>
            <div className="actions">
              <a className="button light" href="mailto:rayanhaque20@gmail.com">Email me</a>
              <a className="button outline-light" href="https://github.com/RayanHaque" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a>
            </div>
          </div>
        </section>
      </main>
      <footer><div className="container footer-inner"><span>© {new Date().getFullYear()} Rayan Haque</span><a href="#home">Back to top</a></div></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
