'use client';

import { useState } from 'react';

interface ContractClause {
  id: string;
  title: string;
  content: string;
  section: string;
  differences?: 'added' | 'removed' | 'modified' | 'same';
}

interface Contract {
  id: string;
  name: string;
  clauses: ContractClause[];
}

export default function ContractComparison() {
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [comparisonView, setComparisonView] = useState<'side-by-side' | 'unified'>('side-by-side');

  const availableContracts: Contract[] = [
    {
      id: '1',
      name: 'Metro Rail Project Agreement - Phase 1',
      clauses: [
        {
          id: '1-1',
          title: 'Payment Terms',
          content: 'Payment shall be made within 30 days of invoice receipt. Late payments will incur a penalty of 1.5% per month.',
          section: 'Financial Terms'
        },
        {
          id: '1-2',
          title: 'Force Majeure',
          content: 'Neither party shall be liable for delays caused by circumstances beyond their control, including natural disasters, pandemics, or government actions.',
          section: 'Risk Management'
        },
        {
          id: '1-3',
          title: 'Termination Clause',
          content: 'Either party may terminate this agreement with 90 days written notice. Upon termination, all pending payments shall be settled within 60 days.',
          section: 'Contract Lifecycle'
        }
      ]
    },
    {
      id: '2',
      name: 'Solar Energy Plant Construction Contract',
      clauses: [
        {
          id: '2-1',
          title: 'Payment Terms',
          content: 'Payment shall be made within 45 days of invoice receipt. Late payments will incur a penalty of 2% per month.',
          section: 'Financial Terms',
          differences: 'modified'
        },
        {
          id: '2-2',
          title: 'Force Majeure',
          content: 'Neither party shall be liable for delays caused by circumstances beyond their control, including natural disasters, pandemics, government actions, or supply chain disruptions.',
          section: 'Risk Management',
          differences: 'modified'
        },
        {
          id: '2-3',
          title: 'Performance Guarantees',
          content: 'The contractor guarantees minimum energy output of 95% of projected capacity for the first 5 years of operation.',
          section: 'Performance Standards',
          differences: 'added'
        }
      ]
    },
    {
      id: '3',
      name: 'Highway Development BOT Agreement',
      clauses: [
        {
          id: '3-1',
          title: 'Payment Terms',
          content: 'Milestone-based payments as per schedule. Each milestone payment due within 15 days of completion verification.',
          section: 'Financial Terms',
          differences: 'modified'
        },
        {
          id: '3-2',
          title: 'Environmental Compliance',
          content: 'Contractor must maintain all environmental clearances and comply with updated environmental regulations throughout the project lifecycle.',
          section: 'Regulatory Compliance',
          differences: 'added'
        }
      ]
    }
  ];

  const compareContracts = () => {
    if (selectedContracts.length < 2) return null;

    const contracts = availableContracts.filter(c => selectedContracts.includes(c.id));
    return contracts;
  };

  const getDifferenceColor = (diff: string) => {
    switch (diff) {
      case 'added': return 'bg-green-100 border-l-4 border-green-500';
      case 'removed': return 'bg-red-100 border-l-4 border-red-500';
      case 'modified': return 'bg-yellow-100 border-l-4 border-yellow-500';
      default: return 'bg-white border-l-4 border-gray-300';
    }
  };

  const getDifferenceIcon = (diff: string) => {
    switch (diff) {
      case 'added': return '➕';
      case 'removed': return '➖';
      case 'modified': return '📝';
      default: return '✓';
    }
  };

  const comparedContracts = compareContracts();

  return (
    <div className="space-y-6">
      {/* Contract Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Contracts to Compare</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {availableContracts.map((contract) => (
            <label key={contract.id} className="relative">
              <input
                type="checkbox"
                checked={selectedContracts.includes(contract.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedContracts(prev => [...prev, contract.id]);
                  } else {
                    setSelectedContracts(prev => prev.filter(id => id !== contract.id));
                  }
                }}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedContracts.includes(contract.id)
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{contract.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{contract.clauses.length} clauses</p>
                  </div>
                  {selectedContracts.includes(contract.id) && (
                    <div className="text-yellow-500">✓</div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>

        {selectedContracts.length >= 2 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedContracts.length} contracts selected for comparison
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setComparisonView('side-by-side')}
                className={`px-3 py-1 text-sm rounded ${
                  comparisonView === 'side-by-side'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Side by Side
              </button>
              <button
                onClick={() => setComparisonView('unified')}
                className={`px-3 py-1 text-sm rounded ${
                  comparisonView === 'unified'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Unified View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Results */}
      {comparedContracts && comparedContracts.length >= 2 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Contract Comparison</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Added</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Modified</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Removed</span>
              </div>
            </div>
          </div>

          {comparisonView === 'side-by-side' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {comparedContracts.map((contract) => (
                <div key={contract.id} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg border-b pb-2">
                    {contract.name}
                  </h3>
                  {contract.clauses.map((clause) => (
                    <div key={clause.id} className={`p-4 rounded-lg ${getDifferenceColor(clause.differences || 'same')}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{clause.title}</h4>
                        <span className="text-lg">{getDifferenceIcon(clause.differences || 'same')}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{clause.section}</p>
                      <p className="text-sm text-gray-800">{clause.content}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Unified view - show all unique clauses */}
              {Array.from(new Set(comparedContracts.flatMap(c => c.clauses.map(cl => cl.title)))).map((title, titleIndex) => {
                const clausesForTitle = comparedContracts.map(contract =>
                  contract.clauses.find(clause => clause.title === title)
                ).filter(Boolean);

                return (
                  <div key={`${title}-${titleIndex}`} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">{title}</h4>
                    <div className="space-y-3">
                      {clausesForTitle.map((clause, clauseIndex) => (
                        <div key={`${clause?.id}-${clauseIndex}`} className={`p-3 rounded ${getDifferenceColor(clause?.differences || 'same')}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {comparedContracts.find(c => c.clauses.some(cl => cl.id === clause?.id))?.name}
                            </span>
                            <span className="text-lg">{getDifferenceIcon(clause?.differences || 'same')}</span>
                          </div>
                          <p className="text-sm text-gray-800">{clause?.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Comparison Summary */}
      {comparedContracts && comparedContracts.length >= 2 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {comparedContracts.flatMap(c => c.clauses).filter(cl => cl.differences === 'added').length}
              </div>
              <div className="text-sm text-green-700">Added Clauses</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {comparedContracts.flatMap(c => c.clauses).filter(cl => cl.differences === 'modified').length}
              </div>
              <div className="text-sm text-yellow-700">Modified Clauses</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((comparedContracts.flatMap(c => c.clauses).filter(cl => !cl.differences || cl.differences === 'same').length / comparedContracts.flatMap(c => c.clauses).length) * 100)}%
              </div>
              <div className="text-sm text-blue-700">Similarity Score</div>
            </div>
          </div>
        </div>
      )}

      {selectedContracts.length < 2 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">⚖️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select Contracts to Compare</h3>
          <p className="text-gray-600">Choose at least 2 contracts to see a detailed comparison of their terms and clauses.</p>
        </div>
      )}
    </div>
  );
}