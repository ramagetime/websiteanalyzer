import React from 'react';
import { FileText } from 'lucide-react';

interface ReportProps {
  report: string | null;
}

export function Report({ report }: ReportProps) {
  if (!report) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-xl p-6 md:p-8">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Analysis Report</h2>
      </div>
      <div className="prose prose-blue max-w-none">
        {report.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}