// Contract data service for managing contract data
import {
  ContractMetadata,
  ContractClause,
  ContractObligation,
  ContractMilestone,
  RiskAssessment,
  AIInsight,
  ContractAnalytics,
  UserLens
} from '../types/contract';
import { aiService } from './aiService';

class ContractService {
  private contracts: Map<string, ContractMetadata> = new Map();
  private clauses: Map<string, ContractClause[]> = new Map();
  private obligations: Map<string, ContractObligation[]> = new Map();
  private milestones: Map<string, ContractMilestone[]> = new Map();
  private riskAssessments: Map<string, RiskAssessment> = new Map();
  private insights: Map<string, AIInsight[]> = new Map();

  constructor() {
    // Initialize with some sample data
    this.initializeSampleData();
  }

  // Upload and process new contract
  async uploadContract(file: File, metadata: Partial<ContractMetadata>): Promise<string> {
    const contractId = `contract-${Date.now()}`;

    const contractMeta: ContractMetadata = {
      id: contractId,
      name: file.name.replace(/\.[^/.]+$/, ""),
      type: metadata.type || 'infrastructure',
      uploadDate: new Date().toISOString(),
      fileSize: file.size,
      filePath: `/uploads/${contractId}/${file.name}`,
      status: 'uploading',
      totalPages: 0,
      parsingProgress: 0,
      analysisProgress: 0
    };

    this.contracts.set(contractId, contractMeta);

    // Simulate file upload and processing
    this.processContract(contractId, file);

    return contractId;
  }

  private async processContract(contractId: string, file: File): Promise<void> {
    try {
      // Update status to parsing
      this.updateContractStatus(contractId, 'parsing', 0, 0);

      // Parse contract using AI
      const parseResult = await aiService.parseContract(file);

      // Update progress
      this.updateContractStatus(contractId, 'analyzing', 100, 0);

      // Store parsed data
      const clauses = parseResult.clauses.map(clause => ({
        ...clause,
        contractId
      }));

      const obligations = parseResult.obligations.map(obligation => ({
        ...obligation,
        contractId
      }));

      const milestones = parseResult.milestones.map(milestone => ({
        ...milestone,
        contractId
      }));

      this.clauses.set(contractId, clauses);
      this.obligations.set(contractId, obligations);
      this.milestones.set(contractId, milestones);

      // Perform risk analysis
      const riskAssessment = await aiService.analyzeRisk(contractId, clauses);
      this.riskAssessments.set(contractId, riskAssessment);

      // Generate AI insights
      const insights = await aiService.generateInsights(contractId, clauses);
      this.insights.set(contractId, insights);

      // Update final status
      this.updateContractStatus(contractId, 'completed', 100, 100);

      // Update contract metadata
      const contract = this.contracts.get(contractId);
      if (contract) {
        contract.totalPages = parseResult.metadata.totalPages;
        this.contracts.set(contractId, contract);
      }

    } catch (error) {
      console.error('Contract processing failed:', error);
      this.updateContractStatus(contractId, 'error', 0, 0);
    }
  }

  private updateContractStatus(
    contractId: string,
    status: ContractMetadata['status'],
    parsingProgress: number,
    analysisProgress: number
  ): void {
    const contract = this.contracts.get(contractId);
    if (contract) {
      contract.status = status;
      contract.parsingProgress = parsingProgress;
      contract.analysisProgress = analysisProgress;
      this.contracts.set(contractId, contract);
    }
  }

  // Get all contracts
  getContracts(): ContractMetadata[] {
    return Array.from(this.contracts.values());
  }

  // Get contract by ID
  getContract(contractId: string): ContractMetadata | undefined {
    return this.contracts.get(contractId);
  }

  // Get contract clauses
  getContractClauses(contractId: string): ContractClause[] {
    return this.clauses.get(contractId) || [];
  }

  // Get contract obligations
  getContractObligations(contractId: string): ContractObligation[] {
    return this.obligations.get(contractId) || [];
  }

  // Get contract milestones
  getContractMilestones(contractId: string): ContractMilestone[] {
    return this.milestones.get(contractId) || [];
  }

  // Get risk assessment
  getRiskAssessment(contractId: string): RiskAssessment | undefined {
    return this.riskAssessments.get(contractId);
  }

  // Get AI insights
  getInsights(contractId: string): AIInsight[] {
    return this.insights.get(contractId) || [];
  }

  // Get all risk assessments for portfolio view
  getAllRiskAssessments(): RiskAssessment[] {
    return Array.from(this.riskAssessments.values());
  }

  // Get portfolio analytics
  getPortfolioAnalytics(): any {
    const contracts = this.getContracts();
    const riskAssessments = this.getAllRiskAssessments();

    return {
      totalContracts: contracts.length,
      totalValue: this.calculateTotalValue(),
      averageRiskScore: this.calculateAverageRiskScore(),
      contractsByType: this.groupContractsByType(),
      riskDistribution: this.calculateRiskDistribution(),
      upcomingDeadlines: this.getUpcomingDeadlines(),
      alertCounts: this.getAlertCounts()
    };
  }

  // Search contracts
  async searchContracts(query: string, filters: any = {}): Promise<any> {
    // Use AI service for semantic search
    return aiService.searchContracts(query, filters);
  }

  // Compare contracts
  async compareContracts(contractIds: string[]): Promise<any> {
    return aiService.compareContracts(contractIds);
  }

  // Get user-specific view
  getUserView(userId: string, role: UserLens['role']): any {
    const contracts = this.getContracts();
    const riskAssessments = this.getAllRiskAssessments();

    switch (role) {
      case 'legal':
        return this.getLegalView(contracts, riskAssessments);
      case 'finance':
        return this.getFinanceView(contracts, riskAssessments);
      case 'operations':
        return this.getOperationsView(contracts, riskAssessments);
      case 'management':
        return this.getManagementView(contracts, riskAssessments);
      default:
        return this.getManagementView(contracts, riskAssessments);
    }
  }

  private getLegalView(contracts: ContractMetadata[], risks: RiskAssessment[]): any {
    return {
      complianceIssues: this.getComplianceIssues(),
      disputeRisks: this.getDisputeRisks(),
      contractualGaps: this.getContractualGaps(),
      upcomingRenewals: this.getUpcomingRenewals(),
      arbitrationClauses: this.getArbitrationStatus()
    };
  }

  private getFinanceView(contracts: ContractMetadata[], risks: RiskAssessment[]): any {
    return {
      totalPortfolioValue: this.calculateTotalValue(),
      cashFlowProjections: this.getCashFlowProjections(),
      paymentRisks: this.getPaymentRisks(),
      costOverruns: this.getCostOverruns(),
      profitabilityMetrics: this.getProfitabilityMetrics()
    };
  }

  private getOperationsView(contracts: ContractMetadata[], risks: RiskAssessment[]): any {
    return {
      projectProgress: this.getProjectProgress(),
      milestoneStatus: this.getMilestoneStatus(),
      resourceAllocation: this.getResourceAllocation(),
      performanceMetrics: this.getPerformanceMetrics(),
      upcomingDeadlines: this.getUpcomingDeadlines()
    };
  }

  private getManagementView(contracts: ContractMetadata[], risks: RiskAssessment[]): any {
    return {
      executiveSummary: this.getExecutiveSummary(),
      keyRisks: this.getTopRisks(),
      financialOverview: this.getFinancialOverview(),
      performanceOverview: this.getPerformanceOverview(),
      strategicRecommendations: this.getStrategicRecommendations()
    };
  }

  // Helper methods for calculations
  private calculateTotalValue(): { amount: number; currency: string } {
    // Mock calculation - in production, this would sum actual contract values
    return { amount: 28470000000, currency: 'INR' }; // ₹2,847 Cr
  }

  private calculateAverageRiskScore(): number {
    const risks = this.getAllRiskAssessments();
    if (risks.length === 0) return 0;
    return Math.round(risks.reduce((sum, risk) => sum + risk.overallScore, 0) / risks.length);
  }

  private groupContractsByType(): Record<string, number> {
    const contracts = this.getContracts();
    return contracts.reduce((acc, contract) => {
      acc[contract.type] = (acc[contract.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private calculateRiskDistribution(): Record<string, number> {
    const risks = this.getAllRiskAssessments();
    return risks.reduce((acc, risk) => {
      const level = this.getRiskLevel(risk.overallScore);
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private getRiskLevel(score: number): string {
    if (score >= 75) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 25) return 'medium';
    return 'low';
  }

  private getUpcomingDeadlines(): any[] {
    // Mock data - would aggregate from actual obligations and milestones
    return [
      {
        type: 'payment',
        description: 'Metro Rail Milestone 3 Payment',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        amount: { value: 450000000, currency: 'INR' },
        priority: 'high'
      }
    ];
  }

  private getAlertCounts(): Record<string, number> {
    return {
      critical: 3,
      high: 7,
      medium: 12,
      low: 5
    };
  }

  // Additional helper methods would be implemented here
  private getComplianceIssues(): any[] { return []; }
  private getDisputeRisks(): any[] { return []; }
  private getContractualGaps(): any[] { return []; }
  private getUpcomingRenewals(): any[] { return []; }
  private getArbitrationStatus(): any[] { return []; }
  private getCashFlowProjections(): any[] { return []; }
  private getPaymentRisks(): any[] { return []; }
  private getCostOverruns(): any[] { return []; }
  private getProfitabilityMetrics(): any { return {}; }
  private getProjectProgress(): any[] { return []; }
  private getMilestoneStatus(): any { return {}; }
  private getResourceAllocation(): any[] { return []; }
  private getPerformanceMetrics(): any { return {}; }
  private getExecutiveSummary(): any { return {}; }
  private getTopRisks(): any[] { return []; }
  private getFinancialOverview(): any { return {}; }
  private getPerformanceOverview(): any { return {}; }
  private getStrategicRecommendations(): any[] { return []; }

  private initializeSampleData(): void {
    // Initialize with some sample contracts for demo
    const sampleContract: ContractMetadata = {
      id: 'contract-sample-1',
      name: 'Metro Rail Project Agreement - Phase 1',
      type: 'metro',
      uploadDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      fileSize: 2400000,
      filePath: '/uploads/sample/metro-rail-phase1.pdf',
      status: 'completed',
      totalPages: 150,
      parsingProgress: 100,
      analysisProgress: 100
    };

    this.contracts.set(sampleContract.id, sampleContract);
  }
}

export const contractService = new ContractService();