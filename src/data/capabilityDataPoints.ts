export interface CapabilityDataPoint {
  label: string;
  value: string | number;
  source: string;
  scored?: boolean; // true = evaluative data point that gets a match badge
  mandatory?: boolean; // true = mandatory requirement, shows red *
}

export interface CapabilityDomain {
  id: string;
  title: string;
  points: CapabilityDataPoint[];
}

export const capabilityDomainsData: CapabilityDomain[] = [
  {
    id: 'org',
    title: 'Organisation Structure & Health',
    points: [
      { label: 'Permanent Employees', value: 84, source: 'SME Capability Survey' },
      { label: 'Contract / Casual Employees', value: 35, source: 'SME Capability Survey' },
      { label: 'Annual Attrition Rate', value: '12%', source: 'SME Capability Survey' },
      { label: 'Succession Plan in Place', value: 'Yes', source: 'SME Capability Survey' },
      { label: 'Group / Associate Companies', value: 'No', source: 'SME Capability Survey' },
      { label: 'Organisation Chart Available', value: 'Yes', source: 'SME Capability Survey' },
      { label: 'Legal Structure', value: 'Partnership', source: 'MetalCapital / Onboarding' },
      { label: 'Date of Incorporation', value: '14/02/1997', source: 'MetalCapital / Onboarding', mandatory: true },
      { label: 'Date of Commencement', value: '14/02/1997', source: 'MetalCapital / Onboarding' },
      { label: 'National Industry Classification (NIC) Codes', value: '29301, 29302', source: 'MetalCapital / Onboarding' },
      { label: 'Enterprise Classification', value: 'Micro Enterprise', source: 'MetalCapital / Onboarding' },
    ]
  },
  {
    id: 'policies',
    title: 'Policies & Practices',
    points: [
      { label: 'Documented Quality Policy', value: 'Yes', source: 'SME Capability Survey', scored: true, mandatory: true },
      { label: 'Documented HR Policy', value: 'Yes', source: 'SME Capability Survey', scored: true },
      { label: 'Documented EHS / Safety Policy', value: 'Yes', source: 'SME Capability Survey', scored: true },
      { label: 'Internal Audit Frequency', value: 'Quarterly', source: 'SME Capability Survey' },
      { label: 'Grievance / Whistle-blower Mechanism', value: 'Yes', source: 'SME Capability Survey' },
      { label: 'Labour Law Violation — Last 3 Years', value: 'No', source: 'SME Capability Survey', scored: true, mandatory: true },
      { label: 'POSH Compliance', value: 'Yes', source: 'SME Capability Survey' },
      { label: 'ITR Filing Timeliness', value: 'Filed before due date', source: 'Financial / Tax Analysis' },
      { label: 'Statutory Dues Paid on Time', value: 'No statutory delay identified', source: 'Financial Analysis' },
      { label: 'GST Return Filing Timeliness', value: 'Available from GST filing records', source: 'GST Analysis' },
    ]
  },
  {
    id: 'ops',
    title: 'Operations — Technical Capacity',
    points: [
      { label: 'Key Machinery / Equipment', value: 'CNC turning, VMC, grinding, in-house tooling', source: 'SME Capability Survey', scored: true },
      { label: 'Installed Capacity', value: '45,000 units/month', source: 'SME Capability Survey', scored: true, mandatory: true },
      { label: 'Current Capacity Utilisation', value: '78%', source: 'SME Capability Survey', scored: true },
      { label: 'On-Time Delivery', value: '91%', source: 'SME Capability Survey', scored: true },
      { label: 'Rejection / Rework Rate', value: '2%', source: 'SME Capability Survey', scored: true },
      { label: 'Inventory Turns', value: '8x / year', source: 'SME Capability Survey', scored: true },
      { label: 'Raw Material Lead Time', value: '18 days', source: 'SME Capability Survey', scored: true },
      { label: 'In-House vs Outsourced Processes', value: 'In-house: machining, assembly\nOutsourced: heat treatment, plating', source: 'SME Capability Survey' },
      { label: 'Testing / Gauging Equipment Available', value: 'Yes', source: 'SME Capability Survey', scored: true },
      { label: 'Electricity Consumption Trend', value: 'Monthly consumption trend available', source: 'Utility / Financial Analysis' },
      { label: 'Load Utilisation', value: 'Usage trend available', source: 'Utility / Financial Analysis' },
      { label: 'Sanctioned Electricity Load', value: '60 HP / 11.936 kW', source: 'Utility / Financial Analysis' },
      { label: 'HSN-wise Product Breakdown', value: 'Electrical equipment / transformers', source: 'GST Analysis' },
      { label: 'Past Purchase Orders', value: 'Historical purchase order data available', source: 'OpportunityX / Purchase Order Records' },
      { label: 'Largest Order Fulfilled', value: '₹99,03,983', source: 'Purchase Order Records', scored: true },
    ]
  },
  {
    id: 'finance',
    title: 'Financial Details',
    points: [
      { label: 'Number of Banking Relationships', value: '2', source: 'Financial Analysis' },
      { label: 'Collateral / Security Available', value: 'Yes', source: 'SME Capability Survey', scored: true },
      { label: 'Planned Capex — Next 12 Months', value: '₹45 Lakh', source: 'SME Capability Survey', scored: true },
      { label: 'Insurance Coverage', value: 'Yes', source: 'SME Capability Survey', scored: true, mandatory: true },
      { label: 'Debit-to-Credit Ratio', value: '0.92x', source: 'Bank Statement Analysis', scored: true },
      { label: 'Existing Debt Obligations', value: 'Existing debt obligations identified', source: 'Bank Statement Analysis' },
      { label: 'Multi-year Income Trend', value: 'FY22: ₹3.36 Cr\nFY23: ₹3.53 Cr\nFY24: ₹5.22 Cr', source: 'Audited Financials', scored: true },
      { label: 'TOL / TNW Ratio', value: '3.26x', source: 'Audited Financials', scored: true },
      { label: 'Debt-to-Equity Ratio', value: '2.20x', source: 'Audited Financials', scored: true },
      { label: 'Net Worth', value: '₹62.87 Lakh', source: 'Audited Financials', scored: true },
      { label: 'Return on Total Assets (RoTA)', value: '13.31%', source: 'Audited Financials', scored: true },
      { label: 'Interest Coverage Ratio', value: '2.15x', source: 'Audited Financials', scored: true },
      { label: 'EBITDA Margin', value: '6.83% FY24', source: 'Audited Financials', scored: true },
      { label: 'Turnover', value: '₹5.22 Cr FY24', source: 'Audited Financials', scored: true, mandatory: true },
      { label: 'Stock Holding Period', value: '62 days', source: 'Audited Financials', scored: true },
      { label: 'Debtors Collection Period', value: '85 days', source: 'Audited Financials', scored: true },
      { label: 'Creditors Payment Period', value: '32 days', source: 'Audited Financials', scored: true },
      { label: 'Gross Profit %', value: '13.29% FY24', source: 'Audited Financials', scored: true },
      { label: 'Net Profit %', value: '2.88% FY24', source: 'Audited Financials', scored: true },
      { label: 'GST Monthly Turnover Trend', value: 'Available from GSTR-3B analysis', source: 'GST Analysis' },
      { label: 'ITC Utilisation Pattern', value: 'Available from GSTR-3B analysis', source: 'GST Analysis' },
      { label: 'Cash Conversion Cycle', value: '~115 days', source: 'Financial Analysis', scored: true },
      { label: 'Current Ratio', value: '1.64x', source: 'Audited Financials', scored: true },
      { label: 'Quick Ratio', value: 'Not available', source: 'Audited Financials' },
      { label: 'GST Credit / Debit Note Ratio', value: '~0.54% of sales', source: 'GST Analysis', scored: true },
    ]
  },
  {
    id: 'certs',
    title: 'Certifications',
    points: [
      { label: 'Sector-Specific Certification', value: 'IATF 16949 — In Progress', source: 'SME Capability Survey', scored: true },
      { label: 'Customer-Approved Vendor Status', value: 'Bajaj Auto, Force Motors', source: 'SME Capability Survey', scored: true },
      { label: 'Certification Currently Under Process', value: 'Yes', source: 'SME Capability Survey', scored: true },
      { label: 'Certifications Renewed in Last 12 Months', value: 'Yes', source: 'SME Capability Survey', scored: true },
      { label: 'BIS Certificate', value: 'Yes', source: 'Certification Records', scored: true },
      { label: 'ISO 9001', value: 'Yes', source: 'Certification Records', scored: true, mandatory: true },
      { label: 'ISO 14001', value: 'No', source: 'Certification Records', scored: true },
      { label: 'ISO 45001 / OHSAS 18001', value: 'No', source: 'Certification Records', scored: true },
      { label: 'Completion Certificate', value: 'No', source: 'Certification Records' },
      { label: 'Local Content Self Certificate', value: 'No', source: 'Certification Records' },
      { label: 'MII Certificate', value: 'No', source: 'Certification Records' },
      { label: 'Declared Local Content %', value: 'Not available', source: 'Certification Records' },
      { label: 'DPIIT Startup Certificate', value: 'No', source: 'Certification Records' },
      { label: 'ZED Certification', value: 'Bronze', source: 'Certification Records', scored: true },
      { label: 'OpportunityX Blacklisting / Debarment Declaration', value: 'No', source: 'OpportunityX', scored: true },
    ]
  },
  {
    id: 'customers',
    title: 'Customer Concentration & Revenue Mix',
    points: [
      { label: 'Top Customer', value: 'MPPKVVCL / MPMKVVCL', source: 'Customer / GST Analysis' },
      { label: 'Customer Concentration', value: 'Top customer concentration available', source: 'GST / Customer Analysis', scored: true },
      { label: 'Top 10 Customers', value: 'Available', source: 'CAM Analysis' },
      { label: 'Top 10 Suppliers', value: 'Available', source: 'CAM Analysis' },
      { label: 'Recurring Vendor Pattern', value: 'Bhopal Cables, Shiv Enterprises, Fatehpuriya Vidyut', source: 'CAM Analysis' },
      { label: 'Revenue Split — OEM', value: '62%', source: 'SME Capability Survey', scored: true },
      { label: 'Revenue Split — Government / PSU', value: '18%', source: 'SME Capability Survey', scored: true },
      { label: 'Revenue Split — Job-Work', value: '20%', source: 'SME Capability Survey', scored: true },
      { label: 'Relationship with Largest Customer', value: '9 years', source: 'SME Capability Survey', scored: true },
      { label: 'Repeat Business — Last 12 Months', value: '85%', source: 'SME Capability Survey', scored: true },
      { label: 'Export Revenue', value: '5%', source: 'SME Capability Survey', scored: true },
    ]
  }
];
