import React from 'react';
import {createRoot} from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../Hero';
import { SiteFooter } from '../components/ui/site-footer';
import './style.css';
createRoot(document.getElementById('root')!).render(<><Hero applyHref="#application" seatHref="#application"/><section id="application" className="application-glow px-6 pt-40 pb-6 text-center text-[#E9EDFF]"><p className="admissions-eyebrow">Application window open</p><h2 className="mt-4 text-3xl font-semibold">Can you build it, and explain how it works?</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#C5CCE3]">Eight weeks. One product, live on the internet, built by you.</p><div className="admissions-actions"><a className="admissions-glass-cta admissions-glass-cta-primary" href="#application">Apply Now <ArrowUpRight size={18} aria-hidden="true"/></a></div><p className="mt-4 text-xs text-[#929DBF]"><strong className="text-[#C5CCE3]">Starts 6th Jan 2027.</strong> Every application is reviewed personally.</p></section><div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14"><SiteFooter /></div></>);
