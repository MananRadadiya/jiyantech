import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react';
import './index.css';

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Digital product engineering',
    description: 'From first principle to final release, we build digital products that feel clear, fast, and ready for real-world scale.',
    tags: 'Strategy · UX · Frontend · Backend',
  },
  {
    number: '02',
    title: 'SaaS development',
    description: 'Flexible, dependable platforms designed around the workflows that make your business move.',
    tags: 'Architecture · APIs · Cloud · Security',
  },
  {
    number: '03',
    title: 'Product design & UI/UX',
    description: 'Interfaces with a point of view. Every interaction is shaped to make complex things feel natural.',
    tags: 'Research · Systems · Prototyping · UI',
  },
  {
    number: '04',
    title: 'Backend & API engineering',
    description: 'The dependable systems beneath ambitious products, built for speed, resilience, and change.',
    tags: 'Data · Integrations · Performance · DevOps',
  },
  {
    number: '05',
    title: 'Mobile applications',
    description: 'Focused mobile experiences that bring your product closer to the people using it every day.',
    tags: 'iOS · Android · React Native · Launch',
  },
  {
    number: '06',
    title: 'Custom business software',
    description: 'Purpose-built software that removes friction from the work that matters most to your team.',
    tags: 'Operations · Automation · Dashboards · Tools',
  },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="JiyanTech home">
      <span className="logo-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>Jiyan<span>Tech</span></span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#services" onClick={close}>Services</a>
          <a href="#approach" onClick={close}>Approach</a>
          <a href="#work" onClick={close}>Work</a>
          <a href="#about" onClick={close}>About</a>
          <a className="mobile-cta" href="#contact" onClick={close}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function SystemVisual() {
  return (
    <div className="system-visual" aria-hidden="true">
      <div className="system-orbit orbit-one" />
      <div className="system-orbit orbit-two" />
      <div className="system-orbit orbit-three" />
      <div className="system-core"><span /><span /><span /></div>
      <div className="system-node node-a" /><div className="system-node node-b" /><div className="system-node node-c" /><div className="system-node node-d" />
      <span className="system-label label-a">data / 04</span>
      <span className="system-label label-b">system online</span>
      <span className="system-label label-c">JY — 2024</span>
      <div className="system-line line-a" /><div className="system-line line-b" /><div className="system-line line-c" />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline"><span>Independent technology partner</span><span>Hyderabad · Working worldwide</span></div>
      <div className="hero-content">
        <div className="hero-kicker"><span className="eyebrow-dot" /> Engineering what matters next</div>
        <h1>We build the<br /><em>digital systems</em><br />behind what’s next.</h1>
        <p className="hero-copy">JiyanTech partners with ambitious teams to turn complex ideas into reliable digital products, platforms, and software that move business forward.</p>
        <div className="hero-actions"><a className="button button-primary" href="#contact">Start a project <ArrowUpRight size={17} /></a><a className="text-link" href="#work">Explore our work <ArrowDownRight size={17} /></a></div>
      </div>
      <SystemVisual />
      <div className="hero-foot"><span>Scroll to explore</span><span className="scroll-line" /></div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  return (
    <section className="services section-pad" id="services">
      <div className="section-intro reveal">
        <div><p className="eyebrow">What we build</p><h2>End-to-end capability.<br /><span>One connected team.</span></h2></div>
        <p className="intro-note">From early product thinking to the systems that keep it running, we bring clarity to every layer of the build.</p>
      </div>
      <div className="service-layout reveal">
        <div className="service-list" role="tablist" aria-label="Services">
          {services.map((service, index) => (
            <button key={service.number} className={`service-row ${active === index ? 'active' : ''}`} onClick={() => setActive(index)} role="tab" aria-selected={active === index}>
              <span className="service-number">{service.number}</span><span className="service-title">{service.title}</span><ArrowRight className="service-arrow" size={20} />
            </button>
          ))}
        </div>
        <div className="service-detail" role="tabpanel">
          <div className="detail-visual"><div className="detail-grid" /><div className="detail-signal"><span /><span /><span /><span /><span /></div><span className="detail-code">{services[active].number} / SYSTEMS</span></div>
          <div className="detail-copy"><p className="eyebrow">Selected capability</p><h3>{services[active].title}</h3><p>{services[active].description}</p><div className="detail-tags">{services[active].tags}</div></div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="approach-grid" />
      <div className="approach-inner section-pad">
        <div className="approach-heading reveal"><p className="eyebrow light">How we think</p><h2>Good technology is<br /><span>felt, not announced.</span></h2></div>
        <div className="principles reveal">
          <div className="principle"><span>01</span><h3>Make the complex clear.</h3><p>Strong products start with a sharp understanding of the problem, not a rush to the solution.</p></div>
          <div className="principle"><span>02</span><h3>Build for the real world.</h3><p>We think beyond the launch moment — designing systems that stay useful as needs evolve.</p></div>
          <div className="principle"><span>03</span><h3>Leave room for better.</h3><p>Every decision should create momentum. We keep the work focused, open, and ready to grow.</p></div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work section-pad" id="work">
      <div className="section-intro work-intro reveal"><div><p className="eyebrow">Selected work</p><h2>Built for impact,<br /><span>not applause.</span></h2></div><a className="text-link" href="#contact">Discuss your product <ArrowUpRight size={17} /></a></div>
      <div className="work-grid">
        <article className="project project-large reveal"><div className="project-art analytics-art"><div className="art-top"><span>performance / overview</span><span>● live</span></div><div className="chart-label">Growth over time <strong>+24.8%</strong></div><div className="chart"><i /><i /><i /><i /><i /><i /><i /><svg viewBox="0 0 600 170" preserveAspectRatio="none"><path d="M0 150 C60 145 67 116 120 125 S160 87 215 105 S255 58 310 82 S360 40 412 59 S464 30 505 42 S550 10 600 15" /></svg></div><div className="art-stats"><span>Active users <b>84,291</b></span><span>Conversion <b>8.42%</b></span><span>Uptime <b>99.98%</b></span></div></div><div className="project-meta"><span>Product engineering</span><h3>Making meaningful data<br />easier to act on.</h3><span className="project-arrow"><MoveUpRight size={18} /></span></div></article>
        <article className="project project-side reveal"><div className="project-art architecture-art"><div className="arch-window"><span>API / CORE</span><div className="arch-box box-one">AUTH</div><div className="arch-box box-two">DATA</div><div className="arch-box box-three">EDGE</div><div className="arch-connector conn-one" /><div className="arch-connector conn-two" /></div></div><div className="project-meta"><span>Platform architecture</span><h3>The quiet infrastructure<br />behind big ideas.</h3><span className="project-arrow"><MoveUpRight size={18} /></span></div></article>
      </div>
      <div className="project-note reveal"><span className="eyebrow">A note on our work</span><p>We don’t collect logos. We build the systems that make ambitious work possible — with the teams who trust us to get it right.</p></div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-main reveal"><p className="eyebrow">Why JiyanTech</p><h2>Technology is only valuable when it makes <span>something better.</span></h2><p className="about-copy">We are a technology partner for businesses ready to move with intent. Our work sits at the intersection of product thinking, engineering discipline, and a deep respect for the people who use what we build.</p></div>
      <div className="metrics reveal"><div className="metric"><strong>50<span>+</span></strong><small>Projects delivered</small></div><div className="metric"><strong>6<span>+</span></strong><small>Years of experience</small></div><div className="metric"><strong>98<span>%</span></strong><small>Client satisfaction</small></div></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-cta section-pad reveal"><p className="eyebrow light">Start a conversation</p><h2>Have something<br /><span>worth building?</span></h2><a className="button button-light" href="mailto:hello@jiyantech.com">Let’s talk <ArrowUpRight size={17} /></a></div>
      <div className="footer-bottom section-pad"><div><Logo /><p>Digital products, engineered<br />for what comes next.</p></div><div className="footer-links"><div><span>Explore</span><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a></div><div><span>Connect</span><a href="mailto:hello@jiyantech.com">Email us</a><a href="#contact">Start a project</a></div></div><div className="footer-legal"><span>© 2024 JiyanTech</span><span>Independent technology partner</span></div></div>
    </footer>
  );
}

function App() {
  return <div className="app-shell"><Navbar /><main><Hero /><Services /><Approach /><Work /><About /></main><Footer /></div>;
}

export default App;
