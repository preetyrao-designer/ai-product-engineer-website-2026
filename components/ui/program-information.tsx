import { useState, type ReactNode } from 'react';
import FacultyCarousel from './specials-linear-carousel';
import BuilderFitGrid from './builder-fit-grid';
import HourFilmstrip from './hour-filmstrip';
import './program-information.css';

function InformationSection({ id, eyebrow, title, copy, children }: { id: string; eyebrow: ReactNode; title: ReactNode; copy: string; children?: ReactNode }) {
  return <section id={id} className="program-information" aria-labelledby={`${id}-title`}>
    <header className="section-intro"><p className="admissions-eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2>{copy && <p className="admissions-intro-copy">{copy}</p>}</header>{children}
  </section>;
}

export function BuilderFit() {
  const items = [
    ['You own a function in your org.', 'Build a product solving a real problem for your function. Understand how AI can extend the capability of your team.'],
    ['You are an individual contributor.', 'Build a product solving a real problem for your personal workflows or team. Understand how roles are changing across product, marketing, design and operations.'],
    ["You're a consultant.", 'Build a product solving a real problem for your personal workflow or a customer. Understand how AI is reshaping processes across domains, and where it drives the highest efficiency gains.'],
    ["You're a business owner.", 'Build a product solving a real bottleneck in your business. Map and develop a clear understanding of how to drive AI adoption to solve growth challenges in your business.'],
  ];
  return <InformationSection id="who-its-for" eyebrow="Is this you?" title="AI Residency is for you, if" copy="You don't work in tech. But people who understand how AI tools and agents work under the hood can put AI to work far better than everyone else.">
    <BuilderFitGrid items={items} />
  </InformationSection>;
}

export function DemoExpectations() {
  return <section id="demo-day" className="program-information" aria-labelledby="demo-day-title">
    <HourFilmstrip
      headingId="demo-day-title"
      eyebrow="The 36-Hour Hackathon"
      title={<>Your final test is<br />a real company's problem.</>}
      copy="After seven weeks of building, the qualifying participants arrive in Bangalore. A partner company brings a real problem, and your team has 36 hours to build a working solution and demo it to them."
    />
  </section>;
}

const FAQ_CATEGORIES = ['Program Overview', 'Residential Experience', 'Learning Experience', 'Travel & Readiness', 'Travel', 'Health & Safety', 'Learning', 'Residential Phase'] as const;

export function ProgramFAQ() {
  const questions: [string, string, typeof FAQ_CATEGORIES[number]][] = [
    ['What exactly is the AI Residency program?', 'AI Residency is a hands-on program focused on building with AI, and going a layer under the hood. It is designed to equip you with a deeper understanding of how tech products and AI agents work, and to help you leverage AI more effectively.', 'Program Overview'],
    ['Is the program online or offline?', 'It is a hybrid program. It starts with a five-day residential experience in Sri Lanka, followed by an online phase, and concludes with a 3-day residential phase in Bangalore for qualifying participants.', 'Program Overview'],
    ['Is this a coding course?', 'Not in the traditional sense. You are not spending eight weeks memorising syntax. You will learn enough software, AI, data, agents, deployment and security to understand building products and agents in AI-native environments.', 'Program Overview'],
    ['Do I need to know how to code before joining?', 'No prior programming expertise is required. You should, however, be comfortable using technology and willing to get hands-on. By the end, the expectation is not “I can prompt AI,” but “I understand roughly what the code is doing and I understand how to use AI to solve a business problem deeply.”', 'Program Overview'],
    ['Is this suitable for non-technical professionals?', 'Yes. The program is specifically built to help people become more technically capable in an AI-first world. You do not need to become a traditional software engineer, but you should expect to work more closely on technical solutions and products.', 'Program Overview'],
    ['I already know some coding. Will the program still be useful?', 'Yes. The emphasis is broader than coding: AI-assisted development, model choice, agents, RAG, system design, integrations, evaluation, security and shipping a usable product.', 'Program Overview'],
    ['Does the program guarantee a job?', 'No. The program builds technical capability, product-building experience and real-world exposure that can strengthen your broader career readiness.', 'Program Overview'],
    ['Is this only useful if I want to become an AI Product Engineer?', 'No. The skills are broader than one job title. Understanding AI systems, software, agents, data, deployment and product building can be useful across technology, product, entrepreneurship and other AI-enabled roles.', 'Program Overview'],
    ['What happens during the Sri Lanka residential phase?', 'Five days of workshops, building, technical sessions, cohort activities and networking. You begin by understanding what can now be built with AI, and leave with the problem and build direction you will carry into the following weeks.', 'Program Overview'],
    ['Does everyone join the Bangalore phase of the program?', 'No. Participation in the Bangalore leg of the program is subject to a minimum qualification criteria. All participants who meet the criteria are eligible for the Bangalore phase.', 'Program Overview'],
    ['Who should apply?', "People who want to move beyond using AI tools and start building with them. It is especially relevant if you have ideas you cannot currently build, use AI-generated code without fully understanding it, or have built prototypes that haven't yet run in production.", 'Residential Experience'],
    ['Will Masai build my product for me?', 'No. AI may be your copilot, mentors may help unblock you, but the keyboard still belongs to you. The program gives you structure, instruction, feedback and support; you are responsible for the actual build.', 'Residential Experience'],
    ['What kind of AI tools will we use?', 'The curriculum covers modern AI development workflows and tools such as AI coding agents, model platforms, automation tools and AI infrastructure. Specific tools may evolve as the ecosystem changes — the capability matters more than memorising one tool.', 'Residential Experience'],
    ['Will I learn agents or just prompting?', 'Agents are a significant part of the program. You progress from controlling model outputs to building agents, multi-agent workflows, automation and systems that interact with real data and external services.', 'Residential Experience'],
    ['Will I learn RAG and vector databases?', 'Yes. You will learn how AI applications can answer using your own data through retrieval, embeddings and vector databases, rather than relying only on what the underlying model already knows.', 'Residential Experience'],
    ['Will deployment be covered?', 'Yes. You will move from local development to a publicly accessible deployment, including hosting, environment variables, secrets, logs and common production issues.', 'Residential Experience'],
    ['What will I learn during the online phase?', 'You move from software and model fundamentals into prompting and structured AI development, product design, AI coding agents, agentic systems, RAG and vector databases, MCP and external integrations, evaluation, AI security and deployment.', 'Learning Experience'],
    ['Will I actually build a working product?', 'Yes. The program is built around shipping, not just understanding concepts. By the end of the learning phase, you are expected to have a product deployed to the internet that you can explain technically.', 'Learning Experience'],
    ['Do I need a technical degree?', 'No technical degree is a pre-requisite. Selection is based more on fit, intent, willingness to build and your ability to commit to the program.', 'Travel & Readiness'],
    ['I have never built an app before. Can I still join?', 'Yes. That is a perfectly reasonable starting point. What matters is that you are willing to learn how software works instead of expecting AI to remain a mysterious button that produces code.', 'Travel & Readiness'],
    ['Do I need my own laptop?', 'Yes. This is a build-heavy program, so you need your own reliable laptop and working setup.', 'Travel & Readiness'],
    ['Are airport transfers included during the residential phases?', 'No. Travel to and from the residential venues in Sri Lanka and Bangalore, including airport transfers, is not included in the program fee. You get yourself to the venue; we take it from there.', 'Travel'],
    ['Who arranges my passport and visa?', 'You do. A valid passport, supporting documents and compliance with immigration requirements are entirely your responsibility.', 'Travel'],
    ['Will Masai help me apply for my visa?', 'No. Indian passport holders are currently eligible for a free 30-day tourist ETA for Sri Lanka, subject to prevailing immigration rules. Masai does not provide visa consultancy, application support or visa guidance. Participants should complete the applicable travel authorisation themselves and check the latest requirements and travel advisories through official Sri Lankan Immigration and Indian Government sources before travelling.', 'Travel'],
    ['Is accommodation included during the official residential dates?', 'Yes, during the officially communicated residential dates. Additional nights before or after the program dates are not included.', 'Travel'],
    ['Can I request a private room?', 'No, standard accommodation is on a double or triple shared basis.', 'Travel'],
    ['Can family or friends join me?', 'They may travel independently, but companions are not included in program accommodation, activities, transport or other arrangements.', 'Travel'],
    ['Will local transport be provided?', 'Transport will be arranged for scheduled program activities mentioned in the official itinerary. Personal travel outside the itinerary is not included.', 'Travel'],
    ['Do I need to submit medical information before travelling?', 'Yes. A Medical Fitness Certificate issued by a registered medical practitioner is mandatory before the residential phase. It helps confirm that you are fit to participate and ensures any relevant medical needs are disclosed in advance. Any medical consultation, treatment, medication, hospitalisation or related expenses incurred during the residential phase will be borne by the participant and not covered in the program fees.', 'Health & Safety'],
    ['Do I need travel or medical insurance?', 'Yes. You must arrange suitable travel and medical insurance before travelling, which is not covered in the program fee.', 'Health & Safety'],
    ['What food options will be available during the residential phase?', 'Meals will follow a pre-defined menu, with vegetarian and non-vegetarian options available. Any special meal requirements outside the standard menu will need to be arranged and managed by the participant at their own expense.', 'Health & Safety'],
    ['Do I need my own laptop?', 'Yes. Bring a personal laptop capable of running the required development environments and program tools. Your machine is part of your toolkit.', 'Learning'],
    ['Are paid AI tools, cloud credits or subscriptions included?', 'No. Any paid AI tools, APIs, cloud credits or software subscriptions required for your build must be arranged and paid for by you.', 'Learning'],
    ['Does everyone attend the final residential phase in Bangalore?', 'The final residential phase in Bangalore is for learners who meet the required progression criteria during the online phase: a minimum overall score of 45% across all evaluations and at least 65% attendance, including both live and recorded learning components.', 'Residential Phase'],
    ['Will I get time to explore during the residential phase?', 'The official schedule will be structured and intensive. Any free time outside it is yours to use independently and at your own expense.', 'Residential Phase'],
  ];
  const [category, setCategory] = useState<typeof FAQ_CATEGORIES[number]>('Program Overview');
  const filtered = questions.filter(([, , cat]) => cat === category);
  return <InformationSection id="faq" eyebrow="FAQ" title="Questions worth answering before you apply." copy="">
    <div className="program-faq-tabs" role="tablist" aria-label="FAQ categories">
      {FAQ_CATEGORIES.map(cat => <button key={cat} type="button" role="tab" aria-selected={category === cat} onClick={() => setCategory(cat)} className={category === cat ? 'program-faq-tab-active' : ''}>{cat}</button>)}
    </div>
    <div className="program-faq">{filtered.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
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
  return <InformationSection id="faculty" eyebrow="The faculty" title="Learn from people building with AI every day." copy="Practitioners working across AI, cloud, machine learning and product engineering, with mentors on the floor during the Bangalore hackathon.">
    <FacultyCarousel people={people.map(([name, company, role, image]) => ({ name, company, role, image }))} />
  </InformationSection>;
}

export function ProgramFees() {
  return <InformationSection id="fees" eyebrow="The fee" title="What you put in." copy="One fee, paid in stages. You pay nothing beyond ₹999 unless you are selected.">
    <div className="program-fee-total"><span className="program-meta">Full program fee</span><p>₹1,75,000 <span>+ GST</span></p><div className="program-payment-stages"><span className="foundry-glass-chip">₹999 application</span><span className="foundry-glass-chip">₹5,000 seat reservation</span><span className="foundry-glass-chip">Balance before you start</span></div></div>
    <div className="program-card-grid">
      <article className="program-info-card"><h3>Included</h3><ul className="program-inclusions"><li>Sri Lanka and Bangalore stay: shared rooms and all scheduled meals.</li><li>All practitioner and mentor sessions across the eight weeks.</li><li>Templates, resources and learning materials.</li></ul></article>
      <article className="program-info-card"><h3>Not included</h3><ul className="program-inclusions"><li>Travel to Sri Lanka and Bangalore, and commute to the venue.</li><li>Passport and visa costs.</li><li>Model and cloud credits, hosting and APIs during the online phase.</li><li>Laptop and working setup.</li></ul></article>
    </div>
    <p className="program-policy">The ₹5,000 seat reservation is adjusted against your full program fee. Refunds follow the <a href="https://www.masaischool.com/leap-refund-policy" target="_blank" rel="noopener noreferrer">Refund & Withdrawal Policy</a>.</p>
  </InformationSection>;
}
