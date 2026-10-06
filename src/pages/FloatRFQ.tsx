import React, { useRef, useState } from 'react';

interface FloatRFQProps {
  onAnalyze: () => void;
}

interface RFQData {
  title: string;
  id: string;
  source: 'sample' | 'upload' | 'generated';
  fields: { label: string; value: string }[];
}

const SAMPLE: RFQData = {
  title: 'Automotive Bracket Assembly',
  id: 'RFQ-1042',
  source: 'sample',
  fields: [
    { label: 'Customer', value: 'ABC Automotive Pvt Ltd' },
    { label: 'Quantity', value: '10,000 units / month' },
    { label: 'Delivery', value: '≤ 30 days' },
    { label: 'Material', value: 'Steel / Aluminium' },
  ],
};

type GenStep = 'form' | 'generating' | 'preview';

const GEN_STAGES = [
  'Understanding your requirements…',
  'Inferring technical specifications…',
  'Adding quality & compliance clauses…',
  'Drafting commercial terms…',
];

export default function FloatRFQ({ onAnalyze }: FloatRFQProps) {
  const [rfq, setRfq] = useState<RFQData | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Generate modal state
  const [genOpen, setGenOpen] = useState(false);
  const [genStep, setGenStep] = useState<GenStep>('form');
  const [stageIdx, setStageIdx] = useState(0);
  const [form, setForm] = useState({
    part: '',
    company: '',
    quantity: '',
    material: 'Steel',
    process: 'CNC Machining',
    delivery: '30',
    location: '',
    notes: '',
  });

  const loadFile = (file?: File) => {
    if (!file) return;
    setRfq({
      title: file.name.replace(/\.[^.]+$/, ''),
      id: 'RFQ-' + Math.floor(1000 + Math.random() * 9000),
      source: 'upload',
      fields: [
        { label: 'File', value: file.name },
        { label: 'Size', value: `${(file.size / 1024).toFixed(1)} KB` },
        { label: 'Status', value: 'Ready for analysis' },
        { label: 'Type', value: file.name.split('.').pop()?.toUpperCase() || '—' },
      ],
    });
  };

  const openGenerate = () => {
    setGenStep('form');
    setStageIdx(0);
    setGenOpen(true);
  };

  const runGenerate = () => {
    setGenStep('generating');
    setStageIdx(0);
    GEN_STAGES.forEach((_, i) => setTimeout(() => setStageIdx(i), i * 600));
    setTimeout(() => setGenStep('preview'), GEN_STAGES.length * 600 + 300);
  };

  const canGenerate = form.part.trim() && form.quantity.trim();

  const draft = {
    title: form.part || 'Custom Component',
    id: 'RFQ-' + (2000 + form.part.length * 37),
    sections: [
      {
        h: 'Scope of Supply',
        body: `Supply of ${form.part || 'components'} manufactured via ${form.process} in ${form.material}, at a volume of ${form.quantity || '—'} units per month${form.company ? ` for ${form.company}` : ''}.`,
      },
      {
        h: 'Technical Requirements',
        body: `Material: ${form.material} (grade per IS/ASTM standard). Process: ${form.process}. General tolerance ±0.05 mm unless specified. Surface finish and coating as per drawing. ${form.notes}`,
      },
      {
        h: 'Quality & Compliance',
        body: 'Supplier must hold ISO 9001:2015 certification (IATF 16949 preferred). PPAP Level 3 submission, first-article inspection report and material test certificates required.',
      },
      {
        h: 'Commercial Terms',
        body: `Delivery lead time ≤ ${form.delivery} days from PO.${form.location ? ` Delivery to ${form.location}.` : ''} Payment terms: 60 days from invoice. Quote validity: 90 days. Prices to be quoted ex-works with packaging included.`,
      },
    ],
  };

  const useDraft = () => {
    setRfq({
      title: draft.title,
      id: draft.id,
      source: 'generated',
      fields: [
        { label: 'Customer', value: form.company || '—' },
        { label: 'Quantity', value: `${form.quantity} units / month` },
        { label: 'Delivery', value: `≤ ${form.delivery} days` },
        { label: 'Material', value: `${form.material} · ${form.process}` },
      ],
    });
    setGenOpen(false);
  };

  const input =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition';
  const label = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <>
      <div className="p-8 animate-fade-in w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight">
        Find suppliers who can actually deliver.
      </h1>
      <p className="text-sm mb-8 text-gray-500">
        Upload your RFQ and CapabilityX will extract requirements and match capable suppliers.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        className="hidden"
        onChange={e => loadFile(e.target.files?.[0])}
      />

      {/* Upload zone */}
      <div
        className={`rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all duration-200 mb-4 ${
          dragging ? 'border-indigo-400 bg-indigo-50/50' : 'border-gray-300 bg-white'
        }`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          f ? loadFile(f) : setRfq(SAMPLE);
        }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-indigo-50">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 20V10M14 10l-4 4M14 10l4 4" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 20.5C3.3 19.5 2 17.6 2 15.5c0-3.3 2.7-6 6-6 .5 0 1 .1 1.5.2C10.4 7.3 12.6 6 15 6c3.3 0 6 2.7 6 6 0 .2 0 .4-.1.6C22.7 13.1 24 14.7 24 16.5c0 2.2-1.8 4-4 4H8" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="font-semibold mb-1 text-gray-900 tracking-wider text-sm">DROP YOUR RFQ HERE</div>
        <div className="text-sm mb-4 text-gray-400">PDF, DOCX or XLSX</div>
        <button
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-900 hover:border-gray-400 transition-all"
        >
          Browse files
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs font-medium text-gray-400">or try a demo</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {!rfq ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setRfq(SAMPLE)}
            className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-all duration-200 hover:border-indigo-400 hover:shadow-sm group flex flex-col h-full"
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 3h8l4 4v11a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1Z" stroke="#4F46E5" strokeWidth="1.5" />
                  <path d="M12 3v4h4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-indigo-600 transition-transform group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="font-semibold text-sm text-gray-900 mb-1">Use Sample RFQ</div>
            <div className="text-xs text-gray-500">Automotive Bracket Assembly — ABC Automotive Pvt Ltd</div>
          </button>

          <button
            onClick={openGenerate}
            className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-all duration-200 hover:border-purple-400 hover:shadow-sm group flex flex-col h-full"
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-purple-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
                  <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
                </svg>
              </div>
              <div className="text-purple-600 transition-transform group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="font-semibold text-sm text-gray-900 mb-1 flex items-center gap-2">
              Generate RFQ Template
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-purple-100 text-purple-700 uppercase">AI</span>
            </div>
            <div className="text-xs text-gray-500">Draft a new comprehensive RFQ using AI from basic requirements</div>
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-indigo-400 bg-white p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-100">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-emerald-600 tracking-wider">
                {rfq.source === 'generated' ? 'RFQ GENERATED' : 'RFQ LOADED'}
              </span>
            </div>
            <button onClick={() => setRfq(null)} className="text-xs font-medium text-gray-400 hover:text-gray-700">
              Change
            </button>
          </div>
          <h3 className="font-bold text-base mb-1 text-gray-900">{rfq.title}</h3>
          <div className="text-xs font-mono mb-4 text-gray-400">{rfq.id}</div>
          <div className="grid grid-cols-2 gap-4">
            {rfq.fields.map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs mb-0.5 text-gray-500">{label}</div>
                <div className="text-sm font-medium text-gray-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {rfq && (
        <button
          onClick={onAnalyze}
          className="mt-6 w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all bg-gray-900 hover:bg-black text-white"
        >
          Analyze RFQ
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      </div>

      {/* Generate RFQ modal */}
      {genOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
          onClick={() => genStep !== 'generating' && setGenOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Generate RFQ Template</div>
                  <div className="text-xs text-gray-500">
                    {genStep === 'form' && 'Tell us the basics — AI drafts the rest'}
                    {genStep === 'generating' && 'Drafting your RFQ…'}
                    {genStep === 'preview' && 'Review your AI-drafted RFQ'}
                  </div>
                </div>
              </div>
              {genStep !== 'generating' && (
                <button onClick={() => setGenOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
              )}
            </div>

            {genStep === 'form' && (
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={label}><span className="text-red-500">*</span> Part / Product name</label>
                    <input className={input} placeholder="e.g. Aluminium Housing Cover" value={form.part} onChange={e => setForm({ ...form, part: e.target.value })} />
                  </div>
                  <div>
                    <label className={label}>Company</label>
                    <input className={input} placeholder="Your company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <label className={label}><span className="text-red-500">*</span> Monthly quantity</label>
                    <input className={input} placeholder="e.g. 5,000" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                  </div>
                  <div>
                    <label className={label}>Material</label>
                    <select className={input} value={form.material} onChange={e => setForm({ ...form, material: e.target.value })}>
                      {['Steel', 'Stainless Steel', 'Aluminium', 'Brass', 'Plastic (ABS/PP)', 'Cast Iron'].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Manufacturing process</label>
                    <select className={input} value={form.process} onChange={e => setForm({ ...form, process: e.target.value })}>
                      {['CNC Machining', 'Sheet Metal Stamping', 'Casting', 'Forging', 'Injection Moulding', 'Fabrication & Welding'].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Delivery lead time (days)</label>
                    <input className={input} type="number" value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })} />
                  </div>
                  <div>
                    <label className={label}>Delivery location</label>
                    <input className={input} placeholder="e.g. Pune, MH" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className={label}>Additional notes</label>
                    <textarea className={input + ' resize-none'} rows={3} placeholder="Tolerances, finish, certifications…" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setGenOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button
                    disabled={!canGenerate}
                    onClick={runGenerate}
                    className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    ✨ Generate Template
                  </button>
                </div>
              </div>
            )}

            {genStep === 'generating' && (
              <div className="p-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin mb-6" />
                <div className="space-y-2 w-full max-w-xs">
                  {GEN_STAGES.map((s, i) => (
                    <div key={s} className={`flex items-center gap-2 text-sm transition-opacity ${i <= stageIdx ? 'opacity-100' : 'opacity-30'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${i < stageIdx ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>
                        {i < stageIdx ? '✓' : '•'}
                      </span>
                      <span className="text-gray-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {genStep === 'preview' && (
              <div className="p-6">
                <div className="rounded-xl border border-gray-200 p-8 bg-white shadow-sm max-w-3xl mx-auto">
                  <div className="flex justify-end mb-4 border-b pb-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {form.company || 'VOLTEDGE MOBILITY COMPONENTS PRIVATE LIMITED'} | CONFIDENTIAL RFQ
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-center text-gray-900 mb-4 font-serif">Request for Quotation</h1>
                  <h2 className="text-lg font-bold text-center text-gray-800 mb-6 font-serif">{draft.title}</h2>
                  
                  <table className="w-full text-sm mb-6 border-collapse">
                    <thead>
                      <tr className="bg-[#1a365d] text-white">
                        <th className="border border-[#1a365d] py-2 px-4 text-left w-1/3">RFQ detail</th>
                        <th className="border border-[#1a365d] py-2 px-4 text-left">Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Issuing company', form.company || 'VoltEdge Mobility Components Private Limited'],
                        ['RFQ reference', draft.id],
                        ['Issue date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
                        ['Quotation due', new Date(Date.now() + 14 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ' by 17:00 IST'],
                        ['Indicative award date', new Date(Date.now() + 25 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
                        ['Indicative start of production', new Date(Date.now() + 42 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ', subject to PPAP approval'],
                        ['Contract quantity', `${form.quantity || '10,000'} production units over three months`],
                        ['Delivery model', `JIT delivery to ${form.location || 'buyer plant'} every three days`],
                        ['Commercial terms', `INR, GST extra, freight included, payment 60 days`],
                        ['RFQ contact', `Head Supply Chain, sourcing@${(form.company || 'voltedge').toLowerCase().replace(/\s+/g, '')}-example.com`],
                      ].map(([k, v], i) => (
                        <tr key={k} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-200 py-2 px-4 font-medium text-gray-900">{k}</td>
                          <td className="border border-gray-200 py-2 px-4 text-gray-700">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-sm text-gray-800 space-y-4 leading-relaxed font-serif">
                    <p>
                      This document invites qualified {form.process.toLowerCase()} suppliers to submit a complete technical and commercial quotation for an automotive {form.material.toLowerCase()} component. The selected supplier must demonstrate capable manufacturing processes, stable quality systems, adequate liquidity for a 60-day payment cycle, and reliable JIT supply.
                    </p>
                    <p>
                      All names, references, dates and specifications in this sample RFQ are illustrative. The released drawing, approved material specification and purchase order will prevail over this document where expressly stated.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between gap-3 mt-6">
                  <button onClick={() => setGenStep('form')} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">← Edit details</button>
                  <button onClick={useDraft} className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-black transition">
                    Use this RFQ →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
