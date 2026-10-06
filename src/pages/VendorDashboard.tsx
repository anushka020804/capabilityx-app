import React, { useEffect, useMemo, useState } from 'react';
import { rfq as currentRfq, suppliers } from '../data/mockData';
import {
  useStore,
  useVendorId,
  markViewed,
  respondToInvite,
  resetDemo,
  statusMeta,
  timeAgo,
  type Invite,
} from '../data/rfqStore';

type Filter = 'all' | 'open' | 'responded';

export default function VendorDashboard() {
  const store = useStore();
  const [vendorId, setVendorId] = useVendorId();
  const vendor = suppliers.find((s) => s.id === vendorId) ?? suppliers[0];
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      resetDemo();
    };
  }, []);

  const invites = useMemo(
    () => store.invites.filter((i) => i.supplierId === vendor.id).sort((a, b) => b.sentAt - a.sentAt),
    [store.invites, vendor.id],
  );
  const visible = invites.filter((i) =>
    filter === 'all' ? true : filter === 'open' ? i.status === 'sent' || i.status === 'viewed' : !['sent', 'viewed'].includes(i.status),
  );
  const selected = invites.find((i) => i.id === selectedId) ?? visible[0] ?? null;

  useEffect(() => {
    if (selected && selected.status === 'sent') markViewed(selected.id);
  }, [selected?.id, selected?.status]);

  const open = invites.filter((i) => i.status === 'sent' || i.status === 'viewed').length;
  const fresh = invites.filter((i) => i.status === 'sent').length;
  const won = invites.filter((i) => i.status === 'accepted').length;
  const responded = invites.filter((i) => !['sent', 'viewed'].includes(i.status)).length;

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-8 w-full max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] px-3 py-1.5 rounded-full mb-3 bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VENDOR PORTAL
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {greet}, {vendor.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {fresh > 0 ? `You have ${fresh} new RFQ invitation${fresh > 1 ? 's' : ''} waiting for you.` : 'You’re all caught up. New invitations will appear here instantly.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Viewing as</label>
          <select
            id="vendor-switcher"
            value={vendor.id}
            onChange={(e) => { setVendorId(e.target.value); setSelectedId(null); }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button onClick={() => { resetDemo(); setSelectedId(null); }} title="Reset demo data" className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Kpi label="Open invitations" value={open} accent="indigo" hint={`${fresh} unread`} />
        <Kpi label="Responses sent" value={responded} accent="sky" hint="this quarter" />
        <Kpi label="Accepted" value={won} accent="emerald" hint={responded ? `${Math.round((won / responded) * 100)}% acceptance` : '—'} />
      </div>

      {/* Inbox + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
        {/* Inbox */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <div className="text-sm font-bold text-gray-900 mb-3">RFQ Inbox</div>
            <div className="flex gap-1 p-1 rounded-lg bg-gray-100">
              {(['all', 'open', 'responded'] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 text-xs font-semibold py-1.5 rounded-md capitalize transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-[560px] overflow-y-auto">
            {visible.length === 0 && <div className="px-5 py-12 text-center text-sm text-gray-400">No invitations here yet.</div>}
            {visible.map((inv) => {
              const active = selected?.id === inv.id;
              return (
                <button
                  key={inv.id}
                  onClick={() => setSelectedId(inv.id)}
                  className={`w-full text-left px-5 py-4 border-t border-gray-100 transition-colors relative ${active ? 'bg-indigo-50/60' : 'hover:bg-gray-50'}`}
                >
                  {active && <span className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r" />}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-gray-400">{inv.rfqId}</span>
                    <span className="text-[11px] text-gray-400">{timeAgo(inv.sentAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {inv.status === 'sent' && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                    <div className={`text-sm truncate ${inv.status === 'sent' ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>{inv.rfqName}</div>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-gray-500 truncate">{inv.customer}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${statusMeta[inv.status].cls}`}>{statusMeta[inv.status].label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail */}
        {selected ? <InviteDetail key={selected.id} invite={selected} vendorId={vendor.id} /> : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center text-sm text-gray-400">Select an invitation to view details.</div>
        )}
      </div>
    </div>
  );
}

function Kpi({ label, value, hint, accent }: { label: string; value: React.ReactNode; hint: string; accent: 'indigo' | 'sky' | 'emerald' | 'violet' }) {
  const bar = { indigo: 'from-indigo-500 to-indigo-300', sky: 'from-sky-500 to-sky-300', emerald: 'from-emerald-500 to-emerald-300', violet: 'from-violet-500 to-violet-300' }[accent];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 relative overflow-hidden hover:shadow-md transition-shadow">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bar}`} />
      <div className="text-xs font-medium uppercase tracking-[0.08em] text-gray-500">{label}</div>
      <div className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{hint}</div>
    </div>
  );
}

function InviteDetail({ invite, vendorId }: { invite: Invite; vendorId: string }) {
  const vendor = suppliers.find((s) => s.id === vendorId)!;
  const isCurrent = invite.rfqId === currentRfq.id;
  const requirements = isCurrent
    ? currentRfq.mandatory.map((r) => ({ label: r, ok: !(vendor.failedMandatory && vendor.failedMandatory.req === r) }))
    : [
        { label: 'ISO 9001 certification', ok: true },
        { label: 'CNC machining capability', ok: true },
        { label: 'Capacity ≥ requested volume', ok: true },
      ];
  const matchCount = requirements.filter((r) => r.ok).length;
  const responded = !['sent', 'viewed'].includes(invite.status);
  const daysLeft = Math.ceil((new Date(invite.dueDate).getTime() - Date.now()) / 86400000);

  const [mode, setMode] = useState<'accepted' | 'countered' | 'declined'>('accepted');
  const [price, setPrice] = useState('₹ 248 / unit');
  const [lead, setLead] = useState('24 days');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      respondToInvite(invite.id, mode, mode === 'declined' ? { note } : { quotePrice: price, leadTime: lead, note });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden animate-fade-in-fast">
      {/* Header */}
      <div className="px-7 py-6 border-b border-gray-100 bg-gradient-to-br from-indigo-50/70 via-white to-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-gray-500">{invite.rfqId}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${statusMeta[invite.status].cls}`}>{statusMeta[invite.status].label}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{invite.rfqName}</h2>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center">{invite.customer[0]}</span>
              {invite.customer}
            </div>
          </div>
          {!responded && (
            <div className={`text-right rounded-xl px-4 py-2 border ${daysLeft <= 2 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
              <div className={`text-2xl font-extrabold ${daysLeft <= 2 ? 'text-red-600' : 'text-gray-900'}`}>{Math.max(daysLeft, 0)}d</div>
              <div className="text-[11px] text-gray-500">left to respond</div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            ['Quantity', invite.quantity],
            ['Delivery', invite.delivery],
            ['Quote due', invite.dueDate],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white border border-gray-200 px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-gray-400">{k}</div>
              <div className="text-sm font-semibold text-gray-900 mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-7 py-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: message + match */}
        <div className="space-y-5">
          {invite.message && (
            <div>
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Message from buyer</div>
              <div className="rounded-2xl rounded-tl-sm bg-gray-50 border border-gray-100 p-4 text-sm text-gray-700 leading-relaxed">{invite.message}</div>
            </div>
          )}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase">Your fit for this RFQ</div>
              <span className={`text-xs font-bold ${matchCount === requirements.length ? 'text-emerald-600' : 'text-amber-600'}`}>{matchCount}/{requirements.length} met</span>
            </div>
            <div className="space-y-2">
              {requirements.map((r) => (
                <div key={r.label} className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${r.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{r.ok ? '✓' : '✕'}</span>
                  <span className="text-sm text-gray-700">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Activity</div>
            <ol className="relative border-l border-gray-200 ml-2 space-y-3">
              {invite.history.map((h, i) => (
                <li key={i} className="ml-4">
                  <span className={`absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full ${statusMeta[h.status].dot}`} />
                  <div className="text-sm text-gray-800 font-medium">
                    {h.status === 'sent' ? `${invite.customer} sent the RFQ` : h.status === 'viewed' ? 'You opened the invitation' : `You ${statusMeta[h.status].label.toLowerCase()}`}
                  </div>
                  <div className="text-xs text-gray-400">{timeAgo(h.at)}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: response */}
        <div>
          {responded ? (
            <div className={`rounded-2xl border p-6 h-full ${invite.status === 'accepted' ? 'border-emerald-200 bg-emerald-50/60' : invite.status === 'countered' ? 'border-amber-200 bg-amber-50/60' : 'border-red-200 bg-red-50/60'}`}>
              <div className="w-11 h-11 rounded-full bg-white border border-current/10 flex items-center justify-center mb-4 shadow-sm">
                <span className={`text-lg ${invite.status === 'accepted' ? 'text-emerald-600' : invite.status === 'countered' ? 'text-amber-600' : 'text-red-600'}`}>
                  {invite.status === 'accepted' ? '✓' : invite.status === 'countered' ? '⇄' : '✕'}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {invite.status === 'accepted' ? 'You accepted this RFQ' : invite.status === 'countered' ? 'Counter-offer sent' : 'You declined this RFQ'}
              </div>
              <p className="text-sm text-gray-600 mt-1 mb-5">{invite.customer} has been notified.</p>
              {invite.status !== 'declined' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white border border-gray-200 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-gray-400">Price</div>
                    <div className="font-bold text-gray-900">{invite.quotePrice}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-gray-200 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-gray-400">Lead time</div>
                    <div className="font-bold text-gray-900">{invite.leadTime}</div>
                  </div>
                </div>
              )}
              {invite.vendorNote && <p className="text-sm text-gray-700 italic mt-4">“{invite.vendorNote}”</p>}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="text-sm font-bold text-gray-900 mb-3">Your response</div>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {([
                  ['accepted', 'Accept', 'peer-checked:bg-emerald-600', 'bg-emerald-600 text-white border-emerald-600'],
                  ['countered', 'Counter', '', 'bg-amber-500 text-white border-amber-500'],
                  ['declined', 'Decline', '', 'bg-gray-900 text-white border-gray-900'],
                ] as const).map(([k, label, , activeCls]) => (
                  <button
                    key={k}
                    id={`respond-${k}`}
                    onClick={() => setMode(k)}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${mode === k ? activeCls + ' shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {mode !== 'declined' && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-gray-600">{mode === 'countered' ? 'Proposed price' : 'Unit price'}</span>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-gray-600">Lead time</span>
                    <input value={lead} onChange={(e) => setLead(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                  </label>
                </div>
              )}
              <label className="block mb-5">
                <span className="text-xs font-semibold text-gray-600">{mode === 'declined' ? 'Reason (optional)' : 'Note to buyer'}</span>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={mode === 'declined' ? 'e.g. Capacity fully booked this quarter' : 'e.g. Capacity reserved, happy to share samples'}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </label>
              <button
                id="respond-submit"
                onClick={submit}
                disabled={submitting}
                className={`w-full py-3 rounded-xl text-sm font-bold text-white inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-70 ${
                  mode === 'accepted' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20' : mode === 'countered' ? 'bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20' : 'bg-gray-900 hover:bg-black'
                }`}
              >
                {submitting && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {mode === 'accepted' ? 'Accept & notify buyer' : mode === 'countered' ? 'Send counter-offer' : 'Decline invitation'}
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-2">{invite.customer} will be notified instantly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
