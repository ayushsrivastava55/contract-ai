// Core contract data types based on PRD requirements

export interface ContractMetadata {
  id: string;
  name: string;
  type: 'infrastructure' | 'renewables' | 'transmission' | 'roadways' | 'metro' | 'airport';
  uploadDate: string;
  fileSize: number;
  filePath: string;
  status: 'uploading' | 'parsing' | 'analyzing' | 'completed' | 'error';
  totalPages: number;
  parsingProgress: number;
  analysisProgress: number;
}

export interface ContractObligation {
  id: string;
  contractId: string;
  type: 'payment' | 'delivery' | 'performance' | 'compliance' | 'reporting';
  description: string;
  dueDate: string;
  responsible: 'contractor' | 'client' | 'both';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  penalties?: {
    type: 'liquidated_damages' | 'penalty' | 'interest';
    amount: number;
    currency: string;
    calculation: string;
  };
  milestoneId?: string;
}

export interface ContractMilestone {
  id: string;
  contractId: string;
  name: string;
  description: string;
  targetDate: string;
  actualDate?: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'delayed';
  dependencies: string[];
  paymentTrigger?: {
    amount: number;
    currency: string;
    conditions: string[];
  };
  performanceGuarantees: string[];
}

export interface ContractClause {
  id: string;
  contractId: string;
  title: string;
  content: string;
  section: string;
  pageNumber: number;
  category: 'financial' | 'legal' | 'operational' | 'regulatory' | 'external';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  extractedEntities: {
    dates: string[];
    amounts: { value: number; currency: string; context: string }[];
    parties: string[];
    locations: string[];
    percentages: number[];
  };
  aiAnalysis: {
    sentiment: 'positive' | 'neutral' | 'negative';
    complexity: 'low' | 'medium' | 'high';
    clarity: number; // 0-100 score
    suggestedActions: string[];
    potentialIssues: string[];
  };
}

export interface RiskAssessment {
  contractId: string;
  overallScore: number; // 0-100
  lastAssessed: string;
  trend: 'improving' | 'stable' | 'deteriorating';
  categories: {
    financial: {
      score: number;
      factors: RiskFactor[];
    };
    legal: {
      score: number;
      factors: RiskFactor[];
    };
    operational: {
      score: number;
      factors: RiskFactor[];
    };
    regulatory: {
      score: number;
      factors: RiskFactor[];
    };
    external: {
      score: number;
      factors: RiskFactor[];
    };
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'low' | 'medium' | 'high';
  score: number;
  evidence: string[];
  mitigation: string[];
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved';
}

export interface UserLens {
  userId: string;
  role: 'legal' | 'finance' | 'operations' | 'management';
  preferences: {
    priorityCategories: string[];
    alertThresholds: {
      risk: number;
      deadline: number; // days
      amount: number; // currency amount
    };
    dashboardLayout: string[];
    reportingFrequency: 'daily' | 'weekly' | 'monthly';
  };
  accessLevel: 'read' | 'write' | 'admin';
}

export interface ContractAnalytics {
  contractId: string;
  financialMetrics: {
    totalValue: { amount: number; currency: string };
    paidToDate: { amount: number; currency: string };
    pendingPayments: { amount: number; currency: string };
    projectedCashFlow: Array<{
      date: string;
      inflow: number;
      outflow: number;
    }>;
    costOverruns: number;
    profitMargin: number;
  };
  performanceMetrics: {
    completionPercentage: number;
    scheduleVariance: number; // days ahead/behind
    qualityScore: number;
    complianceScore: number;
    keyMilestones: {
      completed: number;
      pending: number;
      delayed: number;
    };
  };
  complianceStatus: {
    regulatory: {
      environmental: 'compliant' | 'partial' | 'non_compliant';
      safety: 'compliant' | 'partial' | 'non_compliant';
      labor: 'compliant' | 'partial' | 'non_compliant';
    };
    contractual: {
      reporting: 'up_to_date' | 'delayed' | 'missing';
      insurance: 'valid' | 'expiring' | 'expired';
      bonds: 'valid' | 'expiring' | 'expired';
    };
  };
}

export interface AIInsight {
  id: string;
  contractId: string;
  type: 'risk' | 'opportunity' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  evidence: string[];
  suggestedActions: string[];
  createdAt: string;
  status: 'new' | 'acknowledged' | 'addressed' | 'dismissed';
}

export interface ContractComparison {
  id: string;
  contracts: string[]; // contract IDs
  comparisonType: 'clause_by_clause' | 'risk_assessment' | 'financial_terms' | 'timeline';
  results: {
    similarities: Array<{
      clauseType: string;
      similarity: number;
      contracts: string[];
    }>;
    differences: Array<{
      clauseType: string;
      variations: Array<{
        contractId: string;
        content: string;
        riskImplication: string;
      }>;
    }>;
    recommendations: string[];
  };
  createdAt: string;
}

export interface NotificationRule {
  id: string;
  userId: string;
  name: string;
  type: 'deadline' | 'risk_threshold' | 'milestone' | 'payment' | 'compliance';
  conditions: {
    triggerDays?: number;
    riskScore?: number;
    amount?: number;
    contractTypes?: string[];
    categories?: string[];
  };
  actions: {
    email?: boolean;
    inApp?: boolean;
    webhook?: string;
  };
  enabled: boolean;
  lastTriggered?: string;
}