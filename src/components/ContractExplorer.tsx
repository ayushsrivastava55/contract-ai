'use client';

import { useState, useRef } from 'react';

interface Contract {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  status: 'processing' | 'analyzed' | 'error';
  riskScore?: number;
  type: string;
}

export default function ContractExplorer() {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      name: 'Metro Rail Project Agreement - Phase 1',
      uploadDate: '2024-09-15',
      size: '2.3 MB',
      status: 'analyzed',
      riskScore: 65,
      type: 'Infrastructure'
    },
    {
      id: '2',
      name: 'Solar Energy Plant Construction Contract',
      uploadDate: '2024-09-10',
      size: '1.8 MB',
      status: 'analyzed',
      riskScore: 45,
      type: 'Renewable Energy'
    },
    {
      id: '3',
      name: 'Highway Development BOT Agreement',
      uploadDate: '2024-09-08',
      size: '3.1 MB',
      status: 'processing',
      type: 'Transportation'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newContract: Contract = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'processing',
        type: 'Unknown'
      };
      setContracts(prev => [newContract, ...prev]);

      // Simulate processing
      setTimeout(() => {
        setContracts(prev => prev.map(contract =>
          contract.id === newContract.id
            ? { ...contract, status: 'analyzed' as const, riskScore: Math.floor(Math.random() * 100) }
            : contract
        ));
      }, 3000);
    });
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
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