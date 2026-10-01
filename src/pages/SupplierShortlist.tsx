import React, { useState } from 'react';
import { suppliers } from '../data/mockData';

type Filter = 'All' | 'Full Match' | 'Partial Match' | 'Not Matched';

interface SupplierShortlistProps {
  onViewSupplier: (id: string) => void;
}

function StatusBadge({ status }: { status: string }) {
  let display = status;
  let classes = 'bg-gray-100 text-gray-500';
  if (status === 'FULL MATCH') {
    display = 'FULLY MATCHED';
    classes = 'bg-emerald-100 text-emerald-700';
  } else if (status === 'PARTIAL MATCH') {
    display = 'PARTIALLY MATCHED';
    classes = 'bg-amber-100 text-amber-700';
  } else if (status === 'NOT MATCHED' || status === 'NO-GO') {
    display = 'NOT MATCHED';
    classes = 'bg-red-100 text-red-700';
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-[0.06em] uppercase ${classes}`}
    >
      {display}
    </span>
  );
}

function ScoreRing({ score, status }: { score: number | null; status: string }) {
  if (score === null) {
    return (
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border-2 border-red-600 text-red-600">
        N/A
      </div>
    );
  }
  const colorClass = score >= 85 ? 'text-emerald-600' : score >= 70 ? 'text-amber-500' : 'text-red-600';
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative w-12 h-12">
      <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" className="stroke-gray-100" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={r} fill="none"
          className={colorClass} stroke="currentColor" strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-bold ${colorClass}`}>{score}</span>
      </div>
    </div>
  );
}

export default function SupplierShortlist({ onViewSupplier }: SupplierShortlistProps) {
  const [filter, setFilter] = useState<Filter>('All');

  const filters: Filter[] = ['All', 'Full Match', 'Partial Match', 'Not Matched'];

  const filtered = suppliers.filter(s => {
    if (s.status === 'NO-GO') return false;
    if (filter === 'All') return true;
    if (filter === 'Full Match') return s.status === 'FULL MATCH';
    if (filter === 'Partial Match') return s.status === 'PARTIAL MATCH';
    if (filter === 'Not Matched') return s.status === 'NOT MATCHED';
    return true;
  });

  return (
    <div className="p-8 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 text-gray-900 tracking-tight">
          Supplier Shortlist
        </h1>
        <p className="text-sm text-gray-500">
          18 suppliers analyzed against your RFQ — Automotive Bracket Assembly
        </p>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-6">
        {[
          { label: 'Full Match', count: 6, bgClass: 'bg-emerald-500', pillBg: 'bg-white', border: 'border-gray-200' },
          { label: 'Partial Match', count: 9, bgClass: 'bg-amber-500', pillBg: 'bg-white', border: 'border-gray-200' },
          { label: 'Not Matched', count: 3, bgClass: 'bg-red-500', pillBg: 'bg-white', border: 'border-gray-200' },
        ].map(s => (
          <div key={s.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${s.border} ${s.pillBg}`}>
            <div className={`w-2 h-2 rounded-full ${s.bgClass}`} />
            <span className="text-sm font-semibold text-gray-900">{s.count}</span>
            <span className="text-xs text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${
              filter === f 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Supplier cards */}
      <div className="space-y-3">
        {filtered.map((supplier) => (
          <div
            key={supplier.id}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 cursor-pointer hover:border-indigo-300 hover:shadow-md"
            onClick={() => onViewSupplier(supplier.id)}
          >
            <div className="flex items-center gap-5">
              {/* Score ring */}
              <ScoreRing score={supplier.score} status={supplier.status} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-base text-gray-900">{supplier.name}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{supplier.sector}</span>
                  <span>·</span>
                  <span>{supplier.matched}/{supplier.total} requirements matched</span>
                </div>
                <p className="text-xs mt-1.5 text-gray-400">{supplier.summary}</p>
              </div>

              {/* Quick stats */}
              <div className="hidden md:flex items-center gap-6 shrink-0">
                {[
                  { label: 'Experience', value: supplier.experience },
                  { label: 'Capacity', value: supplier.capacity ? `${supplier.capacity.toLocaleString()}/mo` : '—' },
                  { label: 'Delivery', value: `${supplier.delivery}d` },
                ].map(stat => (
                  <div key={stat.label} className="text-right">
                    <div className="text-sm font-medium text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button
                className="ml-4 px-4 py-2 rounded-lg text-xs font-semibold border border-indigo-200 bg-indigo-50 text-indigo-600 transition-all shrink-0 hover:bg-indigo-100"
                onClick={e => { e.stopPropagation(); onViewSupplier(supplier.id); }}
              >
                View details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
