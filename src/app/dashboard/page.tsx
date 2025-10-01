'use client';

import { useState } from 'react';
import ContractExplorer from '../../components/ContractExplorer';
import ContractComparison from '../../components/ContractComparison';
import SearchAndFilter from '../../components/SearchAndFilter';
import AlertsSystem from '../../components/AlertsSystem';
import RiskScoringEngine from '../../components/RiskScoringEngine';

type UserRole = 'legal' | 'finance' | 'operations' | 'management';

// Interface for future dashboard widget configuration
// interface DashboardWidget {
//   id: string;
//   title: string;
//   component: string;
//   roles: UserRole[];
//   priority: number;
// }

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState<UserRole>('management');
  const [activeView, setActiveView] = useState<string>('overview');

  const roles = [
    { id: 'legal' as UserRole, name: 'Legal Team', icon: '⚖️', color: 'blue' },
    { id: 'finance' as UserRole, name: 'Finance/Banking', icon: '💰', color: 'green' },
    { id: 'operations' as UserRole, name: 'Operations/Project', icon: '🔧', color: 'orange' },
    { id: 'management' as UserRole, name: 'Management/Board', icon: '📊', color: 'purple' }
  ];

  // Widget configuration for future dashboard customization
  // const widgets: DashboardWidget[] = [
  //   { id: 'contracts', title: 'Contract Explorer', component: 'explorer', roles: ['legal', 'finance', 'operations', 'management'], priority: 1 },
  //   { id: 'comparison', title: 'Contract Comparison', component: 'comparison', roles: ['legal', 'finance', 'operations'], priority: 2 },
  //   { id: 'risk-overview', title: 'Risk Overview', component: 'risk', roles: ['management', 'finance'], priority: 1 },
  //   { id: 'compliance', title: 'Compliance Dashboard', component: 'compliance', roles: ['legal'], priority: 1 },
  //   { id: 'financials', title: 'Financial Overview', component: 'financials', roles: ['finance'], priority: 1 },
  //   { id: 'operations', title: 'Project Timeline', component: 'timeline', roles: ['operations'], priority: 1 }
  // ];

  // Helper function for future use - getting widgets for specific roles
  // const getRoleWidgets = (role: UserRole) => {
  //   return widgets
  //     .filter(widget => widget.roles.includes(role))
  //     .sort((a, b) => a.priority - b.priority);
  // };

  const renderRoleSpecificContent = () => {
    switch (activeRole) {
      case 'legal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Gaps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-red-900">Arbitration Clause Missing</div>
                    <div className="text-sm text-red-700">Metro Rail Project - Phase 1</div>
                  </div>
                  <span className="text-red-600">⚠️</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium text-yellow-900">Liability Cap Review Required</div>
                    <div className="text-sm text-yellow-700">Solar Energy Plant Contract</div>
                  </div>
                  <span className="text-yellow-600">⚡</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900">All Clauses Compliant</div>
                    <div className="text-sm text-green-700">Highway Development BOT</div>
                  </div>
                  <span className="text-green-600">✅</span>
                </div>
              </div>
            </div>

            {/* Legal Risk Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Risk Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dispute Resolution</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm font-medium text-red-600">75%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Force Majeure Coverage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">50%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Intellectual Property</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-5/6"></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Risk Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Risk Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                  <div>
                    <div className="text-2xl font-bold">₹2,847 Cr</div>
                    <div className="text-sm opacity-90">Total Contract Value</div>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">₹284 Cr</div>
                    <div className="text-xs text-red-700">At Risk Amount</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">₹142 Cr</div>
                    <div className="text-xs text-green-700">Guaranteed Returns</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Flow Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Financial Events</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50">
                  <div>
                    <div className="font-medium text-red-900">Payment Due</div>
                    <div className="text-sm text-red-700">Metro Rail - Milestone 3</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">₹45 Cr</div>
                    <div className="text-xs text-red-700">Due in 7 days</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50">
                  <div>
                    <div className="font-medium text-yellow-900">Performance Guarantee</div>
                    <div className="text-sm text-yellow-700">Solar Plant Construction</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-600">₹12 Cr</div>
                    <div className="text-xs text-yellow-700">Due in 15 days</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div>
                    <div className="font-medium text-blue-900">Revenue Recognition</div>
                    <div className="text-sm text-blue-700">Highway BOT - Q1</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">₹28 Cr</div>
                    <div className="text-xs text-blue-700">Due in 22 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'operations':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Site Preparation Completed</div>
                    <div className="text-sm text-gray-500">Metro Rail Project - Phase 1</div>
                  </div>
                  <div className="text-sm text-green-600">✅</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Foundation Work (85%)</div>
                    <div className="text-sm text-gray-500">Solar Energy Plant</div>
                  </div>
                  <div className="text-sm text-blue-600">🔄</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Environmental Clearance</div>
                    <div className="text-sm text-gray-500">Highway Development BOT</div>
                  </div>
                  <div className="text-sm text-yellow-600">⏳</div>
                </div>
              </div>
            </div>

            {/* Resource Dependencies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Material Procurement</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Labor Allocation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-3/5"></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Equipment Deployment</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-2/5"></div>
                    </div>
                    <span className="text-sm font-medium text-red-600">40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: // management
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Executive Summary */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Dashboard</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-blue-700">Active Contracts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹2.8K Cr</div>
                  <div className="text-sm text-green-700">Total Value</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">7</div>
                  <div className="text-sm text-yellow-700">High Risk</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-red-700">Urgent Actions</div>
                </div>
              </div>

              {/* Risk Heatmap */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Risk Heatmap by Category</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="p-3 bg-red-100 rounded text-center">
                    <div className="text-sm font-medium text-red-800">Financial</div>
                    <div className="text-xs text-red-600">High Risk</div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded text-center">
                    <div className="text-sm font-medium text-yellow-800">Legal</div>
                    <div className="text-xs text-yellow-600">Medium Risk</div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded text-center">
                    <div className="text-sm font-medium text-yellow-800">Operational</div>
                    <div className="text-xs text-yellow-600">Medium Risk</div>
                  </div>
                  <div className="p-3 bg-green-100 rounded text-center">
                    <div className="text-sm font-medium text-green-800">Compliance</div>
                    <div className="text-xs text-green-600">Low Risk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  <div className="font-medium text-red-900">Review Critical Alerts</div>
                  <div className="text-sm text-red-700">3 contracts need attention</div>
                </button>
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-medium text-blue-900">Schedule Board Review</div>
                  <div className="text-sm text-blue-700">Q1 contract performance</div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="font-medium text-green-900">Export Reports</div>
                  <div className="text-sm text-green-700">Generate stakeholder updates</div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

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
                Contract<span className="text-yellow-500">AI</span> Dashboard
              </h1>
            </div>
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveView('overview')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'overview' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveView('explorer')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'explorer' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Contract Explorer
              </button>
              <button
                onClick={() => setActiveView('comparison')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'comparison' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Compare Contracts
              </button>
              <button
                onClick={() => setActiveView('search')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'search' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Search & Filter
              </button>
              <button
                onClick={() => setActiveView('alerts')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'alerts' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Alerts
              </button>
              <button
                onClick={() => setActiveView('risk')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'risk' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Risk Analysis
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'overview' && (
          <>
            {/* Role Selector */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Role View</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      activeRole === role.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="font-medium text-gray-900">{role.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Role-specific Content */}
            {renderRoleSpecificContent()}
          </>
        )}

        {activeView === 'explorer' && <ContractExplorer />}
        {activeView === 'comparison' && <ContractComparison />}
        {activeView === 'search' && <SearchAndFilter />}
        {activeView === 'alerts' && <AlertsSystem />}
        {activeView === 'risk' && <RiskScoringEngine />}
      </div>
    </div>
  );
}