import LegalPage from './LegalPage';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    body: [
      {
        type: 'p',
        text: 'Aqua Innovations ("AQUA", "we", "us", "our") designs brand experiences, environments, and digital products for clients across Bangladesh and beyond. This Privacy Policy explains what information we collect, how we use it, and the choices you have when you engage with us — whether you visit this website, brief a project, or attend an event we produce.',
      },
      {
        type: 'p',
        text: 'We treat the data you share with the same discipline we apply to our work: with clarity, restraint, and purpose. If anything here is unclear, write to us and we will walk you through it.',
      },
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    body: [
      {
        type: 'p',
        text: 'We only collect information that helps us answer, serve, or deliver to you. Specifically:',
      },
      {
        type: 'list',
        items: [
          'Contact details you provide — name, email, phone number, company, and any context you include in briefs or enquiries.',
          'Project materials shared with us for scoping, design, or production, including brand guidelines, creative assets, and technical requirements.',
          'Website interaction data — pages visited, referring source, device type, and session duration, collected through privacy-respecting analytics.',
          'Event participation data — check-ins, photography, and interaction metrics when you attend an experience we produce (always disclosed on site).',
        ],
      },
      {
        type: 'note',
        text: 'We do not collect sensitive categories of personal data (financial account credentials, government IDs, health information) through this website.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: [
      {
        type: 'p',
        text: 'Your data supports specific, stated purposes — nothing speculative.',
      },
      {
        type: 'list',
        items: [
          'Respond to enquiries, prepare proposals, and manage active engagements.',
          'Improve the performance and clarity of this website and the case studies we publish.',
          'Send occasional project updates or studio news to people who have asked to hear from us.',
          'Meet legal, accounting, and contractual obligations that apply to a creative studio operating in Bangladesh.',
        ],
      },
    ],
  },
  {
    id: 'cookies-analytics',
    title: 'Cookies & analytics',
    body: [
      {
        type: 'p',
        text: 'This website uses a minimal set of cookies and lightweight analytics to understand which work resonates and where experiences can be sharpened. We do not sell data, run advertising pixels, or build user profiles.',
      },
      {
        type: 'p',
        text: 'You can clear cookies through your browser settings at any time. Doing so will not affect your ability to contact us or review our work.',
      },
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing & third parties',
    body: [
      {
        type: 'p',
        text: 'We share information only with trusted partners who help us deliver — email providers, file storage, production vendors, and venue partners for live experiences. Each is bound by confidentiality expectations at least as strict as ours.',
      },
      {
        type: 'p',
        text: 'We do not sell, rent, or trade personal information. We will disclose data only when required by law, regulation, or valid legal process.',
      },
    ],
  },
  {
    id: 'retention',
    title: 'Data retention',
    body: [
      {
        type: 'p',
        text: 'We keep project files and communication for as long as the engagement is active and for a reasonable archival window afterwards (typically up to three years) to support warranty claims, case studies, and audits. Enquiries that do not become projects are removed within twelve months.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: [
      {
        type: 'p',
        text: 'You can ask us to:',
      },
      {
        type: 'list',
        items: [
          'Access the personal information we hold about you.',
          'Correct inaccurate or outdated information.',
          'Delete information that we no longer need for a legitimate purpose.',
          'Stop sending you project updates or studio news.',
        ],
      },
      {
        type: 'p',
        text: 'Write to communications@aquabd.pro with the subject line "Privacy Request" and we will respond within a reasonable timeframe.',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    body: [
      {
        type: 'p',
        text: 'We use encrypted transport, access-controlled storage, and signed agreements with vendors. No system is perfectly secure, so we ask collaborators to share sensitive files through the channels we nominate rather than unsecured email.',
      },
    ],
  },
  {
    id: 'children',
    title: 'Children',
    body: [
      {
        type: 'p',
        text: 'This website and our services are intended for professional audiences. We do not knowingly collect information from children under 16. If you believe a child has shared data with us, please contact us and we will remove it.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: [
      {
        type: 'p',
        text: 'As the studio evolves, this policy will too. When we make material changes, we will update the "Last Updated" date above and, where appropriate, flag the change through our usual channels.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [
      {
        type: 'p',
        text: 'Privacy questions, data requests, or concerns about this policy can reach us at communications@aquabd.pro. We treat every message as a real conversation — expect a considered reply, not a template.',
      },
    ],
  },
];

export default function Privacy({ lenis }) {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we handle your information."
      intro="A plain-language account of the data we collect when you brief a project, browse this site, or attend an experience we produce — and the principles that guide how we look after it."
      updated="April 2026"
      sections={sections}
      lenis={lenis}
    />
  );
}
