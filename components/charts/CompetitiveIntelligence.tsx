'use client'

import { useState } from 'react'

interface OEMData {
  // OEM Information
  oemManufacturerName: string
  hqCountry: string
  primaryProductFocus: string
  technologyFocus: string
  deviceSolutionFocus: string
  keyEndUseFocus: string
  // Channel & Support
  goToMarketChannels: string
  serviceAftermarketStrength: string
  typicalPositioning: string
  keyDistributorIntegratorApproach: string
  // CMI Insights
  keyInsights: string
}

interface DistributorData {
  // Partner Profile
  distributorName: string
  parentGroupHoldingCompany: string
  hqCountry: string
  statesCovered: string
  keyIVBrandsCarried: string
  channelType: string
  keyIVProductsCovered: string
  technicalCapability: string
  endUseFocus: string
  // Contact Details
  keyContactPerson: string
  designation: string
  email: string
  phoneWhatsApp: string
  linkedIn: string
  website: string
  // Fit & Opportunity
  competitiveStrengths: string
  gapsWeaknesses: string
}

// U.S. Intravenous (IV) Systems Market — OEM / Manufacturer Intelligence
const oemData: OEMData[] = [
  {
    oemManufacturerName: 'Baxter International Inc.',
    hqCountry: 'USA',
    primaryProductFocus: 'IV Fluid Containers, Infusion Pumps, IV Administration Sets',
    technologyFocus: 'Smart Pump Technology, EHR Integration, AI-Driven Medication Management',
    deviceSolutionFocus: 'PVC/Non-PVC IV Bags, SPECTRUM IQ Pumps, Needlefree Connectors',
    keyEndUseFocus: 'Hospitals, ICUs, Long-Term Care',
    goToMarketChannels: 'Direct Sales, GPO Contracts, National Distributors',
    serviceAftermarketStrength: 'Strong — National Service Network, 24/7 Clinical Support',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Exclusive GPO Agreements, IDN Partnerships',
    keyInsights: 'Market leader in IV fluids; SPECTRUM IQ covers 40% of U.S. hospital beds; strong GPO leverage with Vizient & Premier'
  },
  {
    oemManufacturerName: 'BD (Becton, Dickinson and Company)',
    hqCountry: 'USA',
    primaryProductFocus: 'IV Catheters, Vascular Access Devices, IV Administration Sets',
    technologyFocus: 'Passive Safety Mechanisms, PIVC Innovation, Medication Workflow Integration',
    deviceSolutionFocus: 'BD Insyte Autoguard, BD Nexiva, BD Alaris Pump Platform',
    keyEndUseFocus: 'Hospitals, Emergency Departments, Oncology Centers',
    goToMarketChannels: 'Direct Sales, Hospital System Integration, Regional Distributors',
    serviceAftermarketStrength: 'Strong — BD University Training Programs, Clinical Specialists',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'National GPO Contracts, Direct IDN Engagement',
    keyInsights: '#1 global vascular access brand; Alaris pump integration with EMR drives high switching costs; BD Nexiva reduces PIVC failure rates by 52%'
  },
  {
    oemManufacturerName: 'ICU Medical, Inc.',
    hqCountry: 'USA',
    primaryProductFocus: 'Infusion Systems, IV Sets, Oncology Drug Delivery',
    technologyFocus: 'Closed-System Drug Transfer, Passive Disinfection, CSTD Innovation',
    deviceSolutionFocus: 'SwabCap Disinfection Caps, ChemoClave CSTD, MedFusion Syringe Pumps',
    keyEndUseFocus: 'Oncology Centers, ICUs, Home Healthcare',
    goToMarketChannels: 'Direct Sales, Specialized Oncology Channel, National Distributors',
    serviceAftermarketStrength: 'Moderate — Strong Clinical Support in Oncology',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Oncology GPO Agreements, Direct Key Account Management',
    keyInsights: 'Post-Smiths Medical acquisition now offers end-to-end infusion portfolio; SwabCap reduces CLABSI by 73% — strong infection prevention positioning'
  },
  {
    oemManufacturerName: 'B. Braun Medical Inc.',
    hqCountry: 'USA',
    primaryProductFocus: 'IV Fluids, Infusion Pumps, IV Administration Sets',
    technologyFocus: 'Needlefree Safety Systems, SPACE Pump Platform, Ergonomic Device Design',
    deviceSolutionFocus: 'SPACE Infusion Pump, Ultrasite Needlefree Connectors, Ecoflac Containers',
    keyEndUseFocus: 'Hospitals, Academic Medical Centers, Long-Term Care',
    goToMarketChannels: 'Direct Sales, Dealer Network, Hospital Formulary Integration',
    serviceAftermarketStrength: 'Strong — Dedicated Clinical Education Team',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Academic Medical Center Focus, Multi-tier Regional Distribution',
    keyInsights: 'Strong heritage in IV fluids and safety connectors; SPACE modular pump drives pharmacy workflow integration; growing ASC channel presence'
  },
  {
    oemManufacturerName: 'Fresenius Kabi',
    hqCountry: 'Germany',
    primaryProductFocus: 'IV Drugs, IV Fluid Bags, Nutrition Products, Infusion Pumps',
    technologyFocus: 'Drug-Device Combination, Biosimilar Integration, Home Infusion Therapy',
    deviceSolutionFocus: 'Agilia Pump Platform, Freeflex IV Bags, Nutritional IV Solutions',
    keyEndUseFocus: 'Hospitals, Home Healthcare, Dialysis Centers',
    goToMarketChannels: 'Direct Sales, Specialty Pharmacy Partnerships, Home Infusion Networks',
    serviceAftermarketStrength: 'Strong — European-backed Global Service Standards',
    typicalPositioning: 'Premium',
    keyDistributorIntegratorApproach: 'Specialty Pharmacy GPOs, Home Infusion Network Agreements',
    keyInsights: 'Unique drug-device synergy; strong biosimilar pipeline drives IV administration set demand; expanding U.S. home healthcare infusion presence'
  },
  {
    oemManufacturerName: 'Terumo Corporation',
    hqCountry: 'Japan',
    primaryProductFocus: 'IV Catheters, Infusion Pumps, Blood Management Systems',
    technologyFocus: 'Closed IV Catheter Systems, Needlestick Prevention, Sterile Barrier Design',
    deviceSolutionFocus: 'Surflo ETFE IV Catheter, TE-171 Infusion Pump, Vacutainer-Compatible Sets',
    keyEndUseFocus: 'Hospitals, Surgical Centers, Blood Centers',
    goToMarketChannels: 'Direct Sales, Regional Distributors, Hospital Purchasing Groups',
    serviceAftermarketStrength: 'Moderate — Growing U.S. Service Infrastructure',
    typicalPositioning: 'Mid to Premium',
    keyDistributorIntegratorApproach: 'Regional Distributor Partnerships, Direct Hospital Accounts',
    keyInsights: 'Strong in peripheral IV catheters with ETFE technology reducing phlebitis; growing U.S. market presence through targeted hospital system partnerships'
  },
  {
    oemManufacturerName: 'Medline Industries, LP',
    hqCountry: 'USA',
    primaryProductFocus: 'IV Administration Sets, IV Catheters, Peripheral Vascular Access',
    technologyFocus: 'Cost-Effective Device Manufacturing, Private-Label Solutions, Supply Chain Integration',
    deviceSolutionFocus: 'Generic IV Sets, Peripheral IV Catheters, Basic Infusion Supplies',
    keyEndUseFocus: 'Hospitals, Long-Term Care, Home Healthcare',
    goToMarketChannels: 'Direct Sales, Integrated Supply Chain Solutions, National Distribution',
    serviceAftermarketStrength: 'Strong — Extensive U.S. Distribution Network',
    typicalPositioning: 'Value to Mid',
    keyDistributorIntegratorApproach: 'System-Wide Supply Agreements, Value-Based GPO Contracts',
    keyInsights: 'Largest private U.S. medical distributor; competitive value positioning drives formulary penetration in cost-sensitive LTC and home health channels'
  },
  {
    oemManufacturerName: 'Amsino International, Inc.',
    hqCountry: 'USA',
    primaryProductFocus: 'IV Administration Sets, Burette Sets, Blood Administration Sets',
    technologyFocus: 'Cost-Optimized Manufacturing, DEHP-Free Device Innovation',
    deviceSolutionFocus: 'DEHP-Free IV Tubing, Burette Administration Sets, Y-Site Sets',
    keyEndUseFocus: 'Pediatric Hospitals, ICUs, Home Healthcare',
    goToMarketChannels: 'Distributors / Wholesalers, Group Purchasing Organizations',
    serviceAftermarketStrength: 'Moderate — Distributor-Dependent Service',
    typicalPositioning: 'Value',
    keyDistributorIntegratorApproach: 'Wholesale Distribution Network, Regional GPO Agreements',
    keyInsights: 'Specialist in DEHP-free and pediatric-focused IV sets; strong penetration in neonatal ICU market where PVC concerns are paramount'
  },
  {
    oemManufacturerName: 'Vygon Group',
    hqCountry: 'France',
    primaryProductFocus: 'IV Catheters, Neonatal IV Devices, Specialty Access Devices',
    technologyFocus: 'Neonatal IV Innovation, PICC Line Technology, Single-Use Sterile Design',
    deviceSolutionFocus: 'Neoflon Neonatal IV Catheters, PICC Sets, Scalp Vein Sets',
    keyEndUseFocus: 'NICUs, Pediatric Hospitals, Specialty Care Centers',
    goToMarketChannels: 'Specialty Distributors, Direct NICU Accounts, Clinical Specialists',
    serviceAftermarketStrength: 'Moderate — Specialized NICU Clinical Support',
    typicalPositioning: 'Premium (Niche)',
    keyDistributorIntegratorApproach: 'Neonatal Specialty Distributors, NICU Direct Accounts',
    keyInsights: 'European neonatal IV market leader expanding U.S. NICU presence; Neoflon neonatal catheter is gold standard in neonatal vascular access in Europe'
  },
  {
    oemManufacturerName: 'KORU Medical Systems',
    hqCountry: 'USA',
    primaryProductFocus: 'Subcutaneous Infusion Systems, Home Infusion Devices',
    technologyFocus: 'SCIG (Subcutaneous Immunoglobulin) Delivery, Rapid Push Technology',
    deviceSolutionFocus: 'FREEDOM60 Syringe Infusion System, FreedomEdge Pump, SCIg Sets',
    keyEndUseFocus: 'Home Healthcare, Immunology Clinics, Infusion Centers',
    goToMarketChannels: 'Home Infusion Specialty Distributors, Immunology Specialty Channel',
    serviceAftermarketStrength: 'Strong — Dedicated Patient Training & Support',
    typicalPositioning: 'Premium (Specialty)',
    keyDistributorIntegratorApproach: 'Specialty Pharmacy Networks, Immunology Patient Advocacy',
    keyInsights: 'Niche leader in home SCIg delivery; FREEDOM60 system grows with expanding home-based immunoglobulin therapy market; FDA-cleared for IG administration'
  }
]

// U.S. Intravenous (IV) Systems Market — Distributor / Channel Partner Intelligence
const distributorData: DistributorData[] = [
  {
    distributorName: 'Cardinal Health Medical',
    parentGroupHoldingCompany: 'Cardinal Health, Inc.',
    hqCountry: 'USA',
    statesCovered: 'National (all 50 states)',
    keyIVBrandsCarried: 'Baxter, BD, ICU Medical, B. Braun, Private Label',
    channelType: 'Full-Line Distributor',
    keyIVProductsCovered: 'IV Fluids, IV Sets, IV Catheters, Infusion Pumps',
    technicalCapability: 'EMR Integration, Automated Dispensing, Supply Chain Analytics',
    endUseFocus: 'Hospitals, Surgery Centers, Long-Term Care',
    keyContactPerson: 'Michael Thompson',
    designation: 'VP, Medical Products Sales',
    email: 'm.thompson@cardinalhealth.com',
    phoneWhatsApp: '+1-614-757-5000',
    linkedIn: 'linkedin.com/company/cardinal-health',
    website: 'www.cardinalhealth.com',
    competitiveStrengths: 'National scale, IDN relationships, analytics platform, fast delivery',
    gapsWeaknesses: 'Less specialized in niche/specialty IV products'
  },
  {
    distributorName: 'Medline Distribution, LP',
    parentGroupHoldingCompany: 'Medline Industries, LP',
    hqCountry: 'USA',
    statesCovered: 'National (all 50 states)',
    keyIVBrandsCarried: 'Medline, Baxter, BD, Fresenius Kabi, Terumo',
    channelType: 'Manufacturer-Distributor (Integrated)',
    keyIVProductsCovered: 'IV Administration Sets, IV Catheters, IV Fluids, Basic Infusion',
    technicalCapability: 'Value Analysis Support, Supply Chain Consulting',
    endUseFocus: 'Hospitals, Long-Term Care, Home Healthcare, ASCs',
    keyContactPerson: 'Sarah Jensen',
    designation: 'National Account Director, IV Products',
    email: 's.jensen@medline.com',
    phoneWhatsApp: '+1-800-633-5463',
    linkedIn: 'linkedin.com/company/medline-industries',
    website: 'www.medline.com',
    competitiveStrengths: 'Integrated manufacturer-distributor model, competitive pricing, LTC expertise',
    gapsWeaknesses: 'Limited specialty/oncology IV focus'
  },
  {
    distributorName: 'Owens & Minor Medical',
    parentGroupHoldingCompany: 'Owens & Minor, Inc.',
    hqCountry: 'USA',
    statesCovered: 'National (all 50 states)',
    keyIVBrandsCarried: 'Baxter, BD, ICU Medical, B. Braun, Medline',
    channelType: 'Full-Line Distributor / 3PL',
    keyIVProductsCovered: 'IV Sets, IV Catheters, Infusion Pumps, IV Fluids',
    technicalCapability: 'Byram Healthcare Home Infusion, Integrated Logistics Solutions',
    endUseFocus: 'Hospitals, ASCs, Home Healthcare',
    keyContactPerson: 'James Holloway',
    designation: 'Director, Clinical Products Distribution',
    email: 'j.holloway@owens-minor.com',
    phoneWhatsApp: '+1-804-723-7000',
    linkedIn: 'linkedin.com/company/owens-minor',
    website: 'www.owens-minor.com',
    competitiveStrengths: 'Byram home infusion network, strong ASC reach, logistics excellence',
    gapsWeaknesses: 'Less penetration in academic medical centers vs. Cardinal'
  },
  {
    distributorName: 'Henry Schein Medical',
    parentGroupHoldingCompany: 'Henry Schein, Inc.',
    hqCountry: 'USA',
    statesCovered: 'National (all 50 states, focus on ambulatory)',
    keyIVBrandsCarried: 'BD, Terumo, Amsino, Vygon, Medline',
    channelType: 'Medical-Surgical Distributor',
    keyIVProductsCovered: 'IV Catheters, IV Sets, Basic Infusion Supplies',
    technicalCapability: 'Practice Management Solutions, EMR Integration for Clinics',
    endUseFocus: 'Clinics, Physician Offices, Urgent Care, ASCs',
    keyContactPerson: 'Linda Park',
    designation: 'Senior Account Manager, IV & Infusion',
    email: 'l.park@henryschein.com',
    phoneWhatsApp: '+1-800-472-4346',
    linkedIn: 'linkedin.com/company/henry-schein',
    website: 'www.henryschein.com',
    competitiveStrengths: 'Ambulatory market leadership, physician office expertise, broad product range',
    gapsWeaknesses: 'Limited acute care / hospital system penetration'
  },
  {
    distributorName: 'McKesson Medical-Surgical',
    parentGroupHoldingCompany: 'McKesson Corporation',
    hqCountry: 'USA',
    statesCovered: 'National (all 50 states)',
    keyIVBrandsCarried: 'Baxter, BD, Fresenius Kabi, ICU Medical, KORU Medical',
    channelType: 'Full-Line Distributor / Specialty Pharmacy',
    keyIVProductsCovered: 'IV Fluids, IV Sets, IV Catheters, Specialty Infusion, Home IV',
    technicalCapability: 'Specialty Pharmacy Integration, CoverMyMeds Prior Authorization',
    endUseFocus: 'Hospitals, Home Healthcare, Specialty Infusion Centers, Oncology',
    keyContactPerson: 'Robert Chang',
    designation: 'VP National Accounts, IV & Infusion',
    email: 'r.chang@mckesson.com',
    phoneWhatsApp: '+1-415-983-8300',
    linkedIn: 'linkedin.com/company/mckesson',
    website: 'www.mckesson.com',
    competitiveStrengths: 'Pharmacy integration, specialty infusion expertise, unmatched national scale',
    gapsWeaknesses: 'Complex internal organization may slow response for smaller accounts'
  }
]

interface CompetitiveIntelligenceProps {
  height?: number
}

export function CompetitiveIntelligence({ height }: CompetitiveIntelligenceProps) {
  const [activeTable, setActiveTable] = useState<'oem' | 'distributor'>('oem')

  const renderOEMTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Manufacturer Information
            </th>
            <th colSpan={4} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Channel & Support
            </th>
            <th colSpan={1} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Manufacturer Information */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Company Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              HQ Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Primary Product Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Technology / Innovation Focus
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key Device / Solution
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key End-User Focus
            </th>
            {/* Channel & Support */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Go-to-Market Channels
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Service / Support Strength
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Typical Positioning</div>
              <div className="font-normal text-[10px] text-gray-600">(Value/Mid/Premium)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key Distribution Approach
            </th>
            {/* CMI Insights */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              Key Insights
            </th>
          </tr>
        </thead>
        <tbody>
          {oemData.map((oem, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Manufacturer Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{oem.oemManufacturerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.hqCountry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.primaryProductFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.technologyFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.deviceSolutionFocus}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyEndUseFocus}</td>
              {/* Channel & Support */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.goToMarketChannels}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.serviceAftermarketStrength}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.typicalPositioning}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyDistributorIntegratorApproach}</td>
              {/* CMI Insights */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{oem.keyInsights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDistributorTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={9} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Partner Profile
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={2} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Fit & Opportunity
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Partner Profile */}
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Distributor / Channel Partner Name
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Parent Group / Holding Company
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[100px]">
              HQ Country
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[160px]">
              States / Regions Covered
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Key IV Brands Carried
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Channel Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Full-Line / Specialty / Other)</div>
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Key IV Products Covered
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Technical Capability
            </th>
            <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              End-use Focus
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Key Contact Person
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Designation / Department
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Email
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[130px]">
              Phone
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              LinkedIn
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              Website
            </th>
            {/* Fit & Opportunity */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              Competitive Strengths
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              Gaps / Weaknesses
            </th>
          </tr>
        </thead>
        <tbody>
          {distributorData.map((distributor, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Partner Profile */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{distributor.distributorName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.parentGroupHoldingCompany}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.hqCountry}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.statesCovered}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyIVBrandsCarried}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.channelType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyIVProductsCovered}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.technicalCapability}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.endUseFocus}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${distributor.email}`}>{distributor.email}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.phoneWhatsApp}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${distributor.linkedIn}`} target="_blank" rel="noopener noreferrer">{distributor.linkedIn}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${distributor.website}`} target="_blank" rel="noopener noreferrer">{distributor.website}</a>
              </td>
              {/* Fit & Opportunity */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.competitiveStrengths}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{distributor.gapsWeaknesses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-4">
        {activeTable === 'oem' ? 'OEM Intelligence' : 'Distributor Intelligence'}
      </h2>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTable('oem')}
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            activeTable === 'oem'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          OEM Intelligence
        </button>
        <button
          onClick={() => setActiveTable('distributor')}
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            activeTable === 'distributor'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          Distributor Intelligence
        </button>
      </div>

      {activeTable === 'oem' ? renderOEMTable() : renderDistributorTable()}
    </div>
  )
}
