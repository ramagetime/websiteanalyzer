// Use environment variable for API endpoint
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api/analyze';

export async function analyzeWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to analyze website');
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? `Analysis failed: ${error.message}` 
        : 'Failed to analyze website'
    );
  }
}