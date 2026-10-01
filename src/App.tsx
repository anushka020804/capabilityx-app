import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import RoleSelection from './pages/RoleSelection';
import BuyerDashboard from './pages/BuyerDashboard';
import FloatRFQ from './pages/FloatRFQ';
import SupplierShortlist from './pages/SupplierShortlist';
import SupplierDetail from './pages/SupplierDetail';
import CapabilityGraph from './pages/CapabilityGraph';
import FIDashboard from './pages/FIDashboard';
import RFQAnalysis from './pages/RFQAnalysis';
import AppShell from './components/AppShell';

type Screen =
  | 'landing'
  | 'role-select'
  | 'buyer-dashboard'
  | 'float-rfq'
  | 'rfq-analysis'
  | 'shortlist'
  | 'supplier-apex'
  | 'supplier-bharat'
  | 'supplier-shree'
  | 'capability-graph'
  | 'fi-dashboard'
  | 'reports';

const SHELL_SCREENS: Screen[] = [
  'buyer-dashboard', 'float-rfq', 'rfq-analysis', 'shortlist',
  'supplier-apex', 'supplier-bharat', 'supplier-shree', 'capability-graph', 'reports',
];

const FI_SHELL_SCREENS: Screen[] = ['fi-dashboard', 'capability-graph', 'reports'];

export default function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    const hash = window.location.hash.replace('#', '') as Screen;
    return hash || 'landing';
  });
  const [role, setRole] = useState<'buyer' | 'fi'>('buyer');
  const [graphSupplier, setGraphSupplier] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Screen;
      if (hash) {
        setScreen(hash);
      } else {
        setScreen('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const nav = (s: Screen) => {
    window.location.hash = s;
  };

  const goBack = () => {
    window.history.back();
  };

  const inBuyerShell = SHELL_SCREENS.includes(screen);
  const inFIShell = FI_SHELL_SCREENS.includes(screen) && role === 'fi';
  const inShell = (inBuyerShell && role === 'buyer') || inFIShell;

  function renderContent() {
    switch (screen) {
      case 'landing':
        return (
          <Landing
            onGetStarted={() => nav('role-select')}
            onHowItWorks={() => nav('role-select')}
          />
        );
      case 'role-select':
        return (
          <RoleSelection
            onBuyer={() => { setRole('buyer'); nav('buyer-dashboard'); }}
            onFI={() => { setRole('fi'); nav('fi-dashboard'); }}
            onBack={() => nav('landing')}
          />
        );
      case 'buyer-dashboard':
        return (
          <BuyerDashboard
            onFloatRFQ={() => nav('float-rfq')}
            onOpenRFQ={() => nav('shortlist')}
          />
        );
      case 'float-rfq':
        return <FloatRFQ onAnalyze={() => nav('rfq-analysis')} />;
      case 'rfq-analysis':
        return <RFQAnalysis onFindSuppliers={() => nav('shortlist')} onBack={() => nav('float-rfq')} />;
      case 'shortlist':
        return (
          <SupplierShortlist
            onViewSupplier={(id) => {
              if (id === 'apex') nav('supplier-apex');
              else if (id === 'bharat') nav('supplier-bharat');
              else if (id === 'shree') nav('supplier-shree');
              else if (id === 'precision') nav('supplier-bharat');
            }}
          />
        );
      case 'supplier-apex':
        return <SupplierDetail supplierId="apex" onBack={() => nav('shortlist')} onViewGraph={() => { setGraphSupplier('apex'); nav('capability-graph'); }} />;
      case 'supplier-bharat':
        return <SupplierDetail supplierId="bharat" onBack={() => nav('shortlist')} onViewGraph={() => { setGraphSupplier('bharat'); nav('capability-graph'); }} />;
      case 'supplier-shree':
        return <SupplierDetail supplierId="shree" onBack={() => nav('shortlist')} onViewGraph={() => { setGraphSupplier('shree'); nav('capability-graph'); }} />;
      case 'capability-graph':
        return <CapabilityGraph initialSupplierId={graphSupplier} />;
      case 'fi-dashboard':
        return <FIDashboard />;
      case 'reports':
        return <ReportsPlaceholder />;
      default:
        return null;
    }
  }

  const backButton = screen !== 'landing' && (
    <button
      onClick={goBack}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
      title="Go Back"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  );

  if (screen === 'landing' || screen === 'role-select') {
    return (
      <>
        {backButton}
        {renderContent()}
      </>
    );
  }

  return (
    <>
      {backButton}
      <AppShell
        screen={screen}
        onNavigate={nav}
        role={role}
      >
        {renderContent()}
      </AppShell>
    </>
  );
}

function ReportsPlaceholder() {
  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#0B1F3A', letterSpacing: '-0.01em' }}>Reports</h1>
      <p className="text-sm mb-8" style={{ color: '#64748B' }}>Analytics and supplier intelligence reports.</p>
      <div className="rounded-2xl border p-12 flex flex-col items-center justify-center text-center" style={{ background: 'white', borderColor: '#E2E8F0' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: '#F0F6FF' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="12" width="4" height="9" rx="1" fill="#4DA3FF" fillOpacity="0.6" />
            <rect x="10" y="7" width="4" height="14" rx="1" fill="#4DA3FF" />
            <rect x="17" y="3" width="4" height="18" rx="1" fill="#4DA3FF" fillOpacity="0.6" />
          </svg>
        </div>
        <div className="text-sm font-semibold mb-1" style={{ color: '#0B1F3A' }}>Reports coming soon</div>
        <div className="text-xs" style={{ color: '#64748B' }}>Supplier analytics and capability trend reports will appear here.</div>
      </div>
    </div>
  );
}
