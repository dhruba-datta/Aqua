import LegalPage from './LegalPage';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    body: [
      {
        type: 'p',
        text: 'These Terms govern your use of the AQUA Innovations website and any services we provide in connection with it. By browsing the site, submitting an enquiry, or engaging us on a project, you agree to these Terms. If you do not agree, please do not use the site.',
      },
      {
        type: 'p',
        text: 'Individual engagements — production work, retainers, workshops, or events — are governed by a separate Statement of Work signed between AQUA and the client. In the event of a conflict, the Statement of Work takes precedence over these Terms.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Our services',
    body: [
      {
        type: 'p',
        text: 'AQUA operates as a multi-disciplinary experience lab. Our services include, but are not limited to:',
      },
      {
        type: 'list',
        items: [
          'Brand strategy, identity systems, and visual direction.',
          'Experiential design — activations, exhibitions, venue storytelling, and live production.',
          'Digital design and build — websites, applications, and content systems.',
          'Creative production, content, and campaign delivery.',
        ],
      },
      {
        type: 'p',
        text: 'We will only take on work where we believe we can deliver to a standard that reflects the studio. That judgement is always ours to make.',
      },
    ],
  },
  {
    id: 'use-of-site',
    title: 'Use of this website',
    body: [
      {
        type: 'p',
        text: 'You may use this website for lawful purposes only. You agree not to:',
      },
      {
        type: 'list',
        items: [
          'Attempt to gain unauthorised access to any part of the site or its infrastructure.',
          'Use the site to transmit malicious code, spam, or automated scraping tools.',
          'Copy, reproduce, or repurpose the content without written permission.',
          'Misrepresent your identity or the organisation you represent when making an enquiry.',
        ],
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: [
      {
        type: 'p',
        text: 'All content on this website — text, graphics, layouts, code, case studies, and imagery — is the property of AQUA Innovations or our partners and is protected by applicable copyright and trademark law.',
      },
      {
        type: 'p',
        text: 'Deliverables produced for clients are governed by the Statement of Work, which sets out ownership, licensing, and usage rights in detail. Unless explicitly transferred, background methods, tools, and templates remain the property of AQUA.',
      },
    ],
  },
  {
    id: 'client-responsibilities',
    title: 'Client responsibilities',
    body: [
      {
        type: 'p',
        text: 'Great work is a two-way commitment. When you engage us on a project, you agree to:',
      },
      {
        type: 'list',
        items: [
          'Provide accurate briefs, assets, and approvals within agreed timelines.',
          'Ensure you have the rights to any materials you supply to us.',
          'Nominate decision-makers and keep communication timely during the engagement.',
          'Settle invoices according to the payment schedule in the Statement of Work.',
        ],
      },
    ],
  },
  {
    id: 'fees',
    title: 'Fees, invoices & payment',
    body: [
      {
        type: 'p',
        text: 'All fees are stated in the relevant Statement of Work. Unless otherwise agreed, invoices are issued against milestones and payable within fourteen (14) days of receipt.',
      },
      {
        type: 'p',
        text: 'Late payments may pause active work, delay milestones, and incur reasonable recovery costs. Out-of-pocket expenses (print, vendor payments, travel) are passed through at cost with prior approval.',
      },
    ],
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    body: [
      {
        type: 'p',
        text: 'We treat client information with the discretion it deserves. Strategy documents, briefs, unreleased campaigns, and internal operations shared with us remain confidential, both during and after the engagement, unless the information is already public or disclosure is required by law.',
      },
      {
        type: 'p',
        text: 'Where required, we are happy to sign a mutual NDA before discussions begin.',
      },
    ],
  },
  {
    id: 'warranties',
    title: 'Warranties & disclaimers',
    body: [
      {
        type: 'p',
        text: 'We will perform our services with the care, skill, and diligence expected of a professional studio operating in our field. Beyond that, this website and the content on it are provided on an "as is" basis, without warranties of any kind, whether express or implied.',
      },
      {
        type: 'p',
        text: 'We do not guarantee that the site will be uninterrupted, error-free, or compatible with every device or browser.',
      },
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: [
      {
        type: 'p',
        text: 'To the fullest extent permitted by law, AQUA Innovations is not liable for indirect, incidental, consequential, or exemplary damages arising from your use of this website or from any engagement. Our aggregate liability in connection with a project shall not exceed the fees paid to us for that specific engagement.',
      },
    ],
  },
  {
    id: 'third-parties',
    title: 'Third-party links & vendors',
    body: [
      {
        type: 'p',
        text: 'This website may link to external sites, and projects may involve specialist vendors we bring in. We select partners carefully, but we are not responsible for the content, availability, or practices of any third party.',
      },
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    body: [
      {
        type: 'p',
        text: 'Either party may end an engagement under the conditions set out in the Statement of Work. On termination, you remain responsible for fees and expenses accrued up to the date of termination, and we will deliver work completed to that point in an agreed format.',
      },
      {
        type: 'p',
        text: 'We reserve the right to suspend access to the site or decline new engagements if these Terms are breached in a material way.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: [
      {
        type: 'p',
        text: 'These Terms are governed by the laws of the People\u2019s Republic of Bangladesh. Any dispute arising from these Terms or from an engagement with AQUA will be resolved in the courts of Dhaka, unless a Statement of Work specifies another forum.',
      },
    ],
  },
  {
    id: 'updates',
    title: 'Updates to these terms',
    body: [
      {
        type: 'p',
        text: 'We may update these Terms as our studio and the regulatory landscape evolve. Material changes will be reflected in the "Last Updated" date above. Continued use of the site after an update signals acceptance of the revised Terms.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    body: [
      {
        type: 'p',
        text: 'Questions about these Terms or about starting a project can reach us at hello@aquainnovations.com. We read every message carefully and reply personally.',
      },
    ],
  },
];

export default function Terms({ lenis }) {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="The agreement behind our work."
      intro="The principles and practical rules that frame how you use this website and how we take on engagements together — written to be read, not skimmed."
      updated="April 2026"
      sections={sections}
      lenis={lenis}
    />
  );
}
