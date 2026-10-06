import React, { useEffect, useRef, useState } from 'react';
import { useStore, useVendorId, notificationsFor, markAllRead, timeAgo, type Audience, type AppNotification } from '../data/rfqStore';

const kindStyle: Record<AppNotification['kind'], { icon: string; ring: string; text: string }> = {
  info: { icon: '✉', ring: 'bg-indigo-500/20', text: 'text-indigo-300' },
  success: { icon: '✓', ring: 'bg-emerald-500/20', text: 'text-emerald-400' },
  warning: { icon: '⇄', ring: 'bg-amber-500/20', text: 'text-amber-300' },
  danger: { icon: '✕', ring: 'bg-red-500/20', text: 'text-red-400' },
};

/** Pops a toast whenever a new notification arrives for the current audience. */
export function Toaster({ audience }: { audience: Audience }) {
  const store = useStore();
  const [vendorId] = useVendorId();
  const list = notificationsFor(store, audience, vendorId);
  const seen = useRef<Set<string> | null>(null);
  const identity = useRef('');
  const [toasts, setToasts] = useState<AppNotification[]>([]);

  useEffect(() => {
    const id = `${audience}:${vendorId}`;
    if (!seen.current || identity.current !== id) {
      identity.current = id;
      seen.current = new Set(list.map((n) => n.id));
      setToasts([]);
      return;
    }
    const fresh = list.filter((n) => !seen.current!.has(n.id));
    if (!fresh.length) return;
    fresh.forEach((n) => seen.current!.add(n.id));
    setToasts((t) => [...fresh, ...t].slice(0, 3));
    fresh.forEach((n) => setTimeout(() => setToasts((t) => t.filter((x) => x.id !== n.id)), 5500));
  }, [list.map((n) => n.id).join(), audience, vendorId]);

  return (
    <div className="fixed top-5 right-5 z-[70] flex flex-col gap-3 w-[340px] pointer-events-none">
      {toasts.map((n) => {
        const k = kindStyle[n.kind];
        return (
          <div key={n.id} className="pointer-events-auto animate-slide-left bg-gray-900/95 backdrop-blur text-white px-4 py-3.5 rounded-xl shadow-2xl flex items-start gap-3 border border-white/10">
            <div className={`w-8 h-8 rounded-full ${k.ring} ${k.text} flex items-center justify-center shrink-0 font-bold`}>{k.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold">{n.title}</div>
              <div className="text-xs text-gray-400 leading-snug mt-0.5">{n.body}</div>
            </div>
            <button onClick={() => setToasts((t) => t.filter((x) => x.id !== n.id))} className="text-gray-500 hover:text-white text-xs">✕</button>
          </div>
        );
      })}
    </div>
  );
}

/** Sidebar bell with unread badge and dropdown panel. */
export function NotificationBell({ audience }: { audience: Audience }) {
  const store = useStore();
  const [vendorId] = useVendorId();
  const list = notificationsFor(store, audience, vendorId);
  const unread = list.filter((n) => !n.read).length;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id="notifications-bell"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${open ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
      >
        <span className="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={unread ? 'animate-[wiggle_1s_ease-in-out_2]' : ''}>
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </span>
        Notifications
        {unread > 0 && <span className="ml-auto min-w-[20px] h-5 px-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">{unread}</span>}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-full top-0 ml-3 z-50 w-[360px] rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden animate-fade-in-fast">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="text-sm font-bold text-gray-900">Notifications</div>
              {unread > 0 && (
                <button onClick={() => markAllRead(audience, vendorId)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Mark all read</button>
              )}
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {list.length === 0 && <div className="px-4 py-10 text-center text-sm text-gray-400">No notifications yet.</div>}
              {list.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-gray-50 flex gap-3 ${n.read ? '' : 'bg-indigo-50/40'}`}>
                  <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.kind === 'success' ? 'bg-emerald-500' : n.kind === 'warning' ? 'bg-amber-500' : n.kind === 'danger' ? 'bg-red-500' : 'bg-indigo-500'}`} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{n.title}</div>
                    <div className="text-xs text-gray-500 leading-snug">{n.body}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{timeAgo(n.at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
