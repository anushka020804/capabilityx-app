import React, { useState } from 'react';
import { capabilityDomainsData, CapabilityDomain } from '../data/capabilityDataPoints';

type MatchStatus = 'FULLY MATCHED' | 'PARTIALLY MATCHED' | 'NOT MATCHED';

// Per-supplier match status for each of the 6 capability domains
const supplierDomainStatus: Record<string, Record<string, MatchStatus>> = {
  apex: {
    org: 'FULLY MATCHED',
    policies: 'FULLY MATCHED',
    ops: 'FULLY MATCHED',
    finance: 'FULLY MATCHED',
    certs: 'FULLY MATCHED',
    customers: 'FULLY MATCHED',
  },
  bharat: {
    org: 'FULLY MATCHED',
    policies: 'PARTIALLY MATCHED',
    ops: 'PARTIALLY MATCHED',
    finance: 'PARTIALLY MATCHED',
    certs: 'FULLY MATCHED',
    customers: 'PARTIALLY MATCHED',
  },
  precision: {
    org: 'PARTIALLY MATCHED',
    policies: 'NOT MATCHED',
    ops: 'NOT MATCHED',
    finance: 'NOT MATCHED',
    certs: 'NOT MATCHED',
    customers: 'PARTIALLY MATCHED',
  },
};

function MatchBadge({ status }: { status: MatchStatus }) {
  const config: Record<MatchStatus, { icon: string; text: string; bg: string; color: string; border: string }> = {
    'FULLY MATCHED': { icon: '✓', text: 'Matched', bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200' },
    'PARTIALLY MATCHED': { icon: '◑', text: 'Partial', bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200' },
    'NOT MATCHED': { icon: '✕', text: 'Gap', bg: 'bg-red-50', color: 'text-red-700', border: 'border-red-200' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase border ${c.bg} ${c.color} ${c.border}`}>
      {c.icon} {c.text}
    </span>
  );
}

function DataPointCard({ label, value, source, matchStatus, mandatory }: { label: string; value: string | number; source: string; matchStatus?: MatchStatus; mandatory?: boolean }) {
  let displayValue: React.ReactNode = value;
  let valueColor = 'text-gray-900';

  if (value === 'Yes') {
    displayValue = (
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="8" fill="#10B981" fillOpacity="0.2" />
          <path d="M5 8l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Yes
      </span>
    );
    valueColor = 'text-emerald-700';
  } else if (value === 'No') {
    displayValue = (
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="8" fill="#EF4444" fillOpacity="0.1" />
          <path d="M5 5l6 6m0-6l-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
        No
      </span>
    );
    valueColor = 'text-gray-900';
  } else if (value === 'Not available') {
    valueColor = 'text-gray-400 font-medium italic';
  }

  return (
    <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 hover:border-indigo-300 hover:shadow-sm transition-all h-full">
      {mandatory && (
        <span className="absolute top-2.5 left-3 text-red-500 text-sm font-bold leading-none">*</span>
      )}
      {matchStatus && (
        <div className="absolute top-3 right-3">
          <MatchBadge status={matchStatus} />
        </div>
      )}
      <span className={`text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-[0.06em] ${mandatory ? 'pl-3' : ''} ${matchStatus ? 'pr-20' : ''}`}>{label}</span>
      <div className={`text-base font-bold mb-4 leading-tight ${valueColor} whitespace-pre-line ${mandatory ? 'pl-3' : ''} ${matchStatus ? 'pr-20' : ''}`}>
        {displayValue}
      </div>
      <div className="mt-auto pt-3 border-t border-gray-100">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-100">
          {source}
        </span>
      </div>
    </div>
  );
}

function Accordion({ domain, matchStatus }: { domain: CapabilityDomain; matchStatus?: MatchStatus }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden mb-3 shadow-sm">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-6 h-6 rounded-md transition-colors ${open ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
              <path d="M5 2L11 8L5 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-sm text-gray-900 uppercase tracking-wide">{domain.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {matchStatus && <MatchBadge status={matchStatus} />}
          <span className="text-xs font-bold text-gray-400 px-2.5 py-1 rounded-full bg-gray-100">{domain.points.length} data points</span>
        </div>
      </button>
      
      {open && (
        <div className="p-5 bg-gray-50/50 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domain.points.map((pt, i) => (
              <DataPointCard key={i} {...pt} matchStatus={pt.scored ? matchStatus : undefined} mandatory={pt.mandatory} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CapabilityDataPoints({ supplierId }: { supplierId?: string }) {
  const statuses = supplierId ? supplierDomainStatus[supplierId] : undefined;

  return (
    <div className="mb-8">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Capability Data Points</h2>
          <p className="text-sm font-medium text-indigo-600 mt-1">61+ structured data points across 6 capability domains</p>
        </div>
        <div className="text-xs font-medium text-gray-400 flex items-center gap-1.5 flex-wrap max-w-sm sm:text-right sm:justify-end">
          <span className="font-bold text-gray-500 uppercase tracking-widest mr-1">Sources:</span>
          SME Survey &middot; OpportunityX &middot; MetalCapital &middot; Financials &middot; GST &middot; Certifications
        </div>
      </div>
      
      <div className="space-y-3">
        {capabilityDomainsData.map(domain => (
          <Accordion
            key={domain.id}
            domain={domain}
            matchStatus={statuses ? statuses[domain.id] : undefined}
          />
        ))}
      </div>
    </div>
  );
}
