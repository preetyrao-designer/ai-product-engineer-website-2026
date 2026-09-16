import { useState } from 'react';
import './trusted-by.css';

const COMPANIES: [string, string][] = [
  ['Google', '/images/logos/google-com.png'],
  ['Microsoft', '/images/logos/microsoft-com.png'],
  ['PayPal', '/images/logos/paypal-com.png'],
  ['Intuit', '/images/logos/intuit-com.png'],
  ['Thomson Reuters', '/images/logos/thomsonreuters-com.png'],
  ['Aditya Birla Group', '/images/logos/adityabirla-com.png'],
  ['PromptQL', '/images/logos/promptql-io.png'],
  ['LuminAI', '/images/logos/luminai-com.png'],
];

function CompanyIcon({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return <span className="trusted-by-icon" aria-hidden="true">
    {failed ? name.slice(0, 2) : <img src={logo} alt="" loading="lazy" onError={() => setFailed(true)} />}
  </span>;
}

export default function TrustedBy() {
  const track = [...COMPANIES, ...COMPANIES];
  return <section className="trusted-by" aria-label="Companies our faculty work at">
    <p className="trusted-by-copy">Taught by engineering leaders from companies building with AI</p>
    <div className="trusted-by-track-wrap">
      <div className="trusted-by-track">
        {track.map(([name, logo], i) => <span className="trusted-by-pill" key={`${name}-${i}`}>
          <CompanyIcon name={name} logo={logo} />
          {name}
        </span>)}
      </div>
    </div>
  </section>;
}
