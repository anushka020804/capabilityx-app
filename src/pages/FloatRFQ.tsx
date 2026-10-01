import React, { useState } from 'react';

interface FloatRFQProps {
  onAnalyze: () => void;
}

export default function FloatRFQ({ onAnalyze }: FloatRFQProps) {
  const [populated, setPopulated] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUseSample = () => {
    setPopulated(true);
  };

  return (
    <div className="p-8 animate-fade-in w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight">
        Find suppliers who can actually deliver.
      </h1>
      <p className="text-sm mb-8 text-gray-500">
        Upload your RFQ and CapabilityX will extract requirements and match capable suppliers.
      </p>

      {/* Upload zone */}
      <div
        className={`rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all duration-200 mb-4 ${
          dragging ? 'border-indigo-400 bg-indigo-50/50' : 'border-gray-300 bg-white'
        }`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); setPopulated(true); }}
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

      {/* Sample RFQ */}
      {!populated ? (
        <button
          onClick={handleUseSample}
          className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-all duration-200 hover:border-indigo-400 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 3h8l4 4v11a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1Z" stroke="#4F46E5" strokeWidth="1.5" />
                <path d="M12 3v4h4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">Use Sample RFQ</div>
              <div className="text-xs mt-0.5 text-gray-500">Automotive Bracket Assembly — ABC Automotive Pvt Ltd</div>
            </div>
            <div className="ml-auto text-indigo-600 transition-transform group-hover:translate-x-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <div className="rounded-xl border border-indigo-400 bg-white p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-100">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-600 tracking-wider">RFQ LOADED</span>
          </div>
          <h3 className="font-bold text-base mb-1 text-gray-900">Automotive Bracket Assembly</h3>
          <div className="text-xs font-mono mb-4 text-gray-400">RFQ-1042</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Customer', value: 'ABC Automotive Pvt Ltd' },
              { label: 'Quantity', value: '10,000 units / month' },
              { label: 'Delivery', value: '≤ 30 days' },
              { label: 'Material', value: 'Steel / Aluminium' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs mb-0.5 text-gray-500">{label}</div>
                <div className="text-sm font-medium text-gray-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyze button */}
      {populated && (
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
  );
}
