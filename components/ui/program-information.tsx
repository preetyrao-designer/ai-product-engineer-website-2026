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
  return <InformationSection id="demo-day" eyebrow="The 36-Hour Hackathon" title={<>Your final test is<br />a real company's problem.</>} copy="After seven weeks of building, the qualifying participants arrive in Bangalore. A partner company brings a real problem, and your team has 36 hours to build a working solution and demo it to them.">
    <HourFilmstrip />
  </InformationSection>;
}

const FAQ_CATEGORIES = ['Program', 'Eligibility & Application', 'Bangalore & Outcomes', 'Travel & Residency', 'Fees & Payment'] as const;

export function ProgramFAQ() {
  const questions: [string, string, typeof FAQ_CATEGORIES[number]][] = [
    ['Is AI Residency online or in person?', 'Both. It opens with five days in Sri Lanka, runs online for six weeks, and finishes with a weekend hackathon in Bangalore.', 'Program'],
    ['How much time does it take each week?', 'Two live sessions of two hours and a 1.5-hour lab, plus the building you do between sessions.', 'Program'],
    ['What do I build?', 'One capstone, carried through the whole program. Pick a problem from a pool of real business problems faced by companies in India and Sri Lanka, grouped by function, or bring your own if it meets the capstone benchmark.', 'Program'],
    ['Is attendance mandatory?', 'You need 65% attendance to qualify for Bangalore and the credential. Recorded viewing counts in full.', 'Program'],
    ['How is the program evaluated?', 'Two scored evaluations: week 4 carries 45% and week 7 carries 55%.', 'Program'],
    ['Do I need to know how to code?', 'No. The program starts from how software and the web work, then teaches you to build with AI tools while understanding what they produce.', 'Eligibility & Application'],
    ['Who is this for?', 'Working professionals, consultants and business owners who already use AI and want to get far more out of it, by understanding and building what sits underneath.', 'Eligibility & Application'],
    ['How are applications reviewed?', 'We look at intent, ambition and whether this is the right environment for what you want to build. Applications are reviewed on a rolling basis.', 'Eligibility & Application'],
    ['What happens in Bangalore?', 'A three-day weekend at the Masai office. A partner company presents a real problem on Friday evening, teams of three or four form, and you have a 36-hour hackathon to build a working solution and demo it to the company on Sunday.', 'Bangalore & Outcomes'],
    ['Does everyone go to Bangalore?', 'Everyone who clears the bar: 45% across the two evaluations and 65% attendance. There is no cap and no separate application.', 'Bangalore & Outcomes'],
    ['Does this get me a job?', "No program can promise that, and we don't. Partner companies set the brief and judge the demos, with no hiring commitment attached.", 'Bangalore & Outcomes'],
    ['What do I leave with?', 'A production-grade AI product deployed on the internet that you can explain end to end, and the credential if you clear the bar.', 'Bangalore & Outcomes'],
    ['What is covered in Sri Lanka and Bangalore?', 'Shared rooms and all scheduled meals in both places, and everything on the program schedule.', 'Travel & Residency'],
    ['What do I plan for myself?', 'Flights to Sri Lanka and Bangalore, local commute, passport and visa costs, your laptop, and the credits and hosting for your product during the online weeks.', 'Travel & Residency'],
    ['Do I need a visa?', 'The residency involves international travel, so plan for a passport and visa. Guidance is part of onboarding once your seat is confirmed.', 'Travel & Residency'],
    ['What is the total fee?', '₹1,75,000 + GST, paid in stages: ₹999 with the application, ₹5,000 to hold your seat after counselling, and the balance before the program starts.', 'Fees & Payment'],
    ['When do I pay the large amount?', 'Only after you are selected and have spoken to the team. Counselling always comes before any large payment.', 'Fees & Payment'],
    ['Is the seat fee adjusted?', 'Yes. The ₹5,000 is adjusted against your full program fee. Refunds follow the Refund & Withdrawal Policy.', 'Fees & Payment'],
  ];
  const [category, setCategory] = useState<typeof FAQ_CATEGORIES[number]>('Program');
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
      <article className="program-info-card"><h3>Included</h3><ul className="program-inclusions"><li>Sri Lanka and Bangalore stay: shared rooms and all scheduled meals.</li><li>All practitioner and mentor sessions across the eight weeks.</li><li>Templates, resources and learning materials.</li><li>Model credits during the Bangalore hackathon, for qualifying builders.</li></ul></article>
      <article className="program-info-card"><h3>Not included</h3><ul className="program-inclusions"><li>Travel to Sri Lanka and Bangalore, and commute to the venue.</li><li>Passport and visa costs.</li><li>Model and cloud credits, hosting and APIs during the online phase.</li><li>Laptop and working setup.</li></ul></article>
    </div>
    <p className="program-policy">The ₹5,000 seat reservation is adjusted against your full program fee. Refunds follow the <a href="https://www.masaischool.com/leap-refund-policy" target="_blank" rel="noopener noreferrer">Refund & Withdrawal Policy</a>.</p>
  </InformationSection>;
}
