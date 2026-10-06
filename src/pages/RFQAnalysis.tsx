import React, { useState } from 'react';

interface RFQAnalysisProps {
  onFindSuppliers: () => void;
  onBack: () => void;
}

type SectionData = {
  id: string;
  title: string;
  subtitle: string;
  complexity?: 'LOW' | 'MEDIUM' | 'HIGH';
  summary?: string;
  tableData?: { key: string; value: string }[];
  highlightsTitle?: string;
  highlights?: string[];
  sourcesCount?: number;
};

const sections: SectionData[] = [
  {
    id: '1',
    title: '1. Executive Summary',
    subtitle: 'At-a-glance read on relevance and feasibility before opening the full report.',
    complexity: 'LOW',
    summary: 'The tender is a standard custom bid with very low financial barriers to entry (1 Lakh turnover requirement), a short execution window (2 months), and no complex technical evaluation criteria specified.',
    tableData: [
      { key: 'NATURE OF PROCUREMENT', value: 'Custom Bid for Services' },
      { key: 'SCOPE (CONDENSED)', value: 'Procurement and Installation of Equipment for the new park at Kataribagh, including support services.' },
      { key: 'QUANTITY', value: '1 (Lumpsum Based)' },
      { key: 'ESTIMATED VALUE', value: 'Not specified in tender documents' },
    ],
    highlightsTitle: 'KEY COMMERCIAL HIGHLIGHTS',
    highlights: [
      'Minimum average annual turnover required is ₹1 Lakh.',
      'Buyer reserves the right to increase or decrease contract quantity/duration by up to 50%.',
      'Service provider must have a local office in the state of the consignee.',
      'Purchase preference is available for MSEs and MIIs.',
    ],
    sourcesCount: 6,
  },
  {
    id: '2',
    title: '2. Key Dates & Milestones',
    subtitle: 'Important deadlines and scheduling for the bid process.',
    tableData: [
      { key: 'PUBLISH DATE', value: '12th Oct 2026' },
      { key: 'BID SUBMISSION END DATE', value: '26th Oct 2026, 15:00 HRS' },
      { key: 'BID OPENING DATE', value: '26th Oct 2026, 15:30 HRS' },
      { key: 'PRE-BID MEETING', value: 'Not Applicable' },
    ],
    highlightsTitle: 'CRITICAL DEADLINES',
    highlights: [
      'Bid validity is 90 days from the date of bid opening.',
      'EMD must be submitted before the bid submission end date.',
      'Clarification requests must be submitted at least 3 days prior to the deadline.'
    ],
    sourcesCount: 3,
  },
  {
    id: '3',
    title: '3. Financial Information',
    subtitle: 'Turnover, EMD, and other financial requirements.',
    tableData: [
      { key: 'EARNEST MONEY DEPOSIT (EMD)', value: '₹50,000' },
      { key: 'EMD EXEMPTION', value: 'Allowed for registered MSEs' },
      { key: 'ePBG PERCENTAGE', value: '3%' },
      { key: 'MINIMUM TURNOVER', value: '₹1,000,000 in the last 3 financial years' },
    ],
    highlightsTitle: 'FINANCIAL HIGHLIGHTS',
    highlights: [
      'Performance Security (ePBG) to be submitted within 15 days of contract award.',
      'Payment will be processed within 30 days of invoice receipt and acceptance of deliverables.',
      'No advance payment will be made under any circumstances.'
    ],
    sourcesCount: 4,
  },
  {
    id: '4',
    title: '4. Eligibility Criteria',
    subtitle: 'Mandatory qualifications and certifications for bidders.',
    tableData: [
      { key: 'FIRM REGISTRATION', value: 'Must be registered in India (Company/LLP/Partnership)' },
      { key: 'PAST EXPERIENCE', value: 'At least 1 similar completed project in the last 3 years' },
      { key: 'ISO CERTIFICATION', value: 'ISO 9001:2015 required' },
      { key: 'BLACKLISTING', value: 'Must submit non-blacklisting declaration' },
    ],
    highlightsTitle: 'KEY ELIGIBILITY NOTES',
    highlights: [
      'Consortiums and Joint Ventures are strictly not allowed to participate.',
      'Past experience certificates must be accompanied by client completion letters.',
      'Startups are exempted from the past experience criteria subject to technical capability proof.'
    ],
    sourcesCount: 5,
  },
  {
    id: '5',
    title: '5. Scope of Work',
    subtitle: 'Detailed description of the deliverables and responsibilities.',
    summary: 'The contractor is responsible for the end-to-end supply, installation, testing, and commissioning (SITC) of the specified equipment, along with 1 year of comprehensive on-site warranty and maintenance.',
    tableData: [
      { key: 'DELIVERABLE 1', value: 'Supply of Heavy Duty Bracket Assemblies (10,000 units)' },
      { key: 'DELIVERABLE 2', value: 'Installation and calibration at the facility' },
      { key: 'DELIVERABLE 3', value: 'Training for up to 5 operator personnel' },
    ],
    highlightsTitle: 'OUT OF SCOPE',
    highlights: [
      'Civil works and foundation preparation will be handled by the buyer.',
      'Power supply provision up to the equipment panel is excluded.',
    ],
    sourcesCount: 7,
  },
  {
    id: '6',
    title: '6. Product Specifications',
    subtitle: 'Technical requirements and material standards.',
    tableData: [
      { key: 'MATERIAL', value: 'High Carbon Steel (Grade 45)' },
      { key: 'TOLERANCE', value: '±0.02mm on critical dimensions' },
      { key: 'SURFACE FINISH', value: 'Powder coated, 80 microns minimum thickness' },
      { key: 'TESTING STANDARD', value: 'IS 2062 / ASTM A36' },
    ],
    highlightsTitle: 'TECHNICAL HIGHLIGHTS',
    highlights: [
      'Material Test Certificates (MTC) from an NABL accredited lab must be submitted with each batch.',
      'First article inspection (FAI) approval is required before bulk production.',
    ],
    sourcesCount: 4,
  },
  {
    id: '7',
    title: '7. Process of Bid Submission',
    subtitle: 'Instructions for preparing and uploading the bid.',
    summary: 'Bids must be submitted exclusively through the portal in a two-cover system (Technical and Financial). Hard copies will not be accepted except for original EMD instruments.',
    tableData: [
      { key: 'COVER 1', value: 'Technical Bid (PDF format)' },
      { key: 'COVER 2', value: 'Financial Bid (BoQ / Excel format)' },
      { key: 'BID LANGUAGE', value: 'English' },
    ],
    highlightsTitle: 'SUBMISSION RULES',
    highlights: [
      'All documents must be digitally signed by the authorized representative.',
      'Financial bid should only contain pricing; any conditions attached will lead to rejection.',
      'Ensure file sizes do not exceed 10MB per document.'
    ],
    sourcesCount: 2,
  },
  {
    id: '8',
    title: '8. Documents Required',
    subtitle: 'Checklist of attachments to be provided with the bid.',
    tableData: [
      { key: 'ANNEXURE I', value: 'Bidder Profile and Registration Details' },
      { key: 'ANNEXURE II', value: 'Financial Turnover Certificate from CA' },
      { key: 'ANNEXURE III', value: 'Past Experience Work Orders' },
      { key: 'ANNEXURE IV', value: 'Non-Blacklisting Affidavit' },
    ],
    highlightsTitle: 'DOCUMENTATION HIGHLIGHTS',
    highlights: [
      'PAN, GSTIN, and MSME/Udyam certificates must be uploaded.',
      'Any document not in English must be accompanied by a certified translation.',
    ],
    sourcesCount: 3,
  },
  {
    id: '9',
    title: '9. Corrigendum Analysis',
    subtitle: 'Updates, modifications, or extensions to the original tender.',
    summary: 'No corrigendums have been issued for this tender yet. The original terms and conditions apply.',
    tableData: [
      { key: 'CORRIGENDUM 1', value: 'None' },
    ],
    highlightsTitle: 'STATUS',
    highlights: [
      'Please monitor the portal regularly as corrigendums can be issued up to 48 hours before the deadline.'
    ],
    sourcesCount: 1,
  },
  {
    id: '10',
    title: '10. Pre-Bid Query Information',
    subtitle: 'Details regarding clarifications and the pre-bid meeting.',
    tableData: [
      { key: 'MEETING DATE', value: 'Not Applicable for this tender' },
      { key: 'QUERY DEADLINE', value: '20th Oct 2026' },
      { key: 'SUBMISSION METHOD', value: 'Email to procurement@buyer.com' },
    ],
    highlightsTitle: 'QUERY RULES',
    highlights: [
      'Queries must be submitted in the prescribed Excel format.',
      'Telephonic clarifications will not be entertained.',
      'Responses will be published as a corrigendum on the portal.'
    ],
    sourcesCount: 2,
  },
  {
    id: '11',
    title: '11. Risks & Critical Clauses',
    subtitle: 'Potential liabilities, penalties, and termination conditions.',
    complexity: 'MEDIUM',
    tableData: [
      { key: 'LIQUIDATED DAMAGES', value: '0.5% per week of delay, max up to 10%' },
      { key: 'WARRANTY', value: '12 months from the date of final acceptance' },
      { key: 'TERMINATION', value: 'For default, convenience, or insolvency' },
    ],
    highlightsTitle: 'CRITICAL RISKS',
    highlights: [
      'The buyer reserves the right to reject any material failing the quality tests at the supplier’s cost.',
      'Force Majeure clause applies, but requires notification within 7 days of occurrence.',
      'Disputes are subject to the jurisdiction of courts in Pune.'
    ],
    sourcesCount: 5,
  },
  {
    id: '12',
    title: '12. Redlining - Areas for Clarification',
    subtitle: 'Ambiguous clauses identified by the AI that may require clarification.',
    summary: 'The AI has identified a few areas where the tender document lacks specific details, which could impact pricing or execution.',
    tableData: [
      { key: 'DELIVERY SCHEDULE', value: 'Vague ("as per requirement")' },
      { key: 'PAYMENT TERMS', value: 'Missing clause on part-payment for partial deliveries' },
    ],
    highlightsTitle: 'SUGGESTED CLARIFICATIONS',
    highlights: [
      'Request a firm monthly delivery schedule to accurately plan production.',
      'Clarify if proportional payment is allowed if the buyer delays the site readiness.'
    ],
    sourcesCount: 2,
  },
  {
    id: '13',
    title: '13. Contact Directory',
    subtitle: 'Key personnel and communication channels.',
    tableData: [
      { key: 'NODAL OFFICER', value: 'Mr. Rajesh Kumar, Procurement Head' },
      { key: 'EMAIL', value: 'rajesh.kumar@buyer.com' },
      { key: 'PHONE', value: '+91-20-2567XXXX' },
      { key: 'TECHNICAL CONTACT', value: 'Ms. Priya Singh, Chief Engineer' },
    ],
    highlightsTitle: 'COMMUNICATION ETIQUETTE',
    highlights: [
      'All formal communications must reference the RFQ Number in the subject line.',
      'Avoid contacting officials directly outside of the pre-bid queries process.'
    ],
    sourcesCount: 1,
  },
  {
    id: '14',
    title: '14. Formats Repository',
    subtitle: 'Standard templates required for the bid submission.',
    tableData: [
      { key: 'FORMAT 1', value: 'Bid Security Declaration (If EMD exempt)' },
      { key: 'FORMAT 2', value: 'Manufacturer Authorization Form (MAF)' },
      { key: 'FORMAT 3', value: 'Performance Bank Guarantee (PBG)' },
      { key: 'FORMAT 4', value: 'Self-Declaration for Local Content (MII)' },
    ],
    highlightsTitle: 'FORMAT NOTES',
    highlights: [
      'Do not alter the wording of the standard formats.',
      'Formats must be printed on the company letterhead where specified.'
    ],
    sourcesCount: 4,
  }
];

export default function RFQAnalysis({ onFindSuppliers, onBack }: RFQAnalysisProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const currentSection = sections.find(s => s.id === activeSection);

  if (!currentSection) return null;

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
        <div className="w-[280px] shrink-0 flex flex-col gap-1 pr-4">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-3">
            REPORT SECTIONS
          </div>
          <div className="overflow-y-auto pr-2 pb-8 custom-scrollbar h-full">
            {sections.map(section => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm mb-1 ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100/50' 
                      : 'bg-transparent text-gray-600 hover:bg-white hover:text-gray-900 hover:border-gray-200 border border-transparent font-medium'
                  }`}
                >
                  <span className="truncate pr-2">{section.title}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content - Data Display */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-8 overflow-y-auto">
            
            <div className="flex items-center gap-3 mb-5">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider bg-orange-100 text-orange-700 uppercase">AI-GENERATED</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider bg-emerald-100 text-emerald-700 uppercase">COMPLETE</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSection.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{currentSection.subtitle}</p>
            
            {currentSection.complexity && (
              <div className="mb-6">
                <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider bg-emerald-50 text-emerald-600 uppercase border border-emerald-100">
                  COMPLEXITY <span className="ml-1 text-emerald-700">{currentSection.complexity}</span>
                </span>
              </div>
            )}

            {currentSection.summary && (
              <p className="text-[15px] text-gray-700 leading-relaxed mb-8">
                {currentSection.summary}
              </p>
            )}

            {currentSection.tableData && currentSection.tableData.length > 0 && (
              <div className="rounded-xl border border-gray-200 overflow-hidden mb-8 shadow-sm">
                {currentSection.tableData.map((row, i) => (
                  <div key={i} className={`flex border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <div className="w-1/3 p-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-r border-gray-100 flex items-center">
                      {row.key}
                    </div>
                    <div className="w-2/3 p-4 text-[14px] font-medium text-gray-900 leading-snug">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentSection.highlights && currentSection.highlights.length > 0 && (
              <div className="rounded-xl border border-gray-200 overflow-hidden mb-8 bg-white shadow-sm">
                <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{currentSection.highlightsTitle || 'HIGHLIGHTS'}</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-4">
                    {currentSection.highlights.map((hl, i) => (
                      <li key={i} className="flex gap-3 text-[14px] text-gray-700">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span className="leading-relaxed">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {currentSection.sourcesCount && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">SOURCES ({currentSection.sourcesCount})</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
