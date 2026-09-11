import React from 'react';
import {createRoot} from 'react-dom/client';
import Hero from '../Hero';
import { SiteFooter } from '../components/ui/site-footer';
import './style.css';
createRoot(document.getElementById('root')!).render(<><Hero applyHref="#application" seatHref="#application"/><section id="application" className="application-glow px-6 pt-20 pb-6 text-center text-[#E9EDFF]"><p className="text-xs uppercase tracking-widest text-[#8CA7FF]">Preview / Application destination</p><h2 className="mt-4 text-3xl font-semibold">Ready for your next build?</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#C5CCE3]">The application and seat reservation buttons lead here in this preview. Connect the actual application and payment destinations before launch. No payment is collected here.</p><div className="admissions-actions"><a className="admissions-glass-cta admissions-glass-cta-primary" href="#application">Apply Now</a></div></section><div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14"><SiteFooter /></div></>);
