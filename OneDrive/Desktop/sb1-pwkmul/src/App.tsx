import React, { useState } from 'react';
import { Bot, AlertCircle } from 'lucide-react';
import { CrawlerForm } from './components/CrawlerForm';
import { Report } from './components/Report';
import { analyzeWebsite } from './services/analyzer';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const analysis = await analyzeWebsite(url);
      setReport(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Bot className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Website Analyzer AI
            </h1>
            <p className="text-lg text-gray-600">
              Get instant AI-powered insights about any website
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <CrawlerForm onSubmit={handleAnalyze} isLoading={isLoading} />

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          <Report report={report} />
        </div>
      </div>
    </div>
  );
}