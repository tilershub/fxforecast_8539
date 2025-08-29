import React, { useState, useEffect } from 'react';
import { Calculator, Save, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useSupabaseData } from '../../../hooks/useSupabaseData';
import { tradingService } from '../../../services/trading';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';

const PositionSizeCalculator = () => {
  const { user, isAuthenticated } = useAuth();
  const [inputs, setInputs] = useState({
    account_balance: '',
    risk_percentage: '2',
    stop_loss_pips: '',
    instrument_id: ''
  });
  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const { 
    data: instruments, 
    loading: instrumentsLoading 
  } = useSupabaseData(tradingService?.getTradingInstruments);

  const calculatePositionSize = () => {
    const balance = parseFloat(inputs?.account_balance);
    const riskPercent = parseFloat(inputs?.risk_percentage);
    const stopLossPips = parseFloat(inputs?.stop_loss_pips);
    
    if (!balance || !riskPercent || !stopLossPips) {
      return;
    }

    const selectedInstrument = instruments?.find(inst => inst?.id === inputs?.instrument_id);
    const pipValue = selectedInstrument?.pip_value || 10;
    
    const riskAmount = balance * (riskPercent / 100);
    const pipRisk = stopLossPips * pipValue;
    const lotSize = pipRisk > 0 ? riskAmount / pipRisk : 0;
    
    setResults({
      risk_amount: riskAmount,
      lot_size: lotSize,
      pip_value: pipValue,
      total_risk_pips: stopLossPips,
      instrument_name: selectedInstrument?.name || 'Unknown'
    });
  };

  useEffect(() => {
    calculatePositionSize();
  }, [inputs, instruments]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveCalculation = async () => {
    if (!isAuthenticated || !results) return;

    try {
      setSaving(true);
      setSaveError(null);

      const calculationData = {
        user_id: user?.id,
        tool_id: 'be1cfaf3-23cb-436f-a475-ce02d4d14cc9', // Position Size Calculator tool ID
        instrument_id: inputs?.instrument_id || null,
        calculation_name: `${results?.instrument_name} Position Size`,
        input_parameters: inputs,
        results,
        notes: `Risk: ${inputs?.risk_percentage}% | Stop Loss: ${inputs?.stop_loss_pips} pips`
      };

      const { error } = await tradingService?.saveUserCalculation(calculationData);
      
      if (error) throw new Error(error);
      
      // Show success feedback (you could add a toast notification here)
      alert('Calculation saved successfully!');
      
    } catch (error) {
      setSaveError(error?.message);
    } finally {
      setSaving(false);
    }
  };

  if (instrumentsLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <LoadingSpinner text="Loading calculator..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Position Size Calculator</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Balance ($)
            </label>
            <input
              type="number"
              value={inputs?.account_balance}
              onChange={(e) => handleInputChange('account_balance', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Percentage (%)
            </label>
            <input
              type="number"
              value={inputs?.risk_percentage}
              onChange={(e) => handleInputChange('risk_percentage', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2"
              step="0.1"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stop Loss (Pips)
            </label>
            <input
              type="number"
              value={inputs?.stop_loss_pips}
              onChange={(e) => handleInputChange('stop_loss_pips', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trading Instrument
            </label>
            <select
              value={inputs?.instrument_id}
              onChange={(e) => handleInputChange('instrument_id', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an instrument</option>
              {instruments?.map((instrument) => (
                <option key={instrument?.id} value={instrument?.id}>
                  {instrument?.symbol} - {instrument?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
          
          {results ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Position Size</h4>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {results?.lot_size?.toFixed(4)} lots
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Risk Amount</p>
                  <p className="font-semibold text-gray-900">
                    ${results?.risk_amount?.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Pip Value</p>
                  <p className="font-semibold text-gray-900">
                    ${results?.pip_value}
                  </p>
                </div>
              </div>

              {isAuthenticated && (
                <div className="pt-4">
                  {saveError && (
                    <ErrorMessage 
                      error={saveError} 
                      className="mb-4"
                      onDismiss={() => setSaveError(null)}
                      onRetry={() => saveCalculation()}
                    />
                  )}
                  <button
                    onClick={saveCalculation}
                    disabled={saving}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <LoadingSpinner size="sm" color="secondary" text="" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Calculation
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Enter parameters to see results</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isAuthenticated && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              Sign in to save your calculations and access advanced features
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionSizeCalculator;