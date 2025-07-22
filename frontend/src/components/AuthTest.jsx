import React, { useState } from 'react';

const AuthTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/test', {
        credentials: 'include'
      });
      const result = await response.json();
      console.log('Auth test result:', result);
      setTestResult(result);
    } catch (error) {
      console.error('Auth test error:', error);
      setTestResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/stats', {
        credentials: 'include'
      });
      const result = await response.json();
      console.log('Stats test result:', result);
      setTestResult(result);
    } catch (error) {
      console.error('Stats test error:', error);
      setTestResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg">
      <h3 className="font-bold mb-2">Auth Debug Test</h3>
      <div className="space-x-2 mb-4">
        <button 
          onClick={testAuth}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Auth
        </button>
        <button 
          onClick={testStats}
          disabled={loading}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Stats
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {testResult && (
        <pre className="text-xs bg-white p-2 rounded">
          {JSON.stringify(testResult, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AuthTest; 