import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState<string>('')
  const [analysis, setAnalysis] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      })
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error('Error:', error)
      setAnalysis('Error analyzing website')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Website Analyzer</h1>
      <form onSubmit={handleAnalyze}>
        <input 
          type="url" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {analysis && (
        <div className="analysis-result">
          <h2>Analysis Results:</h2>
          <pre>{analysis}</pre>
        </div>
      )}
    </div>
  )
}

export default App