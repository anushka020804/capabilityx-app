import React, { useState } from 'react';
import { rfq } from '../data/mockData';
import {
  useStore,
  sendInvite,
  toggleShortlist,
  respondToInvite,
  markViewed,
  setVendorId,
  statusMeta,
  timeAgo,
  type InviteStatus,
} from '../data/rfqStore';

interface Props {
  supplierId: string;
  supplierName: string;
}

const STEPS: { key: string; label: string }[] = [
  { key: 'sent', label: 'RFQ sent' },
  { key: 'viewed', label: 'Viewed by vendor' },
  { key: 'response', label: 'Vendor response' },
];

export default function VendorEngagement({ supplierId, supplierName }: Props) {
  const store = useStore();
  const invite = store.invites.find((i) => i.supplierId === supplierId && i.rfqId === rfq.id);
  const liked = store.shortlisted.includes(supplierId);
  const [open, setOpen] = useState(false);

  const openVendorPortal = () => {
    setVendorId(supplierId);
    window.open(`${window.location.pathname}#vendor-dashboard`, '_blank');
  };

  const simulate = () => {
    if (!invite) return;
    markViewed(invite.id);
    setTimeout(
      () => respondToInvite(invite.id, 'accepted', { quotePrice: '₹ 248 / unit', leadTime: '24 days', note: 'Happy to proceed. Capacity reserved for Q1.' }),
      1200,
    );
  };

  const stepIndex = !invite ? -1 : invite.status === 'sent' ? 0 : invite.status === 'viewed' ? 1 : 2;
  const responded = invite && ['accepted', 'countered', 'declined'].includes(invite.status);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white mb-6 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-indigo-50/60 via-white to-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Vendor Engagement</div>
              <div className="text-xs text-gray-500">{rfq.id} · {rfq.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="shortlist-toggle"
              onClick={() => toggleShortlist(supplierId)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
                liked ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={liked ? 'animate-[pop_0.3s_ease]' : ''}>
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              {liked ? 'Shortlisted' : 'Shortlist'}
            </button>

            {!invite && (
              <button
                id="send-rfq-btn"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
              >
                Invite to Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        {!invite ? (
          <div className="px-6 py-6 flex items-center gap-4 text-sm text-gray-500">
            <div className="w-10 h-10 rounded-full bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <p>
              Like what you see? Invite <strong className="text-gray-800">{supplierName}</strong> to quote. They'll be notified instantly in their vendor portal and you'll get a notification the moment they respond.
            </p>
          </div>
        ) : (
          <div className="px-6 py-6">
            {/* Stepper */}
            <div className="flex items-center mb-6">
              {STEPS.map((s, i) => {
                const done = i <= stepIndex;
                const isResp = s.key === 'response';
                const respStatus = isResp && responded ? (invite.status as InviteStatus) : null;
                const color =
                  respStatus === 'declined' ? 'bg-red-500' : respStatus === 'countered' ? 'bg-amber-500' : done ? 'bg-emerald-500' : 'bg-gray-200';
                const ev = invite.history.find((h) => (isResp ? ['accepted', 'countered', 'declined'].includes(h.status) : h.status === s.key));
                return (
                  <React.Fragment key={s.key}>
                    <div className="flex flex-col items-center text-center min-w-[110px]">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-500 ${color} ${i === stepIndex + 1 ? 'ring-4 ring-indigo-100 bg-indigo-500 animate-pulse' : ''}`}>
                        {done ? (respStatus === 'declined' ? '✕' : '✓') : i + 1}
                      </div>
                      <div className={`text-xs font-semibold mt-2 ${done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {respStatus ? statusMeta[respStatus].label : s.label}
                      </div>
                      <div className="text-[11px] text-gray-400 h-4">{ev ? timeAgo(ev.at) : i === stepIndex + 1 ? 'waiting…' : ''}</div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-200 -mt-8 mx-1 rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: i < stepIndex ? '100%' : '0%' }} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Response card */}
            {responded ? (
              <div
                className={`rounded-xl border p-5 animate-fade-in ${
                  invite.status === 'accepted' ? 'border-emerald-200 bg-emerald-50/60' : invite.status === 'countered' ? 'border-amber-200 bg-amber-50/60' : 'border-red-200 bg-red-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold tracking-wider uppercase px-2 py-1 rounded-md border ${statusMeta[invite.status].cls}`}>
                    {statusMeta[invite.status].label}
                  </span>
                  <span className="text-xs text-gray-500">{timeAgo(invite.history[invite.history.length - 1].at)}</span>
                </div>
                {invite.status !== 'declined' && (
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5">Quoted price</div>
                      <div className="text-lg font-bold text-gray-900">{invite.quotePrice || '—'}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5">Lead time</div>
                      <div className="text-lg font-bold text-gray-900">{invite.leadTime || '—'}</div>
                    </div>
                  </div>
                )}
                {invite.vendorNote && <p className="text-sm text-gray-700 italic">“{invite.vendorNote}”</p>}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-indigo-900">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
                  </span>
                  Awaiting response from {supplierName} · due {invite.dueDate}
                </div>
                <button onClick={simulate} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline-offset-2 hover:underline">
                  Simulate response
                </button>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Sent {timeAgo(invite.sentAt)}</span>
              <button
                id="open-vendor-portal"
                onClick={openVendorPortal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-colors"
              >
                See vendor's view
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {open && <InviteModal supplierName={supplierName} onClose={() => setOpen(false)} onSend={(d) => { sendInvite(supplierId, d); setOpen(false); }} />}
    </>
  );
}

function InviteModal({ supplierName, onClose, onSend }: { supplierName: string; onClose: () => void; onSend: (d: { dueDate: string; message: string }) => void }) {
  const [dueDate, setDueDate] = useState(() => new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [message, setMessage] = useState(`Hi ${supplierName} team, based on your capability profile we'd like to invite you to quote for ${rfq.name}. Please confirm pricing and lead time.`);
  const [sending, setSending] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in-fast" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="text-[11px] font-bold tracking-[0.14em] text-indigo-600 mb-1">INVITE TO QUOTE</div>
          <h3 className="text-lg font-bold text-gray-900">Send {rfq.id} to {supplierName}</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              ['Part', rfq.name],
              ['Quantity', rfq.quantity],
              ['Delivery', rfq.delivery],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                <div className="text-gray-400 mb-0.5">{k}</div>
                <div className="font-semibold text-gray-800 leading-snug">{v}</div>
              </div>
            ))}
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-gray-700">Quote due by</span>
            <input id="invite-due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-700">Message to vendor</span>
            <textarea id="invite-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
          </label>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">Cancel</button>
          <button
            id="invite-send"
            disabled={sending}
            onClick={() => { setSending(true); setTimeout(() => onSend({ dueDate, message }), 700); }}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70 inline-flex items-center gap-2"
          >
            {sending && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {sending ? 'Sending…' : 'Send invitation'}
          </button>
        </div>
      </div>
    </div>
  );
}
