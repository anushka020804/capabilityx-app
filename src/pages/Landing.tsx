import React, { useState } from 'react';

interface LandingProps {
  onGetStarted: () => void;
  onHowItWorks: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-lg w-[32px] h-[32px] bg-indigo-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9" />
                <circle cx="8" cy="8" r="2.5" fill="#4F46E5" />
              </svg>
            </div>
            <span className="font-bold tracking-[0.08em] text-[13px] text-gray-900">
              CAPABILITYX
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['How it works', 'For Buyers', 'For FIs'].map((item) => (
              <button key={item} className="text-[13px] font-medium transition-colors text-gray-500 hover:text-gray-900">
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-[13px] font-medium px-4 py-2 rounded-lg transition-colors text-gray-500 hover:text-gray-900">
              Sign in
            </button>
            <button
              onClick={onGetStarted}
              className="text-[13px] font-semibold px-5 py-2 rounded-lg transition-all bg-gray-900 text-white hover:bg-black shadow-sm"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="pt-32 pb-4 relative overflow-hidden bg-white border-b border-gray-200">
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-indigo-50/30 to-white pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-8">
          {/* Text block — centred */}
          <div className="text-center max-w-3xl mx-auto pt-8 pb-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] px-4 py-2 rounded-full mb-8 bg-indigo-50 text-indigo-600 border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              SUPPLIER CAPABILITY INTELLIGENCE
            </div>
            <h1 className="text-[3.25rem] font-extrabold leading-[1.1] mb-6 text-gray-900 tracking-tight">
              Know which suppliers<br />can actually deliver.
            </h1>
            <p className="text-lg leading-relaxed mb-10 text-gray-500 max-w-xl mx-auto">
              Turn your RFQs into a data-backed shortlist of capable suppliers — with every match, gap and score explained.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start with an RFQ
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                See how it works
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section className="pt-12 pb-24 px-8 bg-gray-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-3 text-gray-900 tracking-tight">
              Stop searching. Start matching.
            </h2>
            <p className="text-base text-gray-500">
              CapabilityX connects your RFQs to a live supplier capability graph.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'DISCOVER',
                title: 'Find capable suppliers beyond your existing network.',
                desc: 'Go beyond contacts lists. Discover verified suppliers matched to your exact technical requirements.',
                icon: (active: boolean) => (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" fill={active ? '#4F46E5' : '#6366F1'} fillOpacity="0.2"/>
                    <circle cx="12" cy="12" r="1.5" fill={active ? '#4F46E5' : '#6366F1'}/>
                  </svg>
                ),
              },
              {
                label: 'VERIFY',
                title: 'Go beyond self-reported capability.',
                desc: 'Evidence-based supplier intelligence from tender history, orders, and certifications.',
                icon: (active: boolean) => (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Z" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5"/>
                    <path d="M9 12l2 2 4-4" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: 'MATCH',
                title: 'Match every requirement to real capabilities.',
                desc: 'Each RFQ criterion scored against hard data — not catalogues, not brochures.',
                icon: (active: boolean) => (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="2" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5"/>
                    <rect x="13" y="13" width="8" height="8" rx="2" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5"/>
                    <path d="M11 7h6v6" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 17H7v-6" stroke={active ? '#4F46E5' : '#6366F1'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((card, i) => {
              const active = hoveredCard === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-8 border cursor-default transition-all duration-300 flex flex-col bg-white ${
                    active
                      ? 'border-indigo-600 shadow-xl shadow-indigo-600/10 -translate-y-1'
                      : 'border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    active ? 'bg-indigo-100' : 'bg-indigo-50 border border-indigo-100/50'
                  }`}>
                    {card.icon(active)}
                  </div>
                  <div className={`text-[11px] font-bold tracking-[0.14em] mb-3 transition-colors ${active ? 'text-indigo-600' : 'text-indigo-500'}`}>
                    {card.label}
                  </div>
                  <h3 className={`text-[17px] font-bold mb-3 leading-snug ${active ? 'text-indigo-900' : 'text-gray-900'}`}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 flex-1">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-24 px-8 bg-gray-900 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">
              How CapabilityX works
            </h2>
            <p className="text-base text-gray-400">
              From RFQ to verified shortlist in minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { step: '01', title: 'Upload your RFQ', desc: 'PDF, DOCX, or XLSX — any format.' },
              { step: '02', title: 'AI extracts requirements', desc: 'Mandatory and scored criteria identified automatically.' },
              { step: '03', title: 'Match to capabilities', desc: 'Real data from the Capability Graph — not self-reported claims.' },
              { step: '04', title: 'Explainable shortlist', desc: 'Every match, gap, and score is justified.' },
            ].map((s, i) => (
              <div key={i} className="relative p-6 group">
                <div className="text-5xl font-black mb-4 tracking-[-0.04em] text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors">
                  {s.step}
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 -right-2 text-indigo-500/30">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SAMPLE SUPPLIER ═══════════════ */}
      <section className="py-24 px-8 bg-white border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="max-w-lg">
              <div className="text-[11px] font-bold tracking-[0.14em] mb-4 text-indigo-600">
                EXPLAINABLE AI
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight leading-snug">
                Every match has<br />a reason.
              </h2>
              <p className="text-base leading-relaxed mb-8 text-gray-500">
                CapabilityX doesn't just rank suppliers — it shows you exactly why each supplier qualified, partially qualified, or didn't make the cut.
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
              >
                See supplier intelligence in action
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div>
              <SampleSupplierCard />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER CTA ═══════════════════ */}
      <section className="py-24 px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">
            Ready to find suppliers who can deliver?
          </h2>
          <p className="text-base mb-10 text-gray-500">
            Upload your first RFQ and get matched in minutes.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-900/10 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get started — it's free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────── Sample Card ─────────────────────── */
function SampleSupplierCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-base text-gray-900">Apex Engineering</h3>
          <div className="text-xs mt-0.5 text-gray-500">Automotive Components</div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-gray-900 tracking-tight">92%</div>
          <div className="text-[10px] font-bold tracking-[0.08em] mt-1 text-emerald-600">
            FULL MATCH
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-5 space-y-3">
        {[
          'CNC Machining',
          'ISO 9001 Certified',
          'OEM Experience',
          'Capacity 12,000/mo',
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
