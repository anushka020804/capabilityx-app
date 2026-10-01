import React from 'react';

const capabilities = [
  { label: 'Manufacturing', value: 79 },
  { label: 'Technical', value: 71 },
  { label: 'Quality', value: 76 },
  { label: 'Capacity', value: 64 },
  { label: 'Experience', value: 82 },
  { label: 'Commercial', value: 68 },
];

const smes = [
  { name: 'Apex Engineering', sector: 'Automotive', score: 92, status: 'FULL MATCH', statusColor: 'text-emerald-700', statusBg: 'bg-emerald-100' },
  { name: 'Bharat Components', sector: 'Precision Mfg', score: 81, status: 'PARTIAL MATCH', statusColor: 'text-amber-700', statusBg: 'bg-amber-100' },
  { name: 'Precision Works', sector: 'Sheet Metal', score: 74, status: 'PARTIAL MATCH', statusColor: 'text-amber-700', statusBg: 'bg-amber-100' },
  { name: 'Mehta Fabrications', sector: 'General Mfg', score: 68, status: 'PARTIAL MATCH', statusColor: 'text-amber-700', statusBg: 'bg-amber-100' },
  { name: 'Shree Industries', sector: 'General Mfg', score: null, status: 'NO-GO', statusColor: 'text-red-700', statusBg: 'bg-red-100' },
];

export default function FIDashboard() {
  return (
    <div className="p-8 animate-fade-in w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold tracking-[0.1em] mb-2 px-2 py-0.5 rounded inline-block bg-indigo-50 text-indigo-600">
          FINANCIAL INSTITUTION VIEW
        </div>
        <h1 className="text-2xl font-bold mb-1 text-gray-900 tracking-tight">
          Your SME Capability Network
        </h1>
        <p className="text-sm text-gray-500">Capability intelligence across your SME lending and financing portfolio.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: '248', label: 'SMEs in network' },
          { value: '186', label: 'Verified suppliers' },
          { value: '24', label: 'Active opportunities' },
          { value: '78%', label: 'Avg capability score' },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-3xl font-bold mb-1 text-gray-900 tracking-[-0.02em]">{kpi.value}</div>
            <div className="text-xs text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SME list */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-sm text-gray-900">Explore SME Capability</h2>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View all 248 →</button>
          </div>
          <div className="divide-y divide-gray-100">
            {smes.map(sme => (
              <div
                key={sme.name}
                className="flex items-center justify-between px-6 py-4 transition-colors cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-indigo-50 text-indigo-600"
                  >
                    {sme.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{sme.name}</div>
                    <div className="text-xs text-gray-400">{sme.sector}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {sme.score && (
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{sme.score}%</div>
                      <div className="text-xs text-gray-500">score</div>
                    </div>
                  )}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-[0.04em] ${sme.statusColor} ${sme.statusBg}`}
                  >
                    {sme.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capability summary */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-sm text-gray-900">Portfolio Capability</h2>
              <p className="text-xs mt-0.5 text-gray-500">Across 186 verified SMEs</p>
            </div>
            <div className="px-5 py-4 space-y-3.5">
              {capabilities.map(cap => (
                <div key={cap.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">{cap.label}</span>
                    <span className="text-xs font-semibold text-gray-900">{cap.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${cap.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="font-semibold text-sm text-white mb-2">Active Opportunities</h3>
            <p className="text-xs mb-4 text-gray-400">
              24 active RFQs in your SME network match current opportunities.
            </p>
            <button
              className="w-full py-2.5 rounded-lg text-xs font-semibold text-white border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all"
            >
              Explore opportunities →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
