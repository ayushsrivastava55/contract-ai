'use client';

import { useState } from 'react';

interface SearchResult {
  id: string;
  contractName: string;
  clauseTitle: string;
  content: string;
  section: string;
  relevanceScore: number;
  contractType: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface FilterOptions {
  contractTypes: string[];
  riskLevels: string[];
  sections: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    contractTypes: [],
    riskLevels: [],
    sections: [],
    dateRange: { start: '', end: '' }
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      contractName: 'Metro Rail Project Agreement - Phase 1',
      clauseTitle: 'Payment Terms',
      content: 'Payment shall be made within 30 days of invoice receipt. Late payments will incur a penalty of 1.5% per month on the outstanding amount.',
      section: 'Financial Terms',
      relevanceScore: 95,
      contractType: 'Infrastructure',
      riskLevel: 'medium'
    },
    {
      id: '2',
      contractName: 'Solar Energy Plant Construction Contract',
      clauseTitle: 'Force Majeure Clause',
      content: 'Neither party shall be liable for delays caused by circumstances beyond their control, including natural disasters, pandemics, government actions, or supply chain disruptions.',
      section: 'Risk Management',
      relevanceScore: 87,
      contractType: 'Renewable Energy',
      riskLevel: 'high'
    },
    {
      id: '3',
      contractName: 'Highway Development BOT Agreement',
      clauseTitle: 'Performance Guarantees',
      content: 'The contractor guarantees completion within 24 months of commencement, with liquidated damages of 0.5% per week for delays.',
      section: 'Performance Standards',
      relevanceScore: 82,
      contractType: 'Transportation',
      riskLevel: 'high'
    },
    {
      id: '4',
      contractName: 'Metro Rail Project Agreement - Phase 1',
      clauseTitle: 'Termination Rights',
      content: 'Either party may terminate this agreement with 90 days written notice. Upon termination, all pending payments shall be settled within 60 days.',
      section: 'Contract Lifecycle',
      relevanceScore: 78,
      contractType: 'Infrastructure',
      riskLevel: 'low'
    }
  ];

  const contractTypes = ['Infrastructure', 'Renewable Energy', 'Transportation', 'Airport Development', 'Metro Systems'];
  const riskLevels = ['low', 'medium', 'high'];
  const sections = ['Financial Terms', 'Risk Management', 'Performance Standards', 'Contract Lifecycle', 'Regulatory Compliance'];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      let results = mockResults.filter(result =>
        result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.clauseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.contractName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply filters
      if (activeFilters.contractTypes.length > 0) {
        results = results.filter(result => activeFilters.contractTypes.includes(result.contractType));
      }
      if (activeFilters.riskLevels.length > 0) {
        results = results.filter(result => activeFilters.riskLevels.includes(result.riskLevel));
      }
      if (activeFilters.sections.length > 0) {
        results = results.filter(result => activeFilters.sections.includes(result.section));
      }

      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setActiveFilters(prev => {
      if (category === 'contractTypes' || category === 'riskLevels' || category === 'sections') {
        const currentValues = prev[category] as string[];
        const updatedValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];

        return {
          ...prev,
          [category]: updatedValues
        };
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      contractTypes: [],
      riskLevels: [],
      sections: [],
      dateRange: { start: '', end: '' }
    });
  };

  const getActiveFilterCount = () => {
    return activeFilters.contractTypes.length +
           activeFilters.riskLevels.length +
           activeFilters.sections.length +
           (activeFilters.dateRange.start || activeFilters.dateRange.end ? 1 : 0);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contract Search & Analysis</h2>

        {/* Search Bar */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search contracts, clauses, terms, or specific language..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              🔍
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-500">Quick searches:</span>
          {['payment terms', 'force majeure', 'penalty clause', 'arbitration', 'termination'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                handleSearch();
              }}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <span>Advanced Filters</span>
            <span className={`transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}>
              ⬇️
            </span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contract Types */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Contract Types</h3>
              <div className="space-y-2">
                {contractTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.contractTypes.includes(type)}
                      onChange={() => toggleFilter('contractTypes', type)}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Risk Levels */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Risk Levels</h3>
              <div className="space-y-2">
                {riskLevels.map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.riskLevels.includes(level)}
                      onChange={() => toggleFilter('riskLevels', level)}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contract Sections */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Contract Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <label key={section} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.sections.includes(section)}
                      onChange={() => toggleFilter('sections', section)}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{section}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results ({searchResults.length})
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Risk Level</option>
                <option>Contract Name</option>
                <option>Date</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{result.clauseTitle}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.riskLevel)}`}>
                        {result.riskLevel} risk
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {result.section}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      From: <span className="font-medium">{result.contractName}</span> •
                      Type: <span className="font-medium">{result.contractType}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{result.relevanceScore}%</div>
                      <div className="text-xs text-gray-500">relevance</div>
                    </div>
                    <div className="w-12 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-500 rounded-full"
                        style={{ width: `${result.relevanceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded">
                  {highlightText(result.content, searchQuery)}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-800">View Full Contract</button>
                    <button className="text-green-600 hover:text-green-800">Export Clause</button>
                    <button className="text-purple-600 hover:text-purple-800">Add to Comparison</button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">⭐</button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">🔗</button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">📋</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or removing some filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear all filters and try again
          </button>
        </div>
      )}

      {/* Search Tips */}
      {!searchQuery && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">Search Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use specific terms like &ldquo;payment terms&rdquo;, &ldquo;force majeure&rdquo;, or &ldquo;arbitration&rdquo;</li>
            <li>• Search for monetary amounts like &ldquo;penalty&rdquo; or &ldquo;liquidated damages&rdquo;</li>
            <li>• Look for time-based clauses with terms like &ldquo;30 days&rdquo; or &ldquo;quarterly&rdquo;</li>
            <li>• Use filters to narrow down results by contract type or risk level</li>
            <li>• Search results show relevance scores to help you find the most applicable clauses</li>
          </ul>
        </div>
      )}
    </div>
  );
}