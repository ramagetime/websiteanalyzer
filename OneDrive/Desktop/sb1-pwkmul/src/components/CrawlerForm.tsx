import React, { useState } from 'react';
import { Globe2, Loader2 } from 'lucide-react';

interface CrawlerFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function CrawlerForm({ onSubmit, isLoading }: CrawlerFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      await onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Website URL
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="url"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !url}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Analyzing...
          </>
        ) : (
          'Analyze Website'
        )}
      </button>
    </form>
  );
}