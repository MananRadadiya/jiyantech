import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { navLinks, footerLinks } from './data/navigation.js';
import { servicesData } from './data/services.js';
import { projectsData } from './data/projects.js';
import { metricsData } from './data/metrics.js';
import { principlesData } from './data/principles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// EJS View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Global locals for all EJS templates
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.navLinks = navLinks;
  res.locals.footerLinks = footerLinks;
  next();
});

// Extra projects for /work page
const extraProjects = [
  {
    id: 'fintech-saas',
    category: 'SaaS Platform',
    title: 'Automating multi-currency reconciliation at scale.',
    description:
      'Enterprise treasury orchestration platform managing multi-bank balance consolidation and automated ledger settlement.',
    tags: ['React', 'Next.js', 'Go', 'PostgreSQL', 'Docker'],
    metric: 'Over $400M+ volume processed annually',
    growth: '+18.6%',
  },
  {
    id: 'logistics-mobile',
    category: 'Mobile Applications',
    title: 'Real-time telemetry and fleet routing app.',
    description:
      'Offline-first mobile application featuring turn-by-turn routing optimization and sub-second driver dispatch telemetry.',
    tags: ['React Native', 'TypeScript', 'Mapbox', 'WebSockets', 'AWS IoT'],
    metric: '99.99% sync reliability in offline zones',
    growth: '+34.2%',
  },
];
const allProjects = [...projectsData, ...extraProjects];

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Engineering What Matters Next',
    servicesData,
    projectsData,
    metricsData,
    principlesData,
  });
});

app.get('/services', (req, res) => {
  res.render('services', {
    title: 'Specialized Capabilities & Engineering',
    servicesData,
  });
});

app.get('/approach', (req, res) => {
  res.render('approach', {
    title: 'Our Approach & Engineering Principles',
    principlesData,
  });
});

app.get('/work', (req, res) => {
  res.render('work', {
    title: 'Case Studies & Production Work',
    allProjects,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About JiyanTech — Mission & Craft',
    metricsData,
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact JiyanTech — Start a Project',
  });
});

app.post('/contact', (req, res) => {
  const { name, email, company, serviceType, budget, message } = req.body;
  console.log('--- [Transmission Received] ---');
  console.log({ name, email, company, serviceType, budget, message, timestamp: new Date().toISOString() });

  if (req.xhr || req.headers.accept?.includes('json')) {
    return res.json({ success: true, message: 'Transmission received. We will respond within 24 hours.' });
  }

  res.render('contact', {
    title: 'Contact JiyanTech — Start a Project',
    submitted: true,
  });
});

// 404 Catch-All
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found (404)',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✓ JiyanTech EJS Server running on http://localhost:${PORT}`);
});
