import React from 'react';

interface BuyerDashboardProps {
  onFloatRFQ: () => void;
  onOpenRFQ: () => void;
}

const kpis = [
  { value: '48', label: 'Suppliers evaluated' },
  { value: '6', label: 'Active RFQs' },
  { value: '32', label: 'Suppliers matched' },
  { value: '78%', label: 'Avg capability score' },
];

const rfqs = [
  { id: 'RFQ-1042', name: 'Automotive Bracket Assembly', suppliers: 18, status: 'Analyzed', statusColor: 'text-emerald-600', statusBg: 'bg-emerald-100' },
  { id: 'RFQ-1041', name: 'CNC Components', suppliers: 12, status: 'Matching', statusColor: 'text-amber-600', statusBg: 'bg-amber-100' },
];



export default function BuyerDashboard({ onFloatRFQ, onOpenRFQ }: BuyerDashboardProps) {
  return (
    <div className="p-8 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-gray-900 tracking-tight">
            Good morning, Acme Manufacturing
          </h1>
          <p className="text-sm text-gray-500">Supplier intelligence at a glance.</p>
        </div>
        <button
          onClick={onFloatRFQ}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Float an RFQ
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-3xl font-bold mb-1 text-gray-900 tracking-tight">
              {kpi.value}
            </div>
            <div className="text-xs text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {/* Recent RFQs */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-sm text-gray-900">Recent RFQs</h2>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
          <div className="divide-y divide-gray-100">
            {rfqs.map((rfq) => (
              <button
                key={rfq.id}
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors bg-transparent hover:bg-gray-50"
                onClick={rfq.id === 'RFQ-1042' ? onOpenRFQ : undefined}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs font-mono mb-0.5 text-gray-400">{rfq.id}</div>
                    <div className="text-sm font-medium text-gray-900">{rfq.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{rfq.suppliers}</div>
                    <div className="text-xs text-gray-500">suppliers</div>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${rfq.statusColor} ${rfq.statusBg}`}
                  >
                    {rfq.status}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-300">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
