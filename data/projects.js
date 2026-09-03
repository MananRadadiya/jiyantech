export const projectsData = [
  {
    id: 'analytics-engine',
    category: 'Product Engineering',
    title: 'Making meaningful data easier to act on.',
    description:
      'High-velocity enterprise analytics engine with millisecond query responses and real-time behavioral visualizations.',
    tags: ['React', 'TypeScript', 'Node.js', 'ClickHouse', 'Tailwind'],
    type: 'large',
    metrics: [
      { label: 'Active users', value: '84,291' },
      { label: 'Conversion', value: '+8.42%' },
      { label: 'Uptime', value: '99.98%' },
    ],
    growth: '+24.8%',
  },
  {
    id: 'cloud-architecture',
    category: 'Platform Architecture',
    title: 'The quiet infrastructure behind big ideas.',
    description:
      'Distributed microservice framework designed for low latency, automated load distribution, and multi-region failover.',
    tags: ['Go', 'Kubernetes', 'Redis', 'GraphQL', 'AWS'],
    type: 'side',
    modules: ['AUTH / JWT', 'DATA / PIPELINE', 'EDGE / CDN'],
  },
];
