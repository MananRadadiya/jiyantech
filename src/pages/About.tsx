import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Menu,
  X,
  Layers,
  Cpu,
  Shield,
  Compass,
} from 'lucide-react';

type Value = {
  icon: typeof Layers;
  title: string;
  description: string;
};

const values: Value[] = [
  {
    icon: Compass,
    title: 'Purpose before features',
    description: 'Every decision starts with understanding why something needs to exist. We build what matters, not what trends.',
  },
  {
    icon: Cpu,
    title: 'Engineering as craft',
    description: 'Clean architecture, thoughtful abstractions, and code that reads like it was written for the next person.',
  },
  {
    icon: Shield,
    title: 'Reliability over flash',
    description: 'The systems we build are designed to run quietly and dependably, long after the launch moment passes.',
  },
  {
    icon: Layers,
    title: 'Clarity through simplicity',
    description: 'We reduce complexity until what remains is essential. The best interfaces feel inevitable.',
  },
];

const capabilities = [
  'Product strategy & roadmap',
  'UX research & interaction design',
  'Frontend engineering',
  'Backend & API architecture',
  'Cloud infrastructure',
  'Mobile development',
  'Performance optimization',
  'Security & compliance',
];

const timeline = [
  {
    year: '2018',
    title: 'The beginning',
    description: 'JiyanTech was founded with a simple conviction: technology should serve the people who use it, not the other way around.',
  },
  {
    year: '2020',
    title: 'Growing with purpose',
    description: 'Expanded into full-stack product engineering, partnering with teams across industries to build platforms that scale.',
  },
  {
    year: '2022',
    title: 'Deepening the craft',
    description: 'Refined our practice around SaaS architecture, design systems, and the infrastructure that makes ambitious products possible.',
  },
  {
    year: 'Today',
    title: 'Engineering what matters next',
    description: 'We continue to partner with ambitious teams, building the digital systems behind what comes next.',
  },
];

function Logo() {
  return (
    <a className="logo" href="/" aria-label="JiyanTech home">
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
          <a href="/#services" onClick={close}>Services</a>
          <a href="/#approach" onClick={close}>Approach</a>
          <a href="/#work" onClick={close}>Work</a>
          <a href="/about" onClick={close}>About</a>
          <a className="mobile-cta" href="/#contact" onClick={close}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
        <a className="nav-cta" href="/#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function AboutHero() {
  return (
    <section className="about-hero" id="top">
      <div className="about-hero-grid" aria-hidden="true" />
      <div className="about-hero-topline">
        <span>About JiyanTech</span>
        <span>Independent · Engineering-led</span>
      </div>
      <div className="about-hero-content">
        <div className="hero-kicker"><span className="eyebrow-dot" /> Our story</div>
        <h1>We build technology<br />that makes <em>something</em><br />genuinely better.</h1>
        <p className="about-hero-copy">JiyanTech is an independent technology partner for teams who care about the difference between something that works and something that works well. We turn complex problems into digital products and systems that feel considered, reliable, and built to last.</p>
      </div>
      <div className="about-hero-visual" aria-hidden="true">
        <div className="about-orbit about-orbit-one" />
        <div className="about-orbit about-orbit-two" />
        <div className="about-orbit about-orbit-three" />
        <div className="about-core" />
        <div className="about-node about-node-a" />
        <div className="about-node about-node-b" />
        <div className="about-node about-node-c" />
        <div className="about-node about-node-d" />
        <div className="about-node about-node-e" />
        <span className="about-vlabel about-vlabel-a">est. 2018</span>
        <span className="about-vlabel about-vlabel-b">independent</span>
        <span className="about-vlabel about-vlabel-c">engineering-led</span>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="about-story section-pad">
      <div className="story-layout reveal">
        <div className="story-lead">
          <p className="eyebrow">The conviction</p>
          <h2>Technology is only<br />valuable when it makes<br /><span>something better.</span></h2>
        </div>
        <div className="story-body">
          <p>We started JiyanTech because we kept seeing the same pattern: ambitious teams with real problems, held back by technology that was built to impress rather than to serve.</p>
          <p>So we built a different kind of technology partner — one that leads with engineering discipline, respects the people who use the software, and measures success by whether the work actually made something better.</p>
          <p>Today, we partner with teams across industries to build digital products, SaaS platforms, and custom software. We bring product thinking, engineering rigor, and a deep respect for the craft to every project.</p>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="about-values" id="values">
      <div className="about-values-grid" aria-hidden="true" />
      <div className="about-values-inner section-pad">
        <div className="values-heading reveal">
          <p className="eyebrow light">What we believe</p>
          <h2>Four principles that<br /><span>shape everything we build.</span></h2>
        </div>
        <div className="values-grid reveal">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div className="value-card" key={value.title}>
                <div className="value-icon"><Icon size={22} strokeWidth={1.6} /></div>
                <span className="value-number">{`0${i + 1}`}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="about-capabilities section-pad">
      <div className="capabilities-layout reveal">
        <div className="capabilities-lead">
          <p className="eyebrow">Full-stack capability</p>
          <h2>One connected team.<br /><span>Every layer of the build.</span></h2>
          <p className="capabilities-note">We don't hand off between silos. Strategy, design, and engineering live under one roof, so the work stays coherent from first conversation to final deployment.</p>
        </div>
        <div className="capabilities-list">
          {capabilities.map((cap) => (
            <div className="capability-item" key={cap}>
              <Check size={15} strokeWidth={2.5} />
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="about-timeline section-pad">
      <div className="timeline-intro reveal">
        <p className="eyebrow">The journey</p>
        <h2>Six years of<br /><span>building what matters.</span></h2>
      </div>
      <div className="timeline-track reveal">
        <div className="timeline-line" />
        {timeline.map((item) => (
          <div className="timeline-item" key={item.year}>
            <div className="timeline-marker" />
            <span className="timeline-year">{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MetricsBand() {
  return (
    <section className="about-metrics-band section-pad">
      <div className="metrics-band-inner reveal">
        <div className="metric"><strong>50<span>+</span></strong><small>Projects delivered</small></div>
        <div className="metric"><strong>6<span>+</span></strong><small>Years of experience</small></div>
        <div className="metric"><strong>98<span>%</span></strong><small>Client satisfaction</small></div>
        <div className="metric"><strong>1</strong><small>Connected team</small></div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="about-cta section-pad reveal">
      <div className="about-cta-inner">
        <p className="eyebrow">Let's build together</p>
        <h2>Have something<br /><span>worth building?</span></h2>
        <p className="about-cta-copy">If you're working on something that matters, we'd like to hear about it. No pressure, no templates — just a real conversation about what you're trying to build.</p>
        <div className="about-cta-actions">
          <a className="button button-primary" href="mailto:hello@jiyantech.com">Start a conversation <ArrowUpRight size={17} /></a>
          <a className="text-link" href="/#work">See our work <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom section-pad">
        <div>
          <Logo />
          <p>Digital products, engineered<br />for what comes next.</p>
        </div>
        <div className="footer-links">
          <div><span>Explore</span><a href="/#services">Services</a><a href="/#work">Work</a><a href="/about">About</a></div>
          <div><span>Connect</span><a href="mailto:hello@jiyantech.com">Email us</a><a href="/#contact">Start a project</a></div>
        </div>
        <div className="footer-legal"><span>© 2024 JiyanTech</span><span>Independent technology partner</span></div>
      </div>
    </footer>
  );
}

export default function About() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <AboutHero />
        <Story />
        <Values />
        <Capabilities />
        <Timeline />
        <MetricsBand />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
