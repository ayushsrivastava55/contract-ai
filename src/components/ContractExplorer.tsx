'use client';

import { useState, useRef, useEffect } from 'react';
import { ContractMetadata, RiskAssessment } from '../types/contract';
import { contractService } from '../services/contractService';

export default function ContractExplorer() {
  const [contracts, setContracts] = useState<ContractMetadata[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<Map<string, RiskAssessment>>(new Map());

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = () => {
    const contractList = contractService.getContracts();
    setContracts(contractList);

    // Load risk assessments for each contract
    const riskMap = new Map<string, RiskAssessment>();
    contractList.forEach(contract => {
      const risk = contractService.getRiskAssessment(contract.id);
      if (risk) {
        riskMap.set(contract.id, risk);
      }
    });
    setRiskAssessments(riskMap);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        // Determine contract type based on filename or let user select
        const contractType = determineContractType(file.name);

        const contractId = await contractService.uploadContract(file, {
          type: contractType
        });

        // Poll for updates until processing is complete
        const pollInterval = setInterval(() => {
          const updatedContract = contractService.getContract(contractId);
          if (updatedContract) {
            setContracts(prev => {
              const existing = prev.find(c => c.id === contractId);
              if (existing) {
                return prev.map(c => c.id === contractId ? updatedContract : c);
              } else {
                return [updatedContract, ...prev];
              }
            });

            if (updatedContract.status === 'completed') {
              // Load risk assessment
              const risk = contractService.getRiskAssessment(contractId);
              if (risk) {
                setRiskAssessments(prev => new Map(prev.set(contractId, risk)));
              }
              clearInterval(pollInterval);
            } else if (updatedContract.status === 'error') {
              clearInterval(pollInterval);
            }
          }
        }, 1000);

      } catch (error) {
        console.error('Failed to upload contract:', error);
      }
    }

    setUploading(false);
  };

  const determineContractType = (filename: string): ContractMetadata['type'] => {
    const name = filename.toLowerCase();
    if (name.includes('metro') || name.includes('rail')) return 'metro';
    if (name.includes('solar') || name.includes('wind')) return 'renewables';
    if (name.includes('highway') || name.includes('road')) return 'roadways';
    if (name.includes('airport')) return 'airport';
    if (name.includes('transmission') || name.includes('power')) return 'transmission';
    return 'infrastructure';
  };

  const getRiskColor = (score: number) => {
    if (score >= 75) return 'text-red-600 bg-red-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    if (score >= 25) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 75) return 'Critical';
    if (score >= 50) return 'High';
    if (score >= 25) return 'Medium';
    return 'Low';
  };

  const getStatusColor = (status: ContractMetadata['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'uploading': return 'text-blue-600';
      case 'parsing': return 'text-yellow-600';
      case 'analyzing': return 'text-purple-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: ContractMetadata['status']) => {
    switch (status) {
      case 'completed': return '✅';
      case 'uploading': return '⬆️';
      case 'parsing': return '📄';
      case 'analyzing': return '🧠';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const formatFileSize = (bytes: number): string => {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const getContractTypeIcon = (type: ContractMetadata['type']): string => {
    switch (type) {
      case 'metro': return '🚇';
      case 'roadways': return '🛣️';
      case 'airport': return '✈️';
      case 'renewables': return '🌱';
      case 'transmission': return '⚡';
      default: return '🏗️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Contracts</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="text-4xl">📄</div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Drop contract files here or click to upload
              </h3>
              <p className="text-gray-500 mt-1">
                Support for PDF, DOC, DOCX files up to 10MB
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Select Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Contract Portfolio</h2>
          <div className="text-sm text-gray-500">
            {contracts.length} contracts • {contracts.filter(c => c.status === 'analyzed').length} analyzed
          </div>
        </div>

        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📋</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{contract.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Type: {contract.type}</span>
                        <span>Size: {contract.size}</span>
                        <span>Uploaded: {contract.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    {contract.status === 'processing' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-yellow-600">Processing...</span>
                      </div>
                    )}
                    {contract.status === 'analyzed' && contract.riskScore && (
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(contract.riskScore)}`}>
                          {getRiskLabel(contract.riskScore)} Risk ({contract.riskScore})
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Analysis
                        </button>
                      </div>
                    )}
                    {contract.status === 'error' && (
                      <span className="text-sm text-red-600">Processing Error</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Download</span>
                      ⬇️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Share</span>
                      🔗
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <span className="sr-only">Delete</span>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {contracts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📂</div>
            <p>No contracts uploaded yet. Start by uploading your first contract above.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📊</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {contracts.filter(c => c.status === 'analyzed').length}
              </div>
              <div className="text-sm text-gray-500">Analyzed Contracts</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">⚠️</div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {contracts.filter(c => c.riskScore && c.riskScore >= 70).length}
              </div>
              <div className="text-sm text-gray-500">High Risk Contracts</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🔄</div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {contracts.filter(c => c.status === 'processing').length}
              </div>
              <div className="text-sm text-gray-500">Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}