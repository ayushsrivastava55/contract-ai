'use client';

import { useState } from 'react';

interface RiskFactor {
  id: string;
  name: string;
  category: 'financial' | 'legal' | 'operational' | 'regulatory' | 'external';
  score: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'low' | 'medium' | 'high';
  description: string;
  mitigation?: string;
}

interface ContractRisk {
  contractId: string;
  contractName: string;
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  lastAssessed: string;
  trend: 'improving' | 'stable' | 'deteriorating';
}

export default function RiskScoringEngine() {
  const [selectedContract, setSelectedContract] = useState<string>('');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'trends'>('overview');

  const contractRisks: ContractRisk[] = [
    {
      contractId: '1',
      contractName: 'Metro Rail Project Agreement - Phase 1',
      overallScore: 72,
      riskLevel: 'high',
      lastAssessed: '2024-10-01',
      trend: 'deteriorating',
      factors: [
        {
          id: '1-1',
          name: 'Payment Default Risk',
          category: 'financial',
          score: 65,
          impact: 'critical',
          likelihood: 'medium',
          description: 'Risk of delayed payments due to cash flow constraints',
          mitigation: 'Establish letter of credit, milestone-based payments'
        },
        {
          id: '1-2',
          name: 'Force Majeure Exposure',
          category: 'external',
          score: 80,
          impact: 'high',
          likelihood: 'high',
          description: 'High exposure to external events affecting project timeline',
          mitigation: 'Comprehensive force majeure clause, insurance coverage'
        },
        {
          id: '1-3',
          name: 'Regulatory Compliance Gap',
          category: 'regulatory',
          score: 55,
          impact: 'medium',
          likelihood: 'medium',
          description: 'Potential gaps in environmental and safety compliance',
          mitigation: 'Regular compliance audits, updated clearances'
        },
        {
          id: '1-4',
          name: 'Performance Penalty Exposure',
          category: 'operational',
          score: 70,
          impact: 'high',
          likelihood: 'medium',
          description: 'Significant penalties for construction delays',
          mitigation: 'Realistic timelines, contingency planning'
        }
      ]
    },
    {
      contractId: '2',
      contractName: 'Solar Energy Plant Construction Contract',
      overallScore: 45,
      riskLevel: 'medium',
      lastAssessed: '2024-09-28',
      trend: 'improving',
      factors: [
        {
          id: '2-1',
          name: 'Technology Risk',
          category: 'operational',
          score: 40,
          impact: 'medium',
          likelihood: 'low',
          description: 'Risk of solar panel technology obsolescence',
          mitigation: 'Technology upgrade clauses, performance guarantees'
        },
        {
          id: '2-2',
          name: 'Weather Dependency',
          category: 'external',
          score: 50,
          impact: 'medium',
          likelihood: 'medium',
          description: 'Energy output dependent on weather conditions',
          mitigation: 'Weather insurance, conservative output projections'
        },
        {
          id: '2-3',
          name: 'Grid Connection Risk',
          category: 'regulatory',
          score: 45,
          impact: 'high',
          likelihood: 'low',
          description: 'Potential delays in grid connection approval',
          mitigation: 'Early engagement with grid operators, backup plans'
        }
      ]
    },
    {
      contractId: '3',
      contractName: 'Highway Development BOT Agreement',
      overallScore: 58,
      riskLevel: 'medium',
      lastAssessed: '2024-09-25',
      trend: 'stable',
      factors: [
        {
          id: '3-1',
          name: 'Traffic Volume Risk',
          category: 'financial',
          score: 60,
          impact: 'critical',
          likelihood: 'medium',
          description: 'Revenue dependent on traffic volume projections',
          mitigation: 'Government revenue guarantees, toll adjustments'
        },
        {
          id: '3-2',
          name: 'Land Acquisition Delays',
          category: 'regulatory',
          score: 55,
          impact: 'high',
          likelihood: 'medium',
          description: 'Potential delays in land acquisition process',
          mitigation: 'Early land acquisition, alternative route planning'
        }
      ]
    }
  ];

  const riskCategories = [
    { id: 'financial', name: 'Financial', icon: '💰', color: 'blue' },
    { id: 'legal', name: 'Legal', icon: '⚖️', color: 'purple' },
    { id: 'operational', name: 'Operational', icon: '🔧', color: 'orange' },
    { id: 'regulatory', name: 'Regulatory', icon: '📋', color: 'green' },
    { id: 'external', name: 'External', icon: '🌍', color: 'red' }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-200';
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-600';
    if (score >= 50) return 'text-orange-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'deteriorating': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getCategoryAverageScore = (category: string) => {
    const allFactors = contractRisks.flatMap(contract => contract.factors);
    const categoryFactors = allFactors.filter(factor => factor.category === category);
    if (categoryFactors.length === 0) return 0;
    return Math.round(categoryFactors.reduce((sum, factor) => sum + factor.score, 0) / categoryFactors.length);
  };

  const selectedContractData = contractRisks.find(c => c.contractId === selectedContract);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Risk Scoring Engine</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'overview'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Portfolio Overview
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Detailed Analysis
            </button>
            <button
              onClick={() => setViewMode('trends')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'trends'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Risk Trends
            </button>
          </div>
        </div>

        {/* Portfolio Risk Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(contractRisks.reduce((sum, c) => sum + c.overallScore, 0) / contractRisks.length)}
                </div>
                <div className="text-sm opacity-90">Avg Portfolio Risk</div>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🚨</div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {contractRisks.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical').length}
                </div>
                <div className="text-sm text-red-700">High Risk Contracts</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📉</div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {contractRisks.filter(c => c.trend === 'deteriorating').length}
                </div>
                <div className="text-sm text-orange-700">Deteriorating Trend</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">💰</div>
              <div>
                <div className="text-2xl font-bold text-green-600">₹2.1K Cr</div>
                <div className="text-sm text-green-700">Value at Risk</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Risk Category Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Category Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {riskCategories.map((category) => {
                const avgScore = getCategoryAverageScore(category.id);
                return (
                  <div key={category.id} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="font-medium text-gray-900 mb-1">{category.name}</div>
                    <div className={`text-2xl font-bold ${getRiskScoreColor(avgScore)}`}>
                      {avgScore}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          avgScore >= 75 ? 'bg-red-500' :
                          avgScore >= 50 ? 'bg-orange-500' :
                          avgScore >= 25 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contract Risk Scores */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Risk Scores</h3>
            <div className="space-y-4">
              {contractRisks.map((contract) => (
                <div key={contract.contractId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{contract.contractName}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(contract.riskLevel)}`}>
                          {contract.riskLevel.toUpperCase()} RISK
                        </span>
                        <span className="text-lg">{getTrendIcon(contract.trend)}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Last assessed: {contract.lastAssessed} • Trend: {contract.trend}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getRiskScoreColor(contract.overallScore)}`}>
                          {contract.overallScore}
                        </div>
                        <div className="text-sm text-gray-500">Risk Score</div>
                      </div>
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={
                              contract.overallScore >= 75 ? '#dc2626' :
                              contract.overallScore >= 50 ? '#ea580c' :
                              contract.overallScore >= 25 ? '#d97706' : '#16a34a'
                            }
                            strokeWidth="2"
                            strokeDasharray={`${contract.overallScore}, 100`}
                          />
                        </svg>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedContract(contract.contractId);
                          setViewMode('detailed');
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'detailed' && (
        <div className="space-y-6">
          {/* Contract Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Select Contract:</label>
              <select
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Choose a contract...</option>
                {contractRisks.map((contract) => (
                  <option key={contract.contractId} value={contract.contractId}>
                    {contract.contractName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedContractData && (
            <>
              {/* Contract Risk Overview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedContractData.contractName}</h3>
                    <div className="text-sm text-gray-600">
                      Overall Risk Score: <span className={`font-bold ${getRiskScoreColor(selectedContractData.overallScore)}`}>
                        {selectedContractData.overallScore}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full font-medium ${getRiskLevelColor(selectedContractData.riskLevel)}`}>
                      {selectedContractData.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="text-2xl">{getTrendIcon(selectedContractData.trend)}</span>
                  </div>
                </div>

                {/* Risk Factors Breakdown */}
                <div className="space-y-4">
                  {selectedContractData.factors.map((factor) => (
                    <div key={factor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-xl">
                              {riskCategories.find(cat => cat.id === factor.category)?.icon}
                            </span>
                            <h4 className="font-medium text-gray-900">{factor.name}</h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {factor.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                          {factor.mitigation && (
                            <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                              <strong>Mitigation:</strong> {factor.mitigation}
                            </div>
                          )}
                        </div>

                        <div className="text-right ml-4">
                          <div className={`text-2xl font-bold ${getRiskScoreColor(factor.score)}`}>
                            {factor.score}
                          </div>
                          <div className="text-xs text-gray-500 mb-2">Risk Score</div>
                          <div className="space-y-1 text-xs">
                            <div className={`px-2 py-1 rounded ${getRiskLevelColor(factor.impact)}`}>
                              Impact: {factor.impact}
                            </div>
                            <div className={`px-2 py-1 rounded ${getRiskLevelColor(factor.likelihood)}`}>
                              Likelihood: {factor.likelihood}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            factor.score >= 75 ? 'bg-red-500' :
                            factor.score >= 50 ? 'bg-orange-500' :
                            factor.score >= 25 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <span className="text-red-600">🚨</span>
                    <div className="flex-1">
                      <div className="font-medium text-red-900">Immediate: Review payment default mitigation</div>
                      <div className="text-sm text-red-700">High financial risk detected - implement additional safeguards</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-600">⚠️</span>
                    <div className="flex-1">
                      <div className="font-medium text-orange-900">This Week: Update force majeure insurance</div>
                      <div className="text-sm text-orange-700">Ensure comprehensive coverage for external events</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600">📋</span>
                    <div className="flex-1">
                      <div className="font-medium text-yellow-900">This Month: Compliance audit</div>
                      <div className="text-sm text-yellow-700">Schedule comprehensive regulatory compliance review</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {viewMode === 'trends' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends Analysis</h3>

          {/* Trend Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {contractRisks.filter(c => c.trend === 'improving').length}
              </div>
              <div className="text-sm text-green-700">Improving Contracts</div>
              <div className="text-lg mt-2">📈</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {contractRisks.filter(c => c.trend === 'stable').length}
              </div>
              <div className="text-sm text-gray-700">Stable Contracts</div>
              <div className="text-lg mt-2">➡️</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {contractRisks.filter(c => c.trend === 'deteriorating').length}
              </div>
              <div className="text-sm text-red-700">Deteriorating Contracts</div>
              <div className="text-lg mt-2">📉</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-medium text-blue-900 mb-3">Risk Management Insights</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Financial risks have increased by 15% over the last quarter</li>
              <li>• External risk factors show highest volatility due to regulatory changes</li>
              <li>• Operational risks have been successfully mitigated in 2 out of 3 contracts</li>
              <li>• Proactive compliance management has reduced regulatory risks by 20%</li>
              <li>• Recommendation: Focus on financial risk mitigation strategies</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}