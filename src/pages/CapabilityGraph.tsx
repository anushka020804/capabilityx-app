import React, { useState } from 'react';

const categories = [
  { id: 'mfg', label: 'Org & Health', x: 80, y: 280, count: 14 },
  { id: 'tech', label: 'Policies', x: 204, y: 280, count: 11 },
  { id: 'qual', label: 'Operations', x: 328, y: 280, count: 8 },
  { id: 'cap', label: 'Financials', x: 452, y: 280, count: 9 },
  { id: 'exp', label: 'Certifications', x: 576, y: 280, count: 12 },
  { id: 'com', label: 'Revenue Mix', x: 700, y: 280, count: 7 },
];

const centerX = 390;
const centerY = 150;

const suppliers = [
  { id: 'apex', name: 'Apex Engineering', short: 'Apex Eng.', x: 120, y: 440, score: 92, status: '#10B981' },
  { id: 'bharat', name: 'Bharat Components', short: 'Bharat', x: 300, y: 440, score: 81, status: '#F59E0B' },
  { id: 'precision', name: 'Precision Works', short: 'Precision', x: 480, y: 440, score: 74, status: '#F59E0B' },
  { id: 'shree', name: 'Shree Industries', short: 'Shree Ind.', x: 660, y: 440, score: null, status: '#EF4444' },
];

const relations: Record<string, { matched: string[], gaps: string[] }> = {
  apex: {
    matched: ['mfg', 'tech', 'qual', 'cap', 'exp', 'com'],
    gaps: []
  },
  bharat: {
    matched: ['mfg', 'tech', 'qual', 'exp'],
    gaps: ['cap', 'com']
  },
  precision: {
    matched: ['mfg', 'qual', 'cap', 'com'],
    gaps: ['tech', 'exp']
  },
  shree: {
    matched: ['mfg', 'tech', 'qual', 'cap', 'com'],
    gaps: ['exp'] // mandatory failure
  }
};

export default function CapabilityGraph({ initialSupplierId }: { initialSupplierId?: string | null }) {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(initialSupplierId || null);

  return (
    <div className="p-8 animate-fade-in w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-xs font-bold tracking-[0.1em] px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">
            CONCEPTUAL MODEL
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-1 text-gray-900 tracking-tight">
          Capability Graph
        </h1>
        <p className="text-sm text-gray-500">
          The intelligence layer that maps supplier capabilities to RFQ requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Graph canvas */}
        <div className="xl:col-span-2 rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 relative flex flex-col">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between z-10 bg-gray-900">
            <div>
              <span className="text-sm font-semibold text-white">Supplier Capability Network</span>
              <span className="text-xs ml-3 text-gray-400">Querying live matching graph</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <span className="text-xs text-indigo-400">Demo Dataset</span>
            </div>
          </div>

          <div className="relative flex-1" style={{ minHeight: 520 }}>
            <svg width="100%" height="100%" viewBox="0 0 780 500" preserveAspectRatio="xMidYMid meet">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5" />
                </pattern>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#818CF8" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Category to supplier lines */}
              {suppliers.map(sup => {
                const isSelected = selectedSupplier === sup.id;
                const isDimmed = selectedSupplier !== null && !isSelected;
                
                return categories.map(cat => {
                  const isMatched = relations[sup.id].matched.includes(cat.id);
                  const isGap = relations[sup.id].gaps.includes(cat.id);
                  
                  if (!isMatched && !isGap) return null;

                  if (isDimmed) return null; // hide lines of unselected suppliers completely to reduce noise

                  if (isGap && isSelected) {
                    return (
                      <line
                        key={`${sup.id}-${cat.id}`}
                        x1={cat.x} y1={cat.y}
                        x2={sup.x} y2={sup.y}
                        stroke="#EF4444" strokeWidth="1.5"
                        strokeDasharray="6 4"
                        strokeOpacity="0.8"
                      />
                    );
                  }

                  if (isMatched) {
                    return (
                      <line
                        key={`${sup.id}-${cat.id}`}
                        x1={cat.x} y1={cat.y}
                        x2={sup.x} y2={sup.y}
                        stroke={isSelected ? sup.status : '#4B5563'} 
                        strokeWidth={isSelected ? "1.5" : "1"}
                        strokeOpacity={isSelected ? "0.6" : "0.3"}
                      />
                    );
                  }
                  
                  return null;
                });
              })}

              {/* Center to category lines */}
              {categories.map(cat => {
                const isDimmed = selectedSupplier !== null && !relations[selectedSupplier].matched.includes(cat.id) && !relations[selectedSupplier].gaps.includes(cat.id);
                return (
                  <line
                    key={cat.id}
                    x1={centerX} y1={centerY}
                    x2={cat.x} y2={cat.y}
                    stroke="#6366F1" strokeWidth="1"
                    strokeDasharray="5 4" strokeOpacity={isDimmed ? "0.1" : "0.4"}
                  />
                );
              })}

              {/* RFQ QUERY arrow pointing to center graph */}
              <line 
                x1={centerX} y1={54} 
                x2={centerX} y2={centerY - 52 - 4} 
                stroke="#818CF8" strokeWidth="2" 
                strokeDasharray="6 4"
                strokeOpacity="0.8"
                markerEnd="url(#arrowhead)"
              />

              {/* Center node — CAPABILITY GRAPH */}
              <g>
                <circle cx={centerX} cy={centerY} r={52} fill="#111827" stroke="#6366F1" strokeWidth="1.5" />
                <circle cx={centerX} cy={centerY} r={44} fill="#1F2937" stroke="#374151" strokeWidth="1" />
                <text x={centerX} y={centerY - 10} textAnchor="middle" fill="#818CF8" fontSize="9" fontWeight="700" letterSpacing="1">
                  CAPABILITY
                </text>
                <text x={centerX} y={centerY + 6} textAnchor="middle" fill="#818CF8" fontSize="9" fontWeight="700" letterSpacing="1">
                  GRAPH
                </text>
                <text x={centerX} y={centerY + 22} textAnchor="middle" fill="#9CA3AF" fontSize="8">
                  QistonPe
                </text>
              </g>

              {/* Category nodes */}
              {categories.map(cat => {
                const isDimmed = selectedSupplier !== null && !relations[selectedSupplier].matched.includes(cat.id) && !relations[selectedSupplier].gaps.includes(cat.id);
                const isHovered = hoveredCat === cat.id;
                const isGap = selectedSupplier !== null && relations[selectedSupplier].gaps.includes(cat.id);

                return (
                  <g
                    key={cat.id}
                    onMouseEnter={() => setHoveredCat(cat.id)}
                    onMouseLeave={() => setHoveredCat(null)}
                    style={{ cursor: 'pointer', opacity: isDimmed ? 0.3 : 1 }}
                  >
                    <circle
                      cx={cat.x} cy={cat.y} r={34}
                      fill={isHovered ? '#374151' : '#1F2937'}
                      stroke={isGap ? '#EF4444' : (isHovered ? '#818CF8' : '#4B5563')}
                      strokeWidth={isGap ? "2" : "1.5"}
                      strokeDasharray={isGap ? "4 2" : "none"}
                    />
                    <text x={cat.x} y={cat.y - 4} textAnchor="middle" fill="#F3F4F6" fontSize="9" fontWeight="600">
                      {cat.label}
                    </text>
                    <text x={cat.x} y={cat.y + 10} textAnchor="middle" fill="#9CA3AF" fontSize="8">
                      {cat.count} data pts
                    </text>
                  </g>
                );
              })}

              {/* Supplier nodes */}
              {suppliers.map(sup => {
                const isSelected = selectedSupplier === sup.id;
                const isDimmed = selectedSupplier !== null && !isSelected;

                return (
                  <g 
                    key={sup.id} 
                    onClick={() => setSelectedSupplier(sup.id)}
                    style={{ cursor: 'pointer', opacity: isDimmed ? 0.3 : 1, transition: 'opacity 0.2s' }}
                  >
                    <circle 
                      cx={sup.x} cy={sup.y} r={isSelected ? 28 : 24} 
                      fill="#111827" stroke={sup.status} strokeWidth={isSelected ? "2.5" : "1.5"} 
                      filter={isSelected ? `drop-shadow(0 0 8px ${sup.status}40)` : "none"}
                    />
                    <text x={sup.x} y={sup.y - 4} textAnchor="middle" fill="#F3F4F6" fontSize={isSelected ? "8" : "7.5"} fontWeight="600">
                      {sup.short}
                    </text>
                    {sup.score ? (
                      <text x={sup.x} y={sup.y + 9} textAnchor="middle" fill={sup.status} fontSize="9" fontWeight="700">
                        {sup.score}%
                      </text>
                    ) : (
                      <text x={sup.x} y={sup.y + 9} textAnchor="middle" fill={sup.status} fontSize="8" fontWeight="700">
                        NO-GO
                      </text>
                    )}
                  </g>
                );
              })}

              {/* RFQ QUERY Block */}
              <g>
                <rect x={centerX - 80} y={10} width={160} height={44} rx={6} fill="#312E81" stroke="#818CF8" strokeWidth="1.5" />
                <circle cx={centerX - 60} cy={32} r={3} fill="#818CF8" />
                <text x={centerX - 50} y={35} fill="#818CF8" fontSize="9" fontWeight="700" letterSpacing="0.5">
                  RFQ QUERY
                </text>
                <text x={centerX} y={22} textAnchor="middle" fill="#F3F4F6" fontSize="10" fontWeight="600">
                  Automotive Bracket
                </text>
              </g>

              {/* Legend */}
              <g transform="translate(20, 20)">
                {[
                  { color: '#10B981', label: 'Full Match' },
                  { color: '#F59E0B', label: 'Partial Match' },
                  { color: '#EF4444', label: 'No-Go' },
                ].map((item, i) => (
                  <g key={item.label} transform={`translate(${i * 110}, 0)`}>
                    <circle cx={6} cy={6} r={4} fill={item.color} fillOpacity="0.3" stroke={item.color} strokeWidth="1.5" />
                    <text x={15} y={10} fill="#9CA3AF" fontSize="9">{item.label}</text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Dynamic Sidebar */}
        <div className="space-y-4">
          {!selectedSupplier ? (
            <DefaultSidebar />
          ) : selectedSupplier === 'apex' ? (
            <ApexSidebar onBack={() => setSelectedSupplier(null)} />
          ) : selectedSupplier === 'bharat' ? (
            <BharatSidebar onBack={() => setSelectedSupplier(null)} />
          ) : selectedSupplier === 'shree' ? (
            <ShreeSidebar onBack={() => setSelectedSupplier(null)} />
          ) : (
            <PrecisionSidebar onBack={() => setSelectedSupplier(null)} />
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function DefaultSidebar() {
  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold text-sm mb-3 text-gray-900">Data Sources</h3>
        <div className="space-y-2.5">
          {[
            { label: 'OpportunityX', desc: 'Tender participation, bids and wins', bgClass: 'bg-indigo-500' },
            { label: 'MetalCapital', desc: 'Orders and purchase orders', bgClass: 'bg-emerald-500' },
            { label: 'Certifications', desc: 'ISO, quality, compliance records', bgClass: 'bg-amber-500' },
            { label: 'SME Profiles', desc: 'Verified supplier capability data', bgClass: 'bg-purple-500' },
          ].map(s => (
            <div key={s.label} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${s.bgClass}`} />
              <div>
                <div className="text-xs font-semibold text-gray-900">{s.label}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold text-sm mb-3 text-gray-900">Example Relationship Path</h3>
        <div className="space-y-2">
          {[
            { label: 'RFQ', sub: 'Automotive Bracket Assembly', bgClass: 'bg-indigo-500' },
            { label: 'Requirement', sub: 'CNC Machining Capability', bgClass: 'bg-purple-500' },
            { label: 'Capability', sub: 'Technical Domain', bgClass: 'bg-amber-500' },
            { label: 'Supplier', sub: 'Apex Engineering', bgClass: 'bg-emerald-500' },
            { label: 'Evidence', sub: 'Full CNC suite — OpportunityX', bgClass: 'bg-emerald-500' },
          ].map((node, i) => (
            <div key={i}>
              <div className="flex items-center gap-2.5 py-1.5">
                <div className={`w-2 h-2 rounded-full shrink-0 ${node.bgClass}`} />
                <div>
                  <span className="text-xs font-semibold text-gray-700">{node.label}</span>
                  <span className="text-xs ml-1.5 text-gray-400">— {node.sub}</span>
                </div>
              </div>
              {i < 4 && (
                <div className="ml-0.5 w-px h-3 ml-1 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold text-sm mb-3 text-gray-900">Graph Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: '61', label: 'Total data points' },
            { value: '4', label: 'Suppliers represented' },
            { value: '6', label: 'Capability domains' },
            { value: '6', label: 'RFQ requirements' },
          ].map(s => (
            <div key={s.label} className="rounded-lg p-3 bg-gray-50">
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ApexSidebar({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-lg shadow-emerald-900/5 h-full relative">
      <button onClick={onBack} className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
        &larr; Back to overview
      </button>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Apex Engineering</h2>
        <div className="flex items-end gap-3 mt-2">
          <span className="text-4xl font-black text-gray-900 leading-none tracking-tight">92%</span>
          <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase tracking-wider mb-1">
            Full Match
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Capability Profile</h3>
        <div className="space-y-2">
          {[
            { cat: 'Organisation Structure & Health', val: 95 },
            { cat: 'Policies & Practices', val: 88 },
            { cat: 'Operations — Technical Capacity', val: 94 },
            { cat: 'Financial Details', val: 86 },
            { cat: 'Certifications', val: 97 },
            { cat: 'Customer Concentration & Revenue Mix', val: 78 },
          ].map(stat => (
            <div key={stat.cat} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 w-28">{stat.cat}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full mx-3 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${stat.val}%` }} />
              </div>
              <span className="text-sm font-semibold text-gray-900">{stat.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">6 / 6 Requirements Matched</h3>
        <ul className="space-y-2.5">
          {[
            'CNC Machining',
            'ISO 9001',
            '3+ Years Experience',
            'Production Capacity',
            'OEM Experience',
            'Delivery terms',
          ].map((req, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#10B981" fillOpacity="0.2" />
                <path d="M5 8l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {req}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BharatSidebar({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-lg shadow-amber-900/5 h-full relative">
      <button onClick={onBack} className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
        &larr; Back to overview
      </button>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Bharat Components</h2>
        <div className="flex items-end gap-3 mt-2">
          <span className="text-4xl font-black text-gray-900 leading-none tracking-tight">81%</span>
          <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded uppercase tracking-wider mb-1">
            Partial Match
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">5 / 6 Requirements Matched</h3>
        <p className="text-xs text-gray-500 mb-4">Supplier meets technical requirements but exhibits operational gaps based on MetalCapital data.</p>
        
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-red-50 border border-red-100">
            <div className="flex items-center gap-1.5 mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span className="text-xs font-bold text-red-700 uppercase">Production Capacity Gap</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-500">Required:</span><br/><span className="font-semibold text-gray-900">10,000 units/mo</span></div>
              <div><span className="text-gray-500">Supplier:</span><br/><span className="font-semibold text-gray-900">7,500 units/mo</span></div>
            </div>
            <div className="mt-2 pt-2 border-t border-red-200/50 text-xs font-bold text-red-600">GAP: 2,500 units/mo</div>
          </div>

          <div className="p-3 rounded-lg bg-red-50 border border-red-100">
            <div className="flex items-center gap-1.5 mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span className="text-xs font-bold text-red-700 uppercase">Delivery Gap</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-500">Required:</span><br/><span className="font-semibold text-gray-900">≤30 days</span></div>
              <div><span className="text-gray-500">Supplier:</span><br/><span className="font-semibold text-gray-900">45 days avg</span></div>
            </div>
            <div className="mt-2 pt-2 border-t border-red-200/50 text-xs font-bold text-red-600">GAP: 15 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShreeSidebar({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-5 shadow-lg shadow-red-900/5 h-full relative">
      <button onClick={onBack} className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
        &larr; Back to overview
      </button>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Shree Industries</h2>
        <div className="flex items-end gap-3 mt-2">
          <span className="text-4xl font-black text-gray-900 leading-none tracking-tight">—</span>
          <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-700 rounded uppercase tracking-wider mb-1">
            No-Go
          </span>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
        <div className="flex items-start gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          <div>
            <h3 className="text-sm font-bold text-red-900">Supplier failed a mandatory requirement.</h3>
            <p className="text-xs text-red-700 mt-1">Mandatory requirements are evaluated as GO / NO-GO prior to scoring.</p>
          </div>
        </div>
        
        <div className="bg-white rounded p-3 border border-red-100 mt-4">
          <div className="text-xs font-bold text-gray-900 uppercase mb-2">Minimum 3 years experience</div>
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div><span className="text-gray-500">Required:</span><br/><span className="font-semibold text-gray-900">≥ 3 years</span></div>
            <div><span className="text-gray-500">Supplier:</span><br/><span className="font-semibold text-red-600">2 years</span></div>
          </div>
          <div className="text-xs font-bold text-red-600 pt-2 border-t border-red-50">
            RESULT: NOT ELIGIBLE
          </div>
        </div>
      </div>
    </div>
  );
}

function PrecisionSidebar({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-lg shadow-amber-900/5 h-full relative">
      <button onClick={onBack} className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
        &larr; Back to overview
      </button>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Precision Works</h2>
        <div className="flex items-end gap-3 mt-2">
          <span className="text-4xl font-black text-gray-900 leading-none tracking-tight">74%</span>
          <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded uppercase tracking-wider mb-1">
            Partial Match
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">4 / 6 Requirements Matched</h3>
        <p className="text-xs text-gray-500 mb-4">Supplier has quality gaps detected via certification history.</p>
        
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-1.5 mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span className="text-xs font-bold text-amber-700 uppercase">Certification Expired</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-500">Required:</span><br/><span className="font-semibold text-gray-900">Active ISO 9001</span></div>
              <div><span className="text-gray-500">Supplier:</span><br/><span className="font-semibold text-gray-900">Expired 2023</span></div>
            </div>
            <div className="mt-2 pt-2 border-t border-amber-200/50 text-xs font-bold text-amber-600">GAP: Compliance Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
