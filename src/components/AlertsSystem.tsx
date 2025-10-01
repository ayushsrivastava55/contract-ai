'use client';

import { useState } from 'react';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'deadline' | 'payment' | 'renewal' | 'compliance' | 'risk' | 'milestone';
  priority: 'low' | 'medium' | 'high' | 'critical';
  contractName: string;
  dueDate: string;
  daysRemaining: number;
  status: 'active' | 'acknowledged' | 'resolved';
  createdAt: string;
}

interface AlertRule {
  id: string;
  name: string;
  type: Alert['type'];
  description: string;
  enabled: boolean;
  triggerDays: number;
}

export default function AlertsSystem() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'rules'>('alerts');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Contract Renewal Due',
      description: 'Metro Rail Project Agreement - Phase 1 renewal deadline approaching',
      type: 'renewal',
      priority: 'critical',
      contractName: 'Metro Rail Project Agreement - Phase 1',
      dueDate: '2024-10-15',
      daysRemaining: 7,
      status: 'active',
      createdAt: '2024-10-01'
    },
    {
      id: '2',
      title: 'Payment Milestone Due',
      description: 'Milestone 3 payment of ₹45 Cr due for Metro Rail project',
      type: 'payment',
      priority: 'high',
      contractName: 'Metro Rail Project Agreement - Phase 1',
      dueDate: '2024-10-10',
      daysRemaining: 2,
      status: 'active',
      createdAt: '2024-09-25'
    },
    {
      id: '3',
      title: 'Performance Guarantee Expiry',
      description: 'Solar plant performance guarantee requires renewal',
      type: 'compliance',
      priority: 'high',
      contractName: 'Solar Energy Plant Construction Contract',
      dueDate: '2024-10-20',
      daysRemaining: 12,
      status: 'active',
      createdAt: '2024-09-30'
    },
    {
      id: '4',
      title: 'Environmental Clearance Review',
      description: 'Annual environmental compliance review required',
      type: 'compliance',
      priority: 'medium',
      contractName: 'Highway Development BOT Agreement',
      dueDate: '2024-10-25',
      daysRemaining: 17,
      status: 'acknowledged',
      createdAt: '2024-09-28'
    },
    {
      id: '5',
      title: 'Risk Score Threshold Exceeded',
      description: 'Contract risk score has increased to 85% (threshold: 75%)',
      type: 'risk',
      priority: 'high',
      contractName: 'Airport Terminal Expansion Project',
      dueDate: '2024-10-08',
      daysRemaining: 0,
      status: 'active',
      createdAt: '2024-10-08'
    }
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'Contract Renewal Reminder',
      type: 'renewal',
      description: 'Alert when contract renewal is due',
      enabled: true,
      triggerDays: 30
    },
    {
      id: '2',
      name: 'Payment Due Notification',
      type: 'payment',
      description: 'Alert for upcoming payment deadlines',
      enabled: true,
      triggerDays: 7
    },
    {
      id: '3',
      name: 'Milestone Deadline Alert',
      type: 'milestone',
      description: 'Notify before project milestone deadlines',
      enabled: true,
      triggerDays: 14
    },
    {
      id: '4',
      name: 'Compliance Review Due',
      type: 'compliance',
      description: 'Alert for regulatory compliance reviews',
      enabled: true,
      triggerDays: 21
    },
    {
      id: '5',
      name: 'High Risk Score Alert',
      type: 'risk',
      description: 'Alert when contract risk score exceeds threshold',
      enabled: true,
      triggerDays: 0
    },
    {
      id: '6',
      name: 'Auto-Renewal Warning',
      type: 'renewal',
      description: 'Warning for contracts with auto-renewal clauses',
      enabled: false,
      triggerDays: 60
    }
  ]);

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-200';
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-700 bg-blue-100 border-blue-200';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'deadline': return '⏰';
      case 'payment': return '💰';
      case 'renewal': return '🔄';
      case 'compliance': return '✅';
      case 'risk': return '⚠️';
      case 'milestone': return '🎯';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'active': return 'text-red-600';
      case 'acknowledged': return 'text-yellow-600';
      case 'resolved': return 'text-green-600';
    }
  };

  const getDaysRemainingColor = (days: number) => {
    if (days <= 0) return 'text-red-600 font-bold';
    if (days <= 7) return 'text-orange-600 font-semibold';
    if (days <= 14) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, status: 'acknowledged' as const } : alert
    ));
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ));
  };

  const toggleAlertRule = (ruleId: string) => {
    setAlertRules(prev => prev.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterPriority !== 'all' && alert.priority !== filterPriority) return false;
    if (filterType !== 'all' && alert.type !== filterType) return false;
    return true;
  });

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.priority === 'critical').length,
    overdue: alerts.filter(a => a.daysRemaining <= 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Contract Alerts & Notifications</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'alerts'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active Alerts
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'rules'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alert Rules
            </button>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📊</div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{alertStats.total}</div>
                <div className="text-sm text-blue-700">Total Alerts</div>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🚨</div>
              <div>
                <div className="text-2xl font-bold text-red-600">{alertStats.active}</div>
                <div className="text-sm text-red-700">Active Alerts</div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⚠️</div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{alertStats.critical}</div>
                <div className="text-sm text-orange-700">Critical Priority</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⏰</div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{alertStats.overdue}</div>
                <div className="text-sm text-purple-700">Overdue</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'alerts' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Priority:</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Type:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="renewal">Renewal</option>
                  <option value="payment">Payment</option>
                  <option value="deadline">Deadline</option>
                  <option value="compliance">Compliance</option>
                  <option value="risk">Risk</option>
                  <option value="milestone">Milestone</option>
                </select>
              </div>

              <div className="flex-1"></div>

              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                + Create Custom Alert
              </button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alerts ({filteredAlerts.length})
            </h3>

            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`border rounded-lg p-4 ${getPriorityColor(alert.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>Contract: <span className="font-medium">{alert.contractName}</span></span>
                        <span>Due: <span className="font-medium">{alert.dueDate}</span></span>
                        <span className={getDaysRemainingColor(alert.daysRemaining)}>
                          {alert.daysRemaining <= 0 ? 'Overdue' : `${alert.daysRemaining} days remaining`}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
                          Status: {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Created: {alert.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority.toUpperCase()}
                      </span>

                      {alert.status === 'active' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200 transition-colors"
                          >
                            Acknowledge
                          </button>
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                          >
                            Resolve
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🎉</div>
                <p>No alerts match your current filters.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'rules' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Alert Rules Configuration</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
              + Add New Rule
            </button>
          </div>

          <div className="space-y-4">
            {alertRules.map((rule) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={() => toggleAlertRule(rule.id)}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div className="text-2xl">{getTypeIcon(rule.type)}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{rule.name}</h4>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        Trigger: {rule.triggerDays === 0 ? 'Immediate' : `${rule.triggerDays} days before`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {rule.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 p-1">⚙️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}