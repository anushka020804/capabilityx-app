import { useEffect, useState } from 'react';
import { rfq, suppliers } from './mockData';

/**
 * Tiny shared store for buyer ⇄ vendor RFQ invitations.
 * Persisted in localStorage so that the buyer and vendor views stay in sync —
 * even across browser tabs (via the `storage` event).
 */

export type InviteStatus = 'sent' | 'viewed' | 'accepted' | 'countered' | 'declined';
export type Audience = 'buyer' | 'vendor';

export interface InviteEvent {
  status: InviteStatus;
  at: number;
  note?: string;
}

export interface Invite {
  id: string;
  supplierId: string;
  supplierName: string;
  rfqId: string;
  rfqName: string;
  customer: string;
  quantity: string;
  delivery: string;
  dueDate: string;
  message: string;
  status: InviteStatus;
  sentAt: number;
  quotePrice?: string;
  leadTime?: string;
  vendorNote?: string;
  history: InviteEvent[];
}

export interface AppNotification {
  id: string;
  audience: Audience;
  supplierId?: string;
  inviteId?: string;
  kind: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  body: string;
  at: number;
  read: boolean;
}

interface StoreState {
  invites: Invite[];
  notifications: AppNotification[];
  shortlisted: string[];
}

const KEY = 'cx_rfq_store_v1';
const VENDOR_KEY = 'cx_vendor_id';
const EVT = 'cx-store-change';

const uid = () => Math.random().toString(36).slice(2, 10);
const HOUR = 3600_000;

function seed(): StoreState {
  const now = Date.now();
  const mk = (p: Partial<Invite> & Pick<Invite, 'supplierId' | 'rfqId' | 'rfqName' | 'customer' | 'status'>): Invite => {
    const s = suppliers.find((x) => x.id === p.supplierId)!;
    return {
      id: uid(),
      supplierName: s.name,
      quantity: '5,000 units / month',
      delivery: '≤ 45 days',
      dueDate: new Date(now + 6 * 24 * HOUR).toISOString().slice(0, 10),
      message: '',
      sentAt: now - 30 * HOUR,
      history: [{ status: 'sent', at: now - 30 * HOUR }],
      ...p,
    } as Invite;
  };
  return {
    shortlisted: [],
    notifications: [],
    invites: [
      mk({
        supplierId: 'apex',
        rfqId: 'RFQ-0987',
        rfqName: 'Machined Steering Knuckles',
        customer: 'Orion Motors Ltd',
        quantity: '4,000 units / month',
        status: 'viewed',
        message: 'Looking for a long-term partner for our new EV platform. Please share tooling cost separately.',
        history: [
          { status: 'sent', at: now - 52 * HOUR },
          { status: 'viewed', at: now - 50 * HOUR },
        ],
        sentAt: now - 52 * HOUR,
      }),
      mk({
        supplierId: 'apex',
        rfqId: 'RFQ-0911',
        rfqName: 'Hydraulic Pump Housings',
        customer: 'Vega Industrial',
        quantity: '2,500 units / month',
        delivery: '≤ 60 days',
        status: 'accepted',
        quotePrice: '₹ 412 / unit',
        leadTime: '35 days',
        message: '',
        sentAt: now - 9 * 24 * HOUR,
        history: [
          { status: 'sent', at: now - 9 * 24 * HOUR },
          { status: 'viewed', at: now - 9 * 24 * HOUR + 2 * HOUR },
          { status: 'accepted', at: now - 8 * 24 * HOUR },
        ],
      }),
      mk({
        supplierId: 'bharat',
        rfqId: 'RFQ-0987',
        rfqName: 'Machined Steering Knuckles',
        customer: 'Orion Motors Ltd',
        status: 'sent',
      }),
    ],
  };
}

function read(): StoreState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  const s = seed();
  localStorage.setItem(KEY, JSON.stringify(s));
  return s;
}

function write(next: StoreState) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVT));
}

function update(fn: (s: StoreState) => StoreState) {
  write(fn(read()));
}

/* ───────────── hooks ───────────── */

export function useStore(): StoreState {
  const [state, setState] = useState<StoreState>(read);
  useEffect(() => {
    const sync = () => setState(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY || e.key === VENDOR_KEY) sync();
    };
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return state;
}

export function useVendorId(): [string, (id: string) => void] {
  const [id, setId] = useState(() => localStorage.getItem(VENDOR_KEY) || 'apex');
  useEffect(() => {
    const sync = () => setId(localStorage.getItem(VENDOR_KEY) || 'apex');
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return [
    id,
    (next: string) => {
      localStorage.setItem(VENDOR_KEY, next);
      window.dispatchEvent(new Event(EVT));
    },
  ];
}

export function setVendorId(id: string) {
  localStorage.setItem(VENDOR_KEY, id);
  window.dispatchEvent(new Event(EVT));
}

/* ───────────── actions ───────────── */

function notify(s: StoreState, n: Omit<AppNotification, 'id' | 'at' | 'read'>): StoreState {
  return {
    ...s,
    notifications: [{ ...n, id: uid(), at: Date.now(), read: false }, ...s.notifications].slice(0, 50),
  };
}

export function toggleShortlist(supplierId: string) {
  update((s) => ({
    ...s,
    shortlisted: s.shortlisted.includes(supplierId)
      ? s.shortlisted.filter((x) => x !== supplierId)
      : [...s.shortlisted, supplierId],
  }));
}

export function sendInvite(supplierId: string, opts: { dueDate: string; message: string }) {
  const sup = suppliers.find((x) => x.id === supplierId)!;
  const now = Date.now();
  const invite: Invite = {
    id: uid(),
    supplierId,
    supplierName: sup.name,
    rfqId: rfq.id,
    rfqName: rfq.name,
    customer: rfq.customer,
    quantity: rfq.quantity,
    delivery: rfq.delivery,
    dueDate: opts.dueDate,
    message: opts.message,
    status: 'sent',
    sentAt: now,
    history: [{ status: 'sent', at: now }],
  };
  update((s) => {
    let next: StoreState = {
      ...s,
      invites: [invite, ...s.invites.filter((i) => !(i.supplierId === supplierId && i.rfqId === rfq.id))],
    };
    next = notify(next, {
      audience: 'vendor',
      supplierId,
      inviteId: invite.id,
      kind: 'info',
      title: 'New RFQ received',
      body: `${rfq.customer} invited you to quote on ${rfq.name} (${rfq.id}).`,
    });
    return next;
  });
  return invite;
}

export function markViewed(inviteId: string) {
  update((s) => {
    const inv = s.invites.find((i) => i.id === inviteId);
    if (!inv || inv.status !== 'sent') return s;
    let next: StoreState = {
      ...s,
      invites: s.invites.map((i) =>
        i.id === inviteId ? { ...i, status: 'viewed', history: [...i.history, { status: 'viewed', at: Date.now() }] } : i,
      ),
    };
    if (inv.rfqId === rfq.id) {
      next = notify(next, {
        audience: 'buyer',
        supplierId: inv.supplierId,
        inviteId,
        kind: 'info',
        title: 'RFQ viewed',
        body: `${inv.supplierName} opened your RFQ ${inv.rfqId}.`,
      });
    }
    return next;
  });
}

export function respondToInvite(
  inviteId: string,
  status: 'accepted' | 'countered' | 'declined',
  details: { quotePrice?: string; leadTime?: string; note?: string } = {},
) {
  update((s) => {
    const inv = s.invites.find((i) => i.id === inviteId);
    if (!inv) return s;
    const now = Date.now();
    const history: InviteEvent[] = [...inv.history];
    if (!history.some((h) => h.status === 'viewed')) history.push({ status: 'viewed', at: now });
    history.push({ status, at: now, note: details.note });
    let next: StoreState = {
      ...s,
      invites: s.invites.map((i) =>
        i.id === inviteId
          ? { ...i, status, history, quotePrice: details.quotePrice, leadTime: details.leadTime, vendorNote: details.note }
          : i,
      ),
    };
    const copy = {
      accepted: { kind: 'success' as const, title: 'Vendor accepted your RFQ', body: `${inv.supplierName} agreed to the terms${details.quotePrice ? ` at ${details.quotePrice}` : ''}.` },
      countered: { kind: 'warning' as const, title: 'Vendor sent a counter-offer', body: `${inv.supplierName} proposed revised terms${details.quotePrice ? ` — ${details.quotePrice}` : ''}.` },
      declined: { kind: 'danger' as const, title: 'Vendor declined your RFQ', body: `${inv.supplierName} won't be quoting on ${inv.rfqId}.` },
    }[status];
    next = notify(next, { audience: 'buyer', supplierId: inv.supplierId, inviteId, ...copy });
    return next;
  });
}

export function markAllRead(audience: Audience, supplierId?: string) {
  update((s) => ({
    ...s,
    notifications: s.notifications.map((n) =>
      n.audience === audience && (audience === 'buyer' || n.supplierId === supplierId) ? { ...n, read: true } : n,
    ),
  }));
}

export function resetDemo() {
  write(seed());
}

/* ───────────── helpers ───────────── */

export function notificationsFor(state: StoreState, audience: Audience, vendorId?: string) {
  return state.notifications.filter((n) => n.audience === audience && (audience === 'buyer' || n.supplierId === vendorId));
}

export function timeAgo(ts: number) {
  const d = Math.max(0, Date.now() - ts);
  const m = Math.floor(d / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export const statusMeta: Record<InviteStatus, { label: string; cls: string; dot: string }> = {
  sent: { label: 'New', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  viewed: { label: 'Viewed', cls: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  accepted: { label: 'Accepted', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  countered: { label: 'Counter-offer', cls: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  declined: { label: 'Declined', cls: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
};
