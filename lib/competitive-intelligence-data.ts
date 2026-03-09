/**
 * Competitive Intelligence Data Generator
 * Generates data for competitive dashboard and market share analysis
 * Last updated: 2024
 */

import { CHART_COLORS } from '@/lib/chart-theme'

export interface Proposition {
  title: string
  description: string
  category: string
}

export interface CompanyData {
  id: string
  name: string
  headquarters: string
  ceo: string
  yearEstablished: number
  portfolio: string
  strategies: string[]
  regionalStrength: string
  overallRevenue: number // in USD Mn
  segmentalRevenue: number // in USD Mn for 2024
  marketShare: number // percentage
  propositions?: Proposition[] // Dynamic propositions array
}

export interface MarketShareData {
  company: string
  marketShare: number
  color: string
}

export interface CompetitiveIntelligenceData {
  metadata: {
    market: string
    year: number
    currency: string
    revenue_unit: string
    total_companies: number
  }
  companies: CompanyData[]
  market_share_data: MarketShareData[]
}

let cachedData: CompetitiveIntelligenceData | null = null

/**
 * Parse competitive intelligence CSV row and extract propositions
 */
function parsePropositionsFromRow(row: Record<string, any>): Proposition[] {
  const propositions: Proposition[] = []
  
  // Look for proposition fields (Proposition 1 Title, Proposition 1 Description, etc.)
  let propIndex = 1
  while (true) {
    const titleKey = `Proposition ${propIndex} Title`
    const descKey = `Proposition ${propIndex} Description`
    const catKey = `Proposition ${propIndex} Category`
    
    const title = row[titleKey]?.toString().trim()
    const description = row[descKey]?.toString().trim()
    const category = row[catKey]?.toString().trim()
    
    // If no title, stop looking for more propositions
    if (!title || title === 'N/A' || title === '') {
      break
    }
    
    propositions.push({
      title,
      description: description || '',
      category: category || 'General'
    })
    
    propIndex++
    
    // Safety limit - prevent infinite loops
    if (propIndex > 10) break
  }
  
  return propositions
}

/**
 * Parse competitive intelligence data from CSV/JSON format
 */
export function parseCompetitiveIntelligenceFromData(rows: Record<string, any>[]): CompanyData[] {
  return rows.map((row, index) => {
    const marketShare = parseFloat(row['Market Share (%)']?.toString().replace('%', '') || '0')
    const revenue = generateRevenue(marketShare)
    
    // Parse propositions from row
    const propositions = parsePropositionsFromRow(row)
    
    // Get company name for color lookup
    const companyName = row['Company Name']?.toString() || ''
    const color = companyColors[companyName] || companyColors['Others'] || '#94a3b8'
    
    return {
      id: (row['Company ID'] || companyName.toLowerCase().replace(/\s+/g, '-') || `company-${index}`).toString(),
      name: companyName,
      headquarters: row['Headquarters']?.toString() || '',
      ceo: row['CEO']?.toString() || '',
      yearEstablished: parseInt(row['Year Established']?.toString() || '0'),
      portfolio: row['Product/Service Portfolio']?.toString() || '',
      strategies: (row['Strategies (comma-separated)']?.toString() || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      regionalStrength: row['Regional Strength']?.toString() || '',
      overallRevenue: parseFloat(row['Overall Revenue (USD Mn)']?.toString() || revenue.overall.toString()),
      segmentalRevenue: parseFloat(row['Segmental Revenue (USD Mn)']?.toString() || revenue.segmental.toString()),
      marketShare: marketShare,
      propositions: propositions.length > 0 ? propositions : undefined,
      color: color
    }
  })
}

/**
 * Load competitive intelligence data from store or API
 */
export async function loadCompetitiveIntelligenceData(): Promise<CompetitiveIntelligenceData | null> {
  if (cachedData) {
    return cachedData
  }

  // Try to get data from store first (if uploaded via dashboard builder)
  // Only try this in browser environment (client-side)
  if (typeof window !== 'undefined') {
    try {
      const { useDashboardStore } = require('./store')
      const store = useDashboardStore.getState()
      
      if (store.competitiveIntelligenceData && store.competitiveIntelligenceData.rows && store.competitiveIntelligenceData.rows.length > 0) {
        console.log('Using competitive intelligence data from store')
        // Parse the store data
        const companies = parseCompetitiveIntelligenceFromData(store.competitiveIntelligenceData.rows)
        
        // Calculate market share data
        const marketShareData = companies.map((company, index) => ({
          company: company.name,
          marketShare: company.marketShare,
          color: CHART_COLORS.primary[index % CHART_COLORS.primary.length]
        }))
        
        const data: CompetitiveIntelligenceData = {
          metadata: {
            market: 'Competitive Intelligence Market',
            year: 2024,
            currency: 'USD',
            revenue_unit: 'Mn',
            total_companies: companies.length
          },
          companies,
          market_share_data: marketShareData
        }
        
        // Cache the data
        cachedData = data
        return cachedData
      }
    } catch (error) {
      console.warn('Could not access store for competitive intelligence data:', error)
    }
  }

  try {
    // Try to load from API endpoint
    const response = await fetch('/api/load-competitive-intelligence', {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      // If file not found, return null to use fallback data
      if (response.status === 404) {
        console.log('Competitive intelligence CSV not found, using fallback data')
        return null
      }
      throw new Error(`Failed to load competitive intelligence: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Cache the data
    cachedData = data as CompetitiveIntelligenceData
    
    return cachedData
  } catch (error) {
    console.error('Error loading competitive intelligence data:', error)
    // Return null to use fallback data
    return null
  }
}

// Top companies in U.S. Intravenous (IV) Systems Market
const companies = [
  'Baxter International Inc.',
  'BD (Becton, Dickinson and Company)',
  'ICU Medical, Inc.',
  'B. Braun Medical Inc.',
  'Fresenius Kabi',
  'Terumo Corporation',
  'Medline Industries',
  'Amsino International, Inc.',
  'Vygon',
  'KORU Medical Systems',
  'Others'
]

// Company colors using the enterprise palette
const companyColors: Record<string, string> = {
  'Baxter International Inc.': '#184E77',
  'BD (Becton, Dickinson and Company)': '#1E6091',
  'ICU Medical, Inc.': '#1A759F',
  'B. Braun Medical Inc.': '#168AAD',
  'Fresenius Kabi': '#34A0A4',
  'Terumo Corporation': '#52B69A',
  'Medline Industries': '#76C893',
  'Amsino International, Inc.': '#99D98C',
  'Vygon': '#B5E48C',
  'KORU Medical Systems': '#D9ED92',
  'Others': '#94a3b8'
}

// Headquarters locations
const headquarters: Record<string, string> = {
  'Baxter International Inc.': 'Deerfield, Illinois, U.S.',
  'BD (Becton, Dickinson and Company)': 'Franklin Lakes, New Jersey, U.S.',
  'ICU Medical, Inc.': 'San Clemente, California, U.S.',
  'B. Braun Medical Inc.': 'Bethlehem, Pennsylvania, U.S.',
  'Fresenius Kabi': 'Bad Homburg, Germany',
  'Terumo Corporation': 'Tokyo, Japan',
  'Medline Industries': 'Northfield, Illinois, U.S.',
  'Amsino International, Inc.': 'Pomona, California, U.S.',
  'Vygon': 'Ecouen, France',
  'KORU Medical Systems': 'Chester, New York, U.S.',
  'Others': 'Various'
}

// CEOs
const ceos: Record<string, string> = {
  'Baxter International Inc.': 'Joel Grade',
  'BD (Becton, Dickinson and Company)': 'Tom Polen',
  'ICU Medical, Inc.': 'Vivek Jain',
  'B. Braun Medical Inc.': 'Anna Maria Braun',
  'Fresenius Kabi': 'Michael Sen',
  'Terumo Corporation': 'Shinjiro Sato',
  'Medline Industries': 'James Abrams',
  'Amsino International, Inc.': 'Richard Chung',
  'Vygon': 'Pierre-Yves Gosset',
  'KORU Medical Systems': 'Linda Tharby',
  'Others': 'Multiple'
}

// Year established
const yearEstablished: Record<string, number> = {
  'Baxter International Inc.': 1931,
  'BD (Becton, Dickinson and Company)': 1897,
  'ICU Medical, Inc.': 1984,
  'B. Braun Medical Inc.': 1839,
  'Fresenius Kabi': 1912,
  'Terumo Corporation': 1921,
  'Medline Industries': 1966,
  'Amsino International, Inc.': 1993,
  'Vygon': 1962,
  'KORU Medical Systems': 1992,
  'Others': 0
}

// Product portfolios
const portfolios: Record<string, string> = {
  'Baxter International Inc.': 'IV Fluid Containers, Infusion Pumps, IV Administration Sets, Renal Care',
  'BD (Becton, Dickinson and Company)': 'IV Catheters, Vascular Access Devices, IV Administration Sets, Medication Management',
  'ICU Medical, Inc.': 'Infusion Systems, IV Sets, Needlefree Connectors, Oncology Drug Delivery',
  'B. Braun Medical Inc.': 'IV Fluids, Infusion Pumps, IV Administration Sets, Needlefree Systems',
  'Fresenius Kabi': 'IV Drugs, IV Fluid Bags, Nutrition Products, Infusion Pumps',
  'Terumo Corporation': 'IV Catheters, Blood Collection, Infusion Therapy Products',
  'Medline Industries': 'IV Administration Sets, IV Catheters, Hospital Supply Chain',
  'Amsino International, Inc.': 'IV Administration Sets, IV Catheters, Infusion Accessories',
  'Vygon': 'IV Administration Sets, Neonatal IV Products, Specialty IV Lines',
  'KORU Medical Systems': 'Subcutaneous Infusion Systems, IV Access Devices',
  'Others': 'Various IV Systems Products'
}

// Regional strengths
const regionalStrengths: Record<string, string> = {
  'Baxter International Inc.': 'Northeast, Southeast, National GPO Contracts',
  'BD (Becton, Dickinson and Company)': 'Northeast, Midwest, National',
  'ICU Medical, Inc.': 'West, Southwest, Oncology Centers',
  'B. Braun Medical Inc.': 'Northeast, Midwest, Academic Medical Centers',
  'Fresenius Kabi': 'Southeast, West, Dialysis Centers',
  'Terumo Corporation': 'West, Northeast, Specialty Hospitals',
  'Medline Industries': 'Midwest, Southeast, Long-Term Care',
  'Amsino International, Inc.': 'West, Southwest, Regional Hospitals',
  'Vygon': 'Northeast, Neonatal ICUs',
  'KORU Medical Systems': 'Northeast, West, Home Healthcare',
  'Others': 'Regional Markets'
}

// Market share percentages (must sum to 100)
const marketShares: Record<string, number> = {
  'Baxter International Inc.': 18.5,
  'BD (Becton, Dickinson and Company)': 16.2,
  'ICU Medical, Inc.': 12.4,
  'B. Braun Medical Inc.': 10.8,
  'Fresenius Kabi': 9.3,
  'Terumo Corporation': 6.5,
  'Medline Industries': 5.7,
  'Amsino International, Inc.': 3.8,
  'Vygon': 2.9,
  'KORU Medical Systems': 2.2,
  'Others': 11.7
}

// Generate strategies based on company type
function generateStrategies(company: string): string[] {
  const strategyMap: Record<string, string[]> = {
    'Baxter International Inc.': ['Portfolio Expansion', 'GPO Partnerships', 'Smart Infusion Technology'],
    'BD (Becton, Dickinson and Company)': ['Vascular Access Innovation', 'Hospital System Integration', 'Digital Health Solutions'],
    'ICU Medical, Inc.': ['Oncology Drug Delivery', 'M&A Growth Strategy', 'Safety Device Focus'],
    'B. Braun Medical Inc.': ['Hospital Formulary Integration', 'Needlefree Safety Innovation', 'Academic Medical Center Focus'],
    'Fresenius Kabi': ['Drug-Device Combination', 'Home Healthcare Expansion', 'Biosimilar Integration'],
    'Terumo Corporation': ['Catheter Technology Innovation', 'Specialty Hospital Focus', 'Asia-Pacific Synergies'],
    'Medline Industries': ['Supply Chain Optimization', 'Long-Term Care Focus', 'Value-Based Contracting'],
    'Amsino International, Inc.': ['Cost Competitiveness', 'Regional Hospital Partnerships', 'Private Label Growth'],
    'Vygon': ['Neonatal Specialization', 'Clinical Education Programs', 'Specialty Line Expansion'],
    'KORU Medical Systems': ['Home Infusion Market', 'Subcutaneous Delivery Innovation', 'Reimbursement Strategy'],
    'Others': ['Regional Niche Focus', 'Specialized Product Lines', 'Cost Leadership']
  }

  return strategyMap[company] || ['Market Development', 'Product Innovation', 'Strategic Partnerships']
}

// Generate propositions based on company type
function generatePropositions(company: string): Proposition[] {
  const propositionMap: Record<string, Proposition[]> = {
    'Baxter International Inc.': [
      { title: 'Spectrum IQ Smart Pump Platform', description: 'AI-driven infusion pump reducing medication errors by 52% across hospital networks', category: 'Product Innovation' },
      { title: 'SIGMA Spectrum Integration', description: 'EHR-integrated infusion management covering 40% of U.S. hospital beds', category: 'Digital Health' },
      { title: 'Flexible IV Fluid Portfolio', description: 'Comprehensive IV bag portfolio including PVC-free and multi-chamber solutions', category: 'Product Portfolio' }
    ],
    'BD (Becton, Dickinson and Company)': [
      { title: 'Nexiva IV Catheter System', description: 'Closed IV catheter system reducing bloodstream infections by 57% in clinical studies', category: 'Safety Innovation' },
      { title: 'Alaris Infusion System', description: 'Guardrails safety software integrated into 4,500+ U.S. hospitals', category: 'Clinical Safety' },
      { title: 'Medication Management Ecosystem', description: 'End-to-end medication workflow integration with 95% EMR compatibility', category: 'System Integration' }
    ],
    'ICU Medical, Inc.': [
      { title: 'Oncology IV Drug Delivery', description: 'Specialized chemotherapy IV sets with closed-system drug transfer devices', category: 'Oncology Focus' },
      { title: 'SwabCap Disinfection', description: 'Passive disinfection caps reducing CLABSI rates by 73% in ICU settings', category: 'Infection Prevention' },
      { title: 'Plum 360 Infusion System', description: 'Multi-therapy infusion platform with embedded dose error reduction software', category: 'Technology' }
    ],
    'B. Braun Medical Inc.': [
      { title: 'Space Infusion System', description: 'Modular pump system adaptable to ICU, oncology, and general ward settings', category: 'Versatility' },
      { title: 'Needlefree ULTRASITE', description: 'High-pressure needlefree connector with zero-fluid displacement technology', category: 'Safety' },
      { title: 'IV Compounding Services', description: 'Sterile compounding capabilities supporting 600+ hospital pharmacies nationwide', category: 'Services' }
    ],
    'Fresenius Kabi': [
      { title: 'IV Drug-Device Combination', description: 'Pre-filled IV drug solutions reducing preparation errors and pharmacy labor costs', category: 'Efficiency' },
      { title: 'Parenteral Nutrition Portfolio', description: 'Comprehensive PN bag solutions for ICU, neonatal, and home settings', category: 'Nutrition Therapy' },
      { title: 'Agilia Infusion Platform', description: 'Connected infusion pump ecosystem with real-time dose monitoring', category: 'Connectivity' }
    ],
    'Terumo Corporation': [
      { title: 'Surflo IV Catheter Excellence', description: 'Ultra-thin-walled catheter technology enabling high flow with minimal patient discomfort', category: 'Patient Experience' },
      { title: 'Blood Management Integration', description: 'IV access systems integrated with blood collection and transfusion management', category: 'Care Continuum' },
      { title: 'Global Quality Standards', description: 'ISO 13485 certified manufacturing with zero critical recalls in 5 years', category: 'Quality Assurance' }
    ],
    'Medline Industries': [
      { title: 'Supply Chain Value Partnership', description: 'Committed supply agreements providing price stability through market disruptions', category: 'Supply Chain' },
      { title: 'Long-Term Care Specialization', description: 'IV therapy solutions optimized for skilled nursing and home health settings', category: 'Specialty Markets' },
      { title: 'Private Label IV Portfolio', description: 'Cost-effective Medline-branded IV consumables at 20-30% cost savings', category: 'Value Proposition' }
    ],
    'Amsino International, Inc.': [
      { title: 'Competitive IV Set Pricing', description: 'FDA-cleared IV administration sets at 25% below major brand pricing for regional hospitals', category: 'Cost Leadership' },
      { title: 'Custom OEM Manufacturing', description: 'Flexible manufacturing for private-label and custom IV product requirements', category: 'Manufacturing' },
      { title: 'Regional Hospital Focus', description: 'Dedicated account management for community and critical access hospitals', category: 'Customer Service' }
    ],
    'Vygon': [
      { title: 'Neonatal PICC Specialization', description: 'Market-leading neonatal PICC lines used in 85% of U.S. Level III NICUs', category: 'Neonatal Expertise' },
      { title: 'Clinical Education Support', description: 'NICU nursing education programs improving catheter insertion success rates by 40%', category: 'Education' },
      { title: 'Specialty Line Innovation', description: 'Ultra-low-prime IV sets for pediatric and neonatal fluid-restricted patients', category: 'Specialty Innovation' }
    ],
    'KORU Medical Systems': [
      { title: 'Freedom60 Home Infusion', description: 'Mechanical infusion pump enabling IV immunoglobulin therapy at home', category: 'Home Healthcare' },
      { title: 'Subcutaneous Delivery Platform', description: 'Patented SCIG delivery increasing patient adherence by 65% vs IV alternatives', category: 'Patient Adherence' },
      { title: 'Payer Reimbursement Strategy', description: 'Active J-code reimbursement navigation supporting 1,200+ home infusion pharmacies', category: 'Market Access' }
    ],
    'Others': [
      { title: 'Regional Market Presence', description: 'Serving specialized regional hospital networks with tailored IV product lines', category: 'Regional Focus' },
      { title: 'Niche Product Offerings', description: 'Specialized IV products for specific clinical applications and care settings', category: 'Specialization' },
      { title: 'Value-Driven Solutions', description: 'Cost-competitive IV consumables for budget-constrained healthcare facilities', category: 'Value' }
    ]
  }

  return propositionMap[company] || [
    { title: 'Market Development', description: 'Expanding into new markets and segments', category: 'Market Strategy' },
    { title: 'Product Innovation', description: 'Continuous R&D and product development', category: 'Innovation' },
    { title: 'Strategic Partnerships', description: 'Building alliances for market expansion', category: 'Partnerships' }
  ]
}

// Generate revenue based on market share
function generateRevenue(marketShare: number): { overall: number, segmental: number } {
  // Total market size approximately 5000 USD Mn
  const totalMarketSize = 5000
  const segmentalRevenue = (marketShare / 100) * totalMarketSize
  
  // Overall revenue is typically 3-5x the segmental revenue (company has other products)
  const multiplier = 3 + Math.random() * 2
  const overallRevenue = segmentalRevenue * multiplier
  
  return {
    overall: Math.round(overallRevenue),
    segmental: Math.round(segmentalRevenue)
  }
}

/**
 * Generate competitive intelligence data for all companies
 * Now loads from store, JSON file, or fallback to hardcoded data
 * Can also accept parsed CSV data
 */
export async function generateCompetitiveData(csvData?: Record<string, any>[]): Promise<CompanyData[]> {
  // If CSV data is provided, parse it
  if (csvData && csvData.length > 0) {
    return parseCompetitiveIntelligenceFromData(csvData)
  }
  
  // Try to get data from store first (only in browser environment)
  if (typeof window !== 'undefined') {
    try {
      const { useDashboardStore } = require('./store')
      const store = useDashboardStore.getState()
      
      if (store.competitiveIntelligenceData && store.competitiveIntelligenceData.rows && store.competitiveIntelligenceData.rows.length > 0) {
        console.log('Using competitive intelligence data from store for generateCompetitiveData')
        return parseCompetitiveIntelligenceFromData(store.competitiveIntelligenceData.rows)
      }
    } catch (error) {
      console.warn('Could not access store for competitive intelligence data:', error)
    }
  }
  
  const jsonData = await loadCompetitiveIntelligenceData()
  
  if (jsonData && jsonData.companies) {
    return jsonData.companies
  }
  
  // Fallback to hardcoded data
  return companies.map(company => {
    const revenue = generateRevenue(marketShares[company])
    
    // Generate sample propositions based on company
    const propositions: Proposition[] = generatePropositions(company)
    
    return {
      id: company.toLowerCase().replace(/\s+/g, '-'),
      name: company,
      headquarters: headquarters[company],
      ceo: ceos[company],
      yearEstablished: yearEstablished[company],
      portfolio: portfolios[company],
      strategies: generateStrategies(company),
      regionalStrength: regionalStrengths[company],
      overallRevenue: revenue.overall,
      segmentalRevenue: revenue.segmental,
      marketShare: marketShares[company],
      propositions,
      color: companyColors[company]
    }
  })
}

/**
 * Generate market share data for pie chart
 * Now loads from JSON file, with fallback to hardcoded data
 * Groups smaller companies into "Others" to reduce clutter
 */
export async function generateMarketShareData(showTopN: number = 10): Promise<MarketShareData[]> {
  const jsonData = await loadCompetitiveIntelligenceData()
  
  let allData: MarketShareData[]
  
  if (jsonData && jsonData.market_share_data) {
    allData = jsonData.market_share_data
  } else {
    // Fallback to hardcoded data
    allData = companies.map(company => ({
      company,
      marketShare: marketShares[company],
      color: companyColors[company]
    }))
  }
  
  // Sort by market share (descending)
  const sorted = [...allData].sort((a, b) => b.marketShare - a.marketShare)
  
  // Take top N companies
  const topCompanies = sorted.slice(0, showTopN)
  
  // Group the rest into "Others"
  const othersShare = sorted.slice(showTopN).reduce((sum, c) => sum + c.marketShare, 0)
  
  if (othersShare > 0) {
    topCompanies.push({
      company: 'Others',
      marketShare: othersShare,
      color: '#94a3b8' // Gray color for Others
    })
  }
  
  return topCompanies
}

/**
 * Get top companies by market share
 */
export async function getTopCompanies(limit: number = 5): Promise<CompanyData[]> {
  const allCompanies = await generateCompetitiveData()
  return allCompanies
    .filter(c => c.name !== 'Others')
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, limit)
}

/**
 * Calculate market concentration (HHI - Herfindahl-Hirschman Index)
 */
export function calculateMarketConcentration(): { hhi: number; concentration: string } {
  const shares = Object.values(marketShares)
  const hhi = shares.reduce((sum, share) => sum + Math.pow(share, 2), 0)
  
  let concentration = 'Competitive'
  if (hhi < 1500) {
    concentration = 'Competitive'
  } else if (hhi < 2500) {
    concentration = 'Moderately Concentrated'
  } else {
    concentration = 'Highly Concentrated'
  }
  
  return { hhi: Math.round(hhi), concentration }
}

/**
 * Get company comparison data for competitive dashboard
 * Now includes propositions with parent/child header structure
 */
export async function getCompanyComparison(): Promise<{
  headers: string[];
  rows: { 
    label: string; 
    values: (string | number)[]; 
    section?: string; // Parent section header
    isProposition?: boolean; // Flag for proposition rows
  }[];
  sections?: string[]; // List of section headers
}> {
  const companies = (await generateCompetitiveData()).slice(0, 10) // Top 10 companies
  
  const headers = companies.map(c => c.name)
  
  // Find maximum number of propositions across all companies
  const maxPropositions = Math.max(
    ...companies.map(c => c.propositions?.length || 0),
    3 // Default to 3 if no propositions
  )
  
  const rows: { 
    label: string; 
    values: (string | number)[]; 
    section?: string;
    isProposition?: boolean;
  }[] = [
    {
      label: "Headquarters",
      values: companies.map(c => c.headquarters),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Key Management (CEO)",
      values: companies.map(c => c.ceo),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Year of Establishment",
      values: companies.map(c => c.yearEstablished || 'N/A'),
      section: "COMPANY INFORMATION"
    },
    {
      label: "Product/Service Portfolio",
      values: companies.map(c => c.portfolio),
      section: "PRODUCT & SERVICES"
    },
    {
      label: "Strategies/Recent Developments",
      values: companies.map(c => c.strategies.join(', ')),
      section: "STRATEGY & DEVELOPMENT"
    },
    {
      label: "Regional Strength",
      values: companies.map(c => c.regionalStrength),
      section: "MARKET PRESENCE"
    },
    {
      label: "Overall Revenue (USD Mn)",
      values: companies.map(c => c.overallRevenue.toLocaleString()),
      section: "FINANCIAL METRICS"
    },
    {
      label: "Segmental Revenue (USD Mn), 2024",
      values: companies.map(c => c.segmentalRevenue.toLocaleString()),
      section: "FINANCIAL METRICS"
    },
    {
      label: "Market Share (%)",
      values: companies.map(c => c.marketShare.toFixed(1) + '%'),
      section: "FINANCIAL METRICS"
    }
  ]
  
  // Add proposition rows dynamically
  if (maxPropositions > 0) {
    for (let i = 0; i < maxPropositions; i++) {
      const propIndex = i + 1
      
      // Proposition Title row
      rows.push({
        label: `Proposition ${propIndex} - Title`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.title || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
      
      // Proposition Description row
      rows.push({
        label: `Proposition ${propIndex} - Description`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.description || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
      
      // Proposition Category row
      rows.push({
        label: `Proposition ${propIndex} - Category`,
        values: companies.map(c => {
          const prop = c.propositions?.[i]
          return prop?.category || 'N/A'
        }),
        section: "VALUE PROPOSITIONS",
        isProposition: true
      })
    }
  }
  
  // Extract unique sections
  const sections = Array.from(new Set(rows.map(r => r.section).filter(Boolean))) as string[]
  
  return { headers, rows, sections }
}
