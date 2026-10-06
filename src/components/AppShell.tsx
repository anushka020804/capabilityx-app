import React from 'react';
import { suppliers } from '../data/mockData';
import { useVendorId } from '../data/rfqStore';
import { NotificationBell } from './NotificationCenter';

type Screen =
  | 'landing' | 'role-select' | 'buyer-dashboard' | 'float-rfq'
  | 'ai-analysis' | 'rfq-analysis' | 'shortlist' | 'supplier-apex' | 'supplier-bharat'
  | 'supplier-shree' | 'capability-graph' | 'fi-dashboard' | 'vendor-dashboard' | 'reports';

interface AppShellProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
  role: 'buyer' | 'fi' | 'vendor';
}

const navItems = [
  { id: 'buyer-dashboard', label: 'Overview', icon: GridIcon },
  { id: 'float-rfq', label: 'RFQs', icon: FileIcon },
  { id: 'shortlist', label: 'Suppliers', icon: UsersIcon },
];

const fiNavItems = [
  { id: 'fi-dashboard', label: 'Overview', icon: GridIcon },
  { id: 'shortlist', label: 'SME Network', icon: UsersIcon },
];

const vendorNavItems = [
  { id: 'vendor-dashboard', label: 'RFQ Inbox', icon: FileIcon },
];

export default function AppShell({ screen, onNavigate, children, role }: AppShellProps) {
  const items = role === 'fi' ? fiNavItems : role === 'vendor' ? vendorNavItems : navItems;
  const [vendorId] = useVendorId();
  const vendor = suppliers.find((s) => s.id === vendorId) ?? suppliers[0];
  const user =
    role === 'vendor'
      ? { initials: vendor.name.split(' ').map((w) => w[0]).join('').slice(0, 2), name: vendor.name, sub: 'Vendor' }
      : { initials: 'AM', name: 'Acme Manufacturing', sub: 'Procurement' };
  const activeBase = screen === 'supplier-apex' || screen === 'supplier-bharat' || screen === 'supplier-shree'
    ? 'shortlist'
    : screen === 'ai-analysis' || screen === 'rfq-analysis'
    ? 'float-rfq'
    : screen;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)]">
      {/* Sidebar */}
      <aside className="flex flex-col shrink-0 border-r border-gray-200 bg-white w-[228px]">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-lg w-[30px] h-[30px] bg-indigo-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9" />
                <circle cx="8" cy="8" r="2.5" fill="#4F46E5" />
              </svg>
            </div>
            <span className="font-bold tracking-wide text-sm text-gray-900 tracking-[0.06em]">
              CAPABILITYX
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeBase === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Screen)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 text-sm ${
                  active 
                    ? 'bg-indigo-50 text-indigo-600 font-medium' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-normal'
                }`}
              >
                <Icon size={16} active={active} />
                {item.label}
              </button>
            );
          })}
          {role !== 'fi' && (
            <div className="pt-3 mt-3 border-t border-gray-100">
              <NotificationBell audience={role === 'vendor' ? 'vendor' : 'buyer'} />
            </div>
          )}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center rounded-full text-xs font-semibold shrink-0 w-8 h-8 ${role === 'vendor' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
              {user.initials}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium truncate text-gray-900">{user.name}</div>
              <div className="text-xs truncate text-gray-500">{user.sub}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}

function GridIcon({ size = 16, active }: { size?: number; active?: boolean }) {
  const c = active ? '#4F46E5' : '#6B7280';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill={c} />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill={c} />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill={c} />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill={c} />
    </svg>
  );
}

function FileIcon({ size = 16, active }: { size?: number; active?: boolean }) {
  const c = active ? '#4F46E5' : '#6B7280';
  const cDark = active ? '#4338CA' : '#4B5563';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 2.5A1.5 1.5 0 014.5 1H9.5L13 4.5V13.5A1.5 1.5 0 0111.5 15h-7A1.5 1.5 0 013 13.5V2.5Z" fill={c} fillOpacity="0.9" />
      <path d="M9.5 1L13 4.5H11A1.5 1.5 0 019.5 3V1Z" fill={cDark} />
    </svg>
  );
}

function UsersIcon({ size = 16, active }: { size?: number; active?: boolean }) {
  const c = active ? '#4F46E5' : '#6B7280';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.5" fill={c} />
      <path d="M1 13.5C1 11 3 9 6 9s5 2 5 4.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11.5" cy="5.5" r="2" fill={c} fillOpacity="0.6" />
      <path d="M13 10c1 .8 2 2 2 3.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

function GraphIcon({ size = 16, active }: { size?: number; active?: boolean }) {
  const c = active ? '#4F46E5' : '#6B7280';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" fill={c} />
      <circle cx="2.5" cy="4" r="1.5" fill={c} fillOpacity="0.6" />
      <circle cx="13.5" cy="4" r="1.5" fill={c} fillOpacity="0.6" />
      <circle cx="2.5" cy="12" r="1.5" fill={c} fillOpacity="0.6" />
      <circle cx="13.5" cy="12" r="1.5" fill={c} fillOpacity="0.6" />
      <line x1="6.2" y1="6.8" x2="3.8" y2="5" stroke={c} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="9.8" y1="6.8" x2="12.2" y2="5" stroke={c} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="6.2" y1="9.2" x2="3.8" y2="11" stroke={c} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="9.8" y1="9.2" x2="12.2" y2="11" stroke={c} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

function ChartIcon({ size = 16, active }: { size?: number; active?: boolean }) {
  const c = active ? '#4F46E5' : '#6B7280';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="9" width="3" height="6" rx="1" fill={c} fillOpacity="0.6" />
      <rect x="6" y="5" width="3" height="10" rx="1" fill={c} />
      <rect x="11" y="2" width="3" height="13" rx="1" fill={c} fillOpacity="0.6" />
    </svg>
  );
}
