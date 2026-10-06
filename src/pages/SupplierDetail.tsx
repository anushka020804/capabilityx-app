import React from 'react';
import { suppliers } from '../data/mockData';
import CapabilityDataPoints from '../components/CapabilityDataPoints';
import VendorEngagement from '../components/VendorEngagement';

interface SupplierDetailProps {
  supplierId: string;
  onBack: () => void;
  onViewGraph?: () => void;
}

const capabilityLabels = [
  'Organisation Structure & Health',
  'Policies & Practices',
  'Operations — Technical Capacity',
  'Financial Details',
  'Certifications',
  'Customer Concentration & Revenue Mix'
];
const capabilityKeys = ['manufacturing', 'technical', 'quality', 'capacity', 'experience', 'commercial'] as const;

function StatusPill({ status }: { status: 'FULLY MATCHED' | 'PARTIALLY MATCHED' | 'NOT MATCHED' }) {
  const map: Record<string, { color: string; bg: string; icon: string }> = {
    'FULLY MATCHED': { color: 'text-emerald-700', bg: 'bg-emerald-100', icon: '✓' },
    'PARTIALLY MATCHED': { color: 'text-amber-700', bg: 'bg-amber-100', icon: '◑' },
    'NOT MATCHED': { color: 'text-red-700', bg: 'bg-red-100', icon: '✕' },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-[0.04em] ${s.color} ${s.bg}`}>
      {s.icon} {status}
    </span>
  );
}

function CapBar({ value, label }: { value: number; label: string }) {
  const colorClass = value >= 90 ? 'bg-emerald-500' : value >= 75 ? 'bg-indigo-500' : value >= 60 ? 'bg-amber-500' : 'bg-red-500';
  const textColorClass = value >= 90 ? 'text-emerald-600' : value >= 75 ? 'text-indigo-600' : value >= 60 ? 'text-amber-600' : 'text-red-600';
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-end justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-gray-500">
          {label}
        </span>
        <span className={`text-2xl font-bold ${textColorClass}`}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function SupplierDetail({ supplierId, onBack, onViewGraph }: SupplierDetailProps) {
  const supplier = suppliers.find(s => s.id === supplierId)!;
  const isNogo = supplier.status === 'NO-GO';

  const overallColor = supplier.status === 'FULL MATCH' ? 'text-emerald-700'
    : supplier.status === 'PARTIAL MATCH' ? 'text-amber-700' : 'text-red-700';
  const overallBg = supplier.status === 'FULL MATCH' ? 'bg-emerald-100'
    : supplier.status === 'PARTIAL MATCH' ? 'bg-amber-100' : 'bg-red-100';

  return (
    <div className="p-8 animate-fade-in w-full max-w-6xl mx-auto relative">
      {/* Top Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm transition-colors text-gray-500 hover:text-gray-900"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Back to shortlist
        </button>

        {onViewGraph && (
          <button
            onClick={onViewGraph}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors text-indigo-600 hover:text-indigo-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            View in Capability Graph
          </button>
        )}
      </div>

      {/* Hero */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-gray-900 tracking-tight">
              {supplier.name.toUpperCase()}
            </h1>
            <p className="text-sm mb-4 text-gray-500">{supplier.sector}</p>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-bold tracking-[0.06em] ${overallBg} ${overallColor}`}>
                {supplier.status}
              </span>
              <span className="text-sm text-gray-500">
                {supplier.matched} / {supplier.total} requirements matched
              </span>
            </div>
          </div>
          {!isNogo ? (
            <div className="text-right flex flex-col items-end">
              <div className="text-6xl font-bold text-gray-900 tracking-[-0.03em]">
                {supplier.score}
              </div>
              <div className="text-sm font-medium mt-1 text-gray-500">Capability Score</div>
            </div>
          ) : (
            <div className="text-right">
              <div className="text-3xl font-bold px-4 py-2 rounded-xl text-red-700 bg-red-100">
                NO-GO
              </div>
              <div className="text-xs mt-2 text-red-600">Mandatory requirement failed</div>
            </div>
          )}
        </div>
      </div>

      {/* Buyer ⇄ Vendor engagement */}
      {!isNogo && <VendorEngagement supplierId={supplierId} supplierName={supplier.name} />}

      {/* No-go explanation */}
      {isNogo && supplier.failedMandatory && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#EF4444" strokeWidth="1.5" />
              <path d="M10 6v5M10 13.5v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-sm text-red-600">
              Supplier failed a mandatory requirement
            </span>
          </div>
          <p className="text-sm mb-4 text-gray-500">
            Mandatory requirements are evaluated before supplier scoring. Failing any mandatory requirement results in immediate disqualification.
          </p>
          <div className="rounded-xl border border-red-200 bg-white p-5">
            <div className="font-semibold text-sm mb-3 text-gray-900">
              {supplier.failedMandatory.req}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs mb-1 text-gray-500">Required</div>
                <div className="text-sm font-semibold text-emerald-600">
                  {supplier.failedMandatory.required}
                </div>
              </div>
              <div>
                <div className="text-xs mb-1 text-gray-500">Supplier</div>
                <div className="text-sm font-semibold text-red-600">
                  {supplier.failedMandatory.supplier}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-red-200">
              <span className="text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-700">
                NOT ELIGIBLE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Partial gaps */}
      {supplier.status === 'PARTIAL MATCH' && supplier.gaps && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L2 17h16L10 2Z" stroke="#F59E0B" strokeWidth="1.5" />
              <path d="M10 8v4M10 14.5v.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-sm text-amber-800">
              {supplier.gaps.length} capability gaps identified
            </span>
          </div>
          <div className="space-y-4">
            {supplier.gaps.map((gap) => {
              const isDelivery = gap.inverse;
              const reqVal = gap.requiredVal;
              const supVal = gap.supplierVal;
              const maxVal = Math.max(reqVal, supVal) * 1.15;
              const reqPct = (reqVal / maxVal) * 100;
              const supPct = (supVal / maxVal) * 100;
              return (
                <div key={gap.label} className="rounded-xl border border-amber-200 bg-white p-5">
                  <div className="font-semibold text-sm mb-3 text-gray-900">{gap.label}</div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs mb-1 text-gray-500">Required</div>
                      <div className="text-sm font-semibold text-emerald-600">{gap.required}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1 text-gray-500">Supplier</div>
                      <div className="text-sm font-semibold text-red-600">{gap.supplier}</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1 text-gray-500">
                        <span>Required</span><span>{gap.required}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${reqPct}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1 text-gray-500">
                        <span>Supplier</span><span>{gap.supplier}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                        <div className="h-full rounded-full bg-red-500" style={{ width: `${supPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Capability profile */}
      {!isNogo && (
        <>
          <h2 className="text-base font-bold mb-4 text-gray-900">Capability Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {capabilityKeys.map((key, i) => (
              <CapBar key={key} value={supplier.capabilities[key]} label={capabilityLabels[i]} />
            ))}
          </div>
        </>
      )}

      {/* Capability Data Points */}
      <CapabilityDataPoints supplierId={supplierId} />



      {/* Score breakdown note */}
      {!isNogo && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 flex items-start gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-gray-400">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-xs leading-relaxed text-gray-500">
            <strong className="text-gray-600">Scoring model:</strong> Six capability categories — Organisation Structure & Health, Policies & Practices, Operations — Technical Capacity, Financial Details, Certifications, and Customer Concentration & Revenue Mix — carry equal weight in the initial model. Data-point-level weights can evolve as the model matures.
          </p>
        </div>
      )}
    </div>
  );
}
