import { Facebook, Instagram, Linkedin, X, Youtube } from 'lucide-react';
import './site-footer.css';

const LOGO = '/images/leap-logo.svg';

const SOCIALS = [
  { label: 'X', Icon: X, href: 'https://x.com/masaischool' },
  { label: 'Facebook', Icon: Facebook, href: 'https://facebook.com/masaischool' },
  { label: 'LinkedIn', Icon: Linkedin, href: 'https://linkedin.com/company/masai-school' },
  { label: 'Instagram', Icon: Instagram, href: 'https://instagram.com/masaischool' },
  { label: 'YouTube', Icon: Youtube, href: 'https://youtube.com/@masaischool' },
];

const COLUMNS = [
  { title: 'Program', links: [['The journey', '#curriculum'], ['Demo Day', '#demo-day']] },
  { title: 'Admissions', links: [['How to apply', '#admissions'], ['FAQ', '#faq']] },
  { title: 'Masai', links: [['About Us', 'https://www.masaischool.com/about-us'], ['Teams', 'https://www.masaischool.com/team'], ['Newsroom', 'https://www.masaischool.com/newsroom'], ['Careers', 'https://www.masaischool.com/careers'], ['Contact', 'https://www.masaischool.com/contact-us']] },
];

const LEGAL = [
  ['Privacy Policy', 'https://www.masaischool.com/privacy-policy'],
  ['Terms & Conditions', 'https://www.masaischool.com/terms-and-conditions'],
  ['Student & Academic Policies', 'https://www.masaischool.com/student-academic-policies'],
];

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-top">
      <div className="site-footer-brand">
        <img className="site-footer-logo" src={LOGO} alt="LEAP by Masai" loading="lazy" decoding="async" width={87} height={38} />
        <p className="site-footer-tagline">AI Residency, by Masai School.</p>
        <div className="site-footer-follow">
          <span>Follow us</span>
          <div className="site-footer-social">
            {SOCIALS.map(({ label, Icon, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={16} strokeWidth={1.8} /></a>)}
          </div>
        </div>
      </div>
      <div className="site-footer-columns">
        {COLUMNS.map(column => <div className="site-footer-column" key={column.title}>
          <p>{column.title}</p>
          <ul>{column.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
        </div>)}
      </div>
    </div>
    <div className="site-footer-bottom">
      <p>© {new Date().getFullYear()} Masai School. AI Residency program.</p>
      <div className="site-footer-legal">{LEGAL.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
    </div>
  </footer>;
}
