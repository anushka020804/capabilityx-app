import React, { useState } from 'react';

interface RoleSelectionProps {
  onBuyer: () => void;
  onFI: () => void;
  onBack: () => void;
}

export default function RoleSelection({ onBuyer, onFI, onBack }: RoleSelectionProps) {
  const [hovered, setHovered] = useState<'buyer' | 'fi' | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 px-8 h-16 flex items-center justify-between bg-white w-full shadow-sm">
        <button onClick={onBack} className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-lg w-[32px] h-[32px] bg-indigo-600">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9" />
              <circle cx="8" cy="8" r="2.5" fill="#4F46E5" />
            </svg>
          </div>
          <span className="font-bold tracking-[0.08em] text-[13px] text-gray-900">
            CAPABILITYX
          </span>
        </button>
        <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Back
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 w-full relative">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] px-4 py-2 rounded-full mb-6 bg-indigo-50 text-indigo-600 border border-indigo-100">
            GET STARTED
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
            Choose your workspace
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            CapabilityX provides tailored intelligence depending on how you interact with the supplier ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto relative z-10">
          {/* Buyer */}
          <div
            className={`group rounded-2xl border-2 p-10 cursor-pointer transition-all duration-300 flex flex-col bg-white ${
              hovered === 'buyer'
                ? 'border-indigo-600 shadow-2xl shadow-indigo-600/10 -translate-y-1'
                : 'border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
            onMouseEnter={() => setHovered('buyer')}
            onMouseLeave={() => setHovered(null)}
            onClick={onBuyer}
          >
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${
                hovered === 'buyer' ? 'bg-indigo-600' : 'bg-indigo-50'
              }`}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6M9 16h6M9 8h2" stroke={hovered === 'buyer' ? 'white' : '#4F46E5'} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 4h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1Z" stroke={hovered === 'buyer' ? 'white' : '#4F46E5'} strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
                Procurement & Supply Chain
              </h2>
              <p className="text-base leading-relaxed text-gray-500 mb-6">
                I have an RFQ and need to discover, verify, and shortlist capable suppliers matched exactly to my technical requirements.
              </p>
            </div>
            
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-sm font-bold tracking-wider uppercase ${
                hovered === 'buyer' ? 'text-indigo-600' : 'text-gray-400'
              }`}>
                Enter Buyer Workspace
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                hovered === 'buyer' ? 'bg-indigo-100 text-indigo-600 translate-x-2' : 'bg-gray-50 text-gray-400'
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* FI */}
          <div
            className={`group rounded-2xl border-2 p-10 cursor-pointer transition-all duration-300 flex flex-col bg-white ${
              hovered === 'fi'
                ? 'border-indigo-600 shadow-2xl shadow-indigo-600/10 -translate-y-1'
                : 'border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
            onMouseEnter={() => setHovered('fi')}
            onMouseLeave={() => setHovered(null)}
            onClick={onFI}
          >
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${
                hovered === 'fi' ? 'bg-indigo-600' : 'bg-indigo-50'
              }`}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9Z" stroke={hovered === 'fi' ? 'white' : '#4F46E5'} strokeWidth="1.5" />
                <path d="M9 22V12h6v10" stroke={hovered === 'fi' ? 'white' : '#4F46E5'} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
                Financial Institution
              </h2>
              <p className="text-base leading-relaxed text-gray-500 mb-6">
                I want to understand the capability, performance, and risk profile of my SME lending base using real operational data.
              </p>
            </div>
            
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-sm font-bold tracking-wider uppercase ${
                hovered === 'fi' ? 'text-indigo-600' : 'text-gray-400'
              }`}>
                Enter FI Workspace
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                hovered === 'fi' ? 'bg-indigo-100 text-indigo-600 translate-x-2' : 'bg-gray-50 text-gray-400'
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
