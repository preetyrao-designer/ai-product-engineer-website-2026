import type { ReactNode } from 'react';
import { Lightbulb, CodeXml, Rocket, UsersRound, Layers3, BrainCircuit, PanelsTopLeft, Workflow, Network, ShieldCheck } from 'lucide-react';
import FUIBentoGridDark from './bento';
import './program-information.css';

function InformationSection({ id, eyebrow, title, copy, children }: { id: string; eyebrow: string; title: string; copy: string; children: ReactNode }) {
  return <section id={id} className="program-information" aria-labelledby={`${id}-title`}>
    <header className="section-intro"><p className="admissions-eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2><p className="admissions-intro-copy">{copy}</p></header>{children}
  </section>;
}

export function BuilderFit() {
  const icons = [Lightbulb, CodeXml, Rocket, UsersRound];
  const colors = [['#FFE2A8', '#F59E0B'], ['#9EDCFF', '#4785FF'], ['#E2BEFF', '#9B64F4'], ['#9AF5E4', '#23BBA6']];
  const items = [
    ['You have an idea and need the skills to build it.', 'Learn how interfaces, data, and AI work together so you can turn an idea into something people can use.'],
    ['You can prompt, but cannot explain the code.', 'Understand the decisions behind AI-generated code. Learn to inspect, test, and improve what you build.'],
    ['Your prototype has never reached a real user.', 'Carry one product through its data layer, AI capabilities, evaluation, and deployment.'],
    ['You want people to build alongside.', 'Start together in Sri Lanka, develop your product through the online core, and finish with an in-person hackathon in Bengaluru.'],
  ];
  return <InformationSection id="who-its-for" eyebrow="Is this you?" title="For people ready to become builders." copy="For non-technical founders, product managers, and ambitious creators who want to build intelligently with AI.">
    <div className="program-card-grid">{items.map(([title, copy], i) => {
      const Icon = icons[i];
      return <article key={title} className="program-info-card builder-fit-card">
        <Icon className="builder-fit-icon" size={60} strokeWidth={1.8} stroke={`url(#builder-fit-gradient-${i})`} aria-hidden="true">
          <defs><linearGradient id={`builder-fit-gradient-${i}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={colors[i][0]}/><stop offset="1" stopColor={colors[i][1]}/></linearGradient></defs>
        </Icon>
        <h3>{title}</h3><p>{copy}</p>
      </article>;
    })}</div>
  </InformationSection>;
}

export function BuildOutcomes() {
  const icons = [Layers3, BrainCircuit, PanelsTopLeft, Workflow, Network, ShieldCheck];
  const colors = [['#9EDCFF', '#4785FF'], ['#E2BEFF', '#9B64F4'], ['#FFE2A8', '#F59E0B'], ['#FFB9D9', '#E967A3'], ['#9AF5E4', '#23BBA6'], ['#BDF5BB', '#51BD78']];
  const weeks = [
    ['Week 02', 'Understand the software underneath', 'Connect the browser, server, and data layer. Learn to reason about the system you are building.'],
    ['Week 03', 'Give the model clear instructions', 'Explore prompting, structured outputs, tool calls, and streaming as parts of an application.'],
    ['Week 04', 'Turn the idea into a working build', 'Bring interface design, AI coding agents, and persistent data into the same product.'],
    ['Week 05', 'Coordinate agents that do useful work', 'Connect agent workflows and consider the guardrails and budgets they need.'],
    ['Week 06', 'Connect knowledge and tools', 'Use retrieval, vector data, and MCP to connect your product to relevant information and external capabilities.'],
    ['Week 07', 'Test it and put it online', 'Evaluate outputs, examine security, and deploy the product to a public URL.'],
  ];
  return <InformationSection id="learning-outcomes" eyebrow="Inside the online core" title="One product. Six weeks of progress." copy="Each week adds a capability to the product you committed to in Sri Lanka. The result is a connected application you can explain and demonstrate.">
    <div className="program-card-grid program-card-grid-three">{weeks.map(([week,title,copy], i) => {
      const Icon = icons[i];
      return <article className="program-info-card" key={week}>
        <Icon className="builder-fit-icon" size={60} strokeWidth={1.8} stroke={`url(#outcome-gradient-${i})`} aria-hidden="true">
          <defs><linearGradient id={`outcome-gradient-${i}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={colors[i][0]}/><stop offset="1" stopColor={colors[i][1]}/></linearGradient></defs>
        </Icon>
        <span className="program-meta">{week}</span><h3>{title}</h3><p>{copy}</p>
      </article>;
    })}</div>
  </InformationSection>;
}

export function DemoExpectations() {
  const items = [
    ['The user and problem', 'Explain who needs this and what you are helping them do.'],
    ['The product you built', 'Show the scope you chose and how the application solves the problem.'],
    ['A working demonstration', 'Run the product with real inputs and make its behavior visible.'],
    ['Your technical decisions', 'Explain the interface, data, models, and connections behind the experience.'],
    ['Your use of AI', 'Describe where AI helped, what you checked, and what you changed yourself.'],
    ['What comes next', 'Identify the next improvements and what the product needs to reach more users.'],
  ];
  return <InformationSection id="demo-day" eyebrow="Demo Day" title="Show the product. Explain the decisions." copy="Qualifying builders take on a partner-company problem in a 36-hour Bengaluru hackathon, with mentors in the room. Use these six questions to shape your presentation to the judging panel.">
    <FUIBentoGridDark data={items.map(([title, description]) => ({ title, description }))} />
  </InformationSection>;
}

export function ProgramFAQ({ applyHref }: { applyHref: string }) {
  const questions = [
    ['Is AI Product Engineer online or in person?', 'Both. Week 1 is a launch residency in Sri Lanka from 13–17 December 2026. Weeks 2–7 run online, followed by a 36-hour offline hackathon and Demo Day at the Masai office in Bengaluru.'],
    ['Who is the program designed for?', 'Non-technical builders, founders, product managers, and creators who want to understand enough technology to build AI-powered applications.'],
    ['Will I keep building the same product?', 'Yes. You carry one continuous product build through the program, adding interfaces, data, AI capabilities, evaluation, and deployment.'],
    ['What should I expect to leave with?', 'The program is structured around a working, deployed product and the ability to explain how it works, how you used AI, and what you would improve next.'],
    ['What am I paying today?', 'The current application payment is ₹999. Selection and counselling come before the later seat-reservation and enrolment steps.'],
    ['When does the ₹5,000 seat payment happen?', 'After selection and counselling, when you reserve your place. It is adjusted against the full program fee. We are currently collecting only the ₹999 application fee.'],
    ['What is the total program fee?', 'The program fee is ₹1,75,000 + GST, paid in stages. The ₹5,000 seat reservation is adjusted against the full fee. The current payment is the ₹999 application fee.'],
    ['Is the Bengaluru hackathon open to everyone?', 'The Bengaluru hackathon and Demo Day are for qualifying builders. Discuss the qualification requirements with the team during counselling.'],
    ['What is included in the program fee?', 'Shared accommodation and scheduled meals in Sri Lanka and Bengaluru, practitioner and mentor sessions, learning resources, and the hackathon and Demo Day for qualifying builders. Travel, passport and visa costs, your laptop, and product-specific model, cloud, hosting, and API costs are separate.'],
    ['What should I clarify during counselling?', 'Discuss the online schedule, time commitment, total tuition, what is included, travel arrangements, and applicable payment and withdrawal terms before enrolling.'],
    ['Do I need to plan for international travel?', 'Yes. The launch residency is in Sri Lanka. Plan ahead for your passport, visa, and travel requirements.'],
  ];
  return <InformationSection id="faq" eyebrow="Questions before you apply" title="Know what you are signing up for." copy="The essentials about the build, the format, and the application process.">
    <div className="program-faq">{questions.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    <div className="admissions-actions"><a className="admissions-glass-cta admissions-glass-cta-primary" href={applyHref}>Apply Now</a></div>
  </InformationSection>;
}

export function Faculty() {
  const people = [
    ['Aditya Rane', 'Google', 'AI & ML Technical Solutions Consultant', 'https://cdn.masaischool.com/general/figma/2026/09/10/ape-faculty-aditya-rane-396w-1789038005435.webp'],
    ['Deepak Kasera', 'Microsoft', 'Senior Engineer, Cloud & AI', 'https://cdn.masaischool.com/general/figma/2026/09/10/ape-faculty-deepak-kasera-396w-1789038005438.webp'],
    ['Shubhendu Shishir', 'Simplismart', 'Head of Engineering', 'https://cdn.masaischool.com/general/figma/2026/09/10/ape-faculty-shubhendu-shishir-396w-1789038005439.webp'],
    ['Saksham Arora', 'Intuit', 'Backend Engineering Lead, Identity', 'https://cdn.masaischool.com/general/figma/2026/09/10/ape-faculty-saksham-arora-396w-1789038013235.webp'],
    ['Mohit Uniyal', 'PayPal', 'Senior ML Engineer', 'https://cdn.masaischool.com/general/image_9_1.webp-1789127022989-1789127023112.webp'],
    ['Amit Singh', 'Ericsson', 'Google Authorized Trainer', 'https://cdn.masaischool.com/general/figma/2026/09/10/ape-faculty-amit-singh-396w-1789038013237.webp'],
  ];
  return <InformationSection id="faculty" eyebrow="The faculty" title="Learn from people who build." copy="Practitioners working across AI, cloud, machine learning, and product engineering. With mentors on the floor during the Bengaluru build.">
    <div className="program-card-grid program-card-grid-three">{people.map(([name,company,role,image]) => <article className="program-info-card faculty-card" key={name}><img className="faculty-portrait" src={image} alt={name} width={396} height={396} loading="lazy" decoding="async"/><span className="program-meta">{company}</span><h3>{name}</h3><p>{role}</p></article>)}</div>
  </InformationSection>;
}

export function ProgramFees() {
  return <InformationSection id="fees" eyebrow="The program fee" title="One investment. Paid in stages." copy="Apply first. If selected, discuss the program with the team before reserving your seat and completing enrolment.">
    <div className="program-fee-total"><span className="program-meta">Full program fee</span><p>₹1,75,000 <span>+ GST</span></p><div className="program-payment-stages"><span className="foundry-glass-chip">₹999 application</span><span className="foundry-glass-chip">₹5,000 seat reservation</span><span className="foundry-glass-chip">Balance before you start</span></div></div>
    <div className="program-card-grid">
      <article className="program-info-card"><h3>Included in the fee</h3><ul className="program-inclusions"><li>Shared accommodation and scheduled meals in Sri Lanka and Bengaluru.</li><li>Practitioner and mentor sessions throughout the eight weeks.</li><li>Program templates, learning materials, and resources.</li><li>The Bengaluru hackathon and Demo Day for qualifying builders.</li></ul></article>
      <article className="program-info-card"><h3>Plan for separately</h3><ul className="program-inclusions"><li>Model and cloud credits, hosting, and APIs for your product.</li><li>Travel to Sri Lanka and Bengaluru, including local venue commutes.</li><li>Your laptop and working setup.</li><li>Passport and visa costs.</li></ul></article>
    </div>
    <p className="program-policy">Refunds follow the <a href="https://www.masaischool.com/leap-refund-policy" target="_blank" rel="noopener noreferrer">Refund & Withdrawal Policy</a>.</p>
  </InformationSection>;
}
