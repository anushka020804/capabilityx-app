import React, { useState } from 'react';

interface RFQAnalysisProps {
  onFindSuppliers: () => void;
  onBack: () => void;
}

const sections = [
  {
    id: 'basic',
    label: 'Basic Details',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    data: [
      { key: 'RFQ Number', value: 'RFQ-1042' },
      { key: 'Project Name', value: 'Automotive Bracket Assembly' },
      { key: 'Customer', value: 'ABC Automotive Pvt Ltd' },
      { key: 'Target Quantity', value: '10,000 units / month' },
      { key: 'Expected Delivery', value: '≤ 30 days from PO' },
    ]
  },
  {
    id: 'technical',
    label: 'Technical Requirements',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
    data: [
      { key: 'Core Process', value: 'Sheet Metal Stamping, CNC Machining' },
      { key: 'Material', value: 'Cold Rolled Steel (CRS) / Aluminium' },
      { key: 'Tolerances', value: '± 0.05 mm on critical dimensions' },
      { key: 'Equipment Required', value: '250T Press, VMC, CMM for inspection' },
    ]
  },
  {
    id: 'commercial',
    label: 'Commercial & Experience',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    data: [
      { key: 'Minimum Experience', value: '3+ years in automotive component manufacturing' },
      { key: 'Required Capacity', value: 'Minimum 10,000 units/month dedicated capacity' },
      { key: 'Prior OEM Experience', value: 'Mandatory (Tier 1 or OEM direct)' },
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance & Quality',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    data: [
      { key: 'Quality Management', value: 'ISO 9001:2015 Certification (Mandatory)' },
      { key: 'Automotive standard', value: 'IATF 16949 (Preferred)' },
      { key: 'Testing', value: 'In-house tensile and material composition testing preferred' },
    ]
  }
];

export default function RFQAnalysis({ onFindSuppliers, onBack }: RFQAnalysisProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="p-8 animate-fade-in w-full max-w-[1400px] mx-auto h-full flex flex-col bg-[var(--color-bg)]">
      {/* Top Actions */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors text-gray-500 hover:text-gray-900 group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-gray-300 group-hover:shadow transition-all">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          Back to Upload
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-gray-400">
            <path d="M3 2.5A1.5 1.5 0 014.5 1H9.5L13 4.5V13.5A1.5 1.5 0 0111.5 15h-7A1.5 1.5 0 013 13.5V2.5Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="text-xs font-medium text-gray-600 truncate max-w-[200px]">Automotive_Bracket_Assembly_RFQ.pdf</span>
        </div>
      </div>

      <div className="flex items-end justify-between mb-10 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Parsed AI Document Analysis
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Processing complete
            </span>
            <span className="text-gray-300">•</span>
            <span>15 key parameters extracted</span>
          </div>
        </div>
        <button
          onClick={onFindSuppliers}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5"
        >
          Find Matching Suppliers
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 min-h-0 gap-8">
        {/* Left Sidebar - Navigation */}
        <div className="w-72 shrink-0 flex flex-col gap-2">
          {sections.map(section => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative group flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all duration-200 overflow-hidden ${
                  isActive 
                    ? 'bg-white shadow-sm border border-gray-200' 
                    : 'bg-transparent border border-transparent hover:bg-white hover:border-gray-200'
                }`}
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 transition-transform duration-200 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-gray-300'}`} />
                
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500 group-hover:text-gray-700'}`}>
                  {section.icon}
                </div>
                <span className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Content - Data Display */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  {currentSection?.icon}
               </div>
               <div>
                 <h2 className="text-xl font-bold text-gray-900">
                   {currentSection?.label}
                 </h2>
                 <p className="text-xs text-gray-500 mt-0.5">Identified requirements from {currentSection?.label.toLowerCase()}</p>
               </div>
            </div>
          </div>
          
          <div className="p-8 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {currentSection?.data.map((item, idx) => (
                <div key={idx} className="group relative bg-white border border-gray-100 p-5 rounded-xl hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50 transition-all duration-200">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                    {item.key}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
                      <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                  <div className="text-[15px] font-semibold text-gray-900 leading-snug pr-4">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
