import React from 'react';
import {createRoot} from 'react-dom/client';
import Hero from '../Hero';
import { SiteFooter } from '../components/ui/site-footer';
import './style.css';
createRoot(document.getElementById('root')!).render(<><Hero applyHref="#application" seatHref="#application"/><section id="application" className="application-glow px-6 pt-20 pb-6 text-center text-[#E9EDFF]"><p className="inline-flex items-center gap-2 rounded-full border border-[#8CA7FF]/30 bg-[#8CA7FF]/10 px-4 py-2 text-xs text-[#B7C8FF]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#8CA7FF]" />Applications are now open</p><h2 className="mt-4 text-3xl font-semibold">Ready for your next build?</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#C5CCE3]">Build the skills, confidence, and working product to take it forward.</p><div className="admissions-actions"><a className="admissions-glass-cta admissions-glass-cta-primary" href="#application">Apply for ₹999</a></div></section><div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14"><SiteFooter /></div></>);
