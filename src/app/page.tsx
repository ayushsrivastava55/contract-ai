'use client';

import { useState } from 'react';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const businessImpacts = [
    {
      id: 'insights',
      icon: '🔍',
      title: 'Generate multiple insights and answers at once',
      description: 'AI-powered analysis of contract terms, obligations, and risks'
    },
    {
      id: 'risk',
      icon: '⚠️',
      title: 'Immediately identify and prioritize contract risk',
      description: 'Real-time risk assessment with severity scoring'
    },
    {
      id: 'terms',
      icon: '📄',
      title: 'Expose specific terms, language and phrases',
      description: 'Advanced search and extraction of contract clauses'
    },
    {
      id: 'alerts',
      icon: '🔔',
      title: 'Manage time-based contract events with smart alerts',
      description: 'Automated notifications for deadlines and milestones'
    }
  ];

  const features = [
    {
      id: 'explorer',
      title: 'Contract Explorer',
      description: 'Your contract landscape in one place with full visibility',
      icon: '📊'
    },
    {
      id: 'comparison',
      title: 'Contract Comparison',
      description: 'Compare and contrast contracts',
      icon: '⚖️'
    },
    {
      id: 'search',
      title: 'Search and Filter',
      description: 'Access relevant contract information with high accuracy',
      icon: '🔍'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Customizable user friendly interface',
      icon: '📈'
    },
    {
      id: 'alerts',
      title: 'Alerts',
      description: 'Real time, standard and custom contract alerts (auto renewals, end dates, etc.)',
      icon: '🚨'
    },
    {
      id: 'risk-engine',
      title: 'Risk Scoring Engine',
      description: 'View and understand risks enabling proactive management',
      icon: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📋</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Contract<span className="text-yellow-500">AI</span>
              </h1>
            </div>
            <nav className="flex space-x-6">
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Contracts
              </a>
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Analytics
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Accelerate Contract Performance And Value Realization
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered contract analysis platform for large infrastructure projects.
            Parse complex contracts, manage risks, and track performance across legal, operational, and financial domains.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Business Impact Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Impact</h3>
            <div className="space-y-6">
              {businessImpacts.map((impact) => (
                <div key={impact.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-yellow-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl">
                    {impact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{impact.title}</h4>
                    <p className="text-gray-600 text-sm">{impact.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Core Features</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    activeFeature === feature.id ? 'ring-2 ring-yellow-500 bg-yellow-50' : ''
                  }`}
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">{feature.title}</h4>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Details */}
            {activeFeature && (
              <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {features.find(f => f.id === activeFeature)?.title}
                  </h4>
                  <button
                    onClick={() => setActiveFeature(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  {activeFeature === 'explorer' && (
                    <div>
                      <p className="text-gray-600 mb-4">Upload and analyze your contracts with AI-powered parsing.</p>
                      <a href="/dashboard" className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                        Upload Contract
                      </a>
                    </div>
                  )}
                  {activeFeature === 'comparison' && (
                    <div>
                      <p className="text-gray-600 mb-4">Side-by-side contract comparison with difference highlighting.</p>
                      <a href="/dashboard" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Compare Contracts
                      </a>
                    </div>
                  )}
                  {activeFeature === 'search' && (
                    <div>
                      <p className="text-gray-600 mb-4">Advanced search across all contract documents and clauses.</p>
                      <input
                        type="text"
                        placeholder="Search contracts..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  {activeFeature === 'dashboard' && (
                    <div>
                      <p className="text-gray-600 mb-4">Customizable dashboards for different stakeholder views.</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-100 p-2 rounded">Legal Team View</div>
                        <div className="bg-gray-100 p-2 rounded">Finance View</div>
                        <div className="bg-gray-100 p-2 rounded">Operations View</div>
                        <div className="bg-gray-100 p-2 rounded">Executive View</div>
                      </div>
                    </div>
                  )}
                  {activeFeature === 'alerts' && (
                    <div>
                      <p className="text-gray-600 mb-4">Real-time notifications for contract events and deadlines.</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Contract renewal in 30 days</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Payment milestone approaching</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeFeature === 'risk-engine' && (
                    <div>
                      <p className="text-gray-600 mb-4">AI-powered risk assessment and scoring for proactive management.</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Overall Risk Score</span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Medium</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full w-3/5"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg p-8 mt-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Contract Management?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join leading infrastructure companies in India using AI to accelerate contract performance
          </p>
          <div className="space-x-4">
            <button className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
