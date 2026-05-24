import { useState } from 'react'

const FLASK_URL = 'https://world-cup-predictor-6ab9.onrender.com'

const WORLD_CUP_TEAMS = [
  "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Belgium", "Bolivia", "Brazil", "Cameroon", "Canada",
  "Colombia", "Costa Rica", "Croatia", "Czech Republic", "DR Congo",
  "Denmark", "Ecuador", "Egypt", "England", "France",
  "Georgia", "Germany", "Honduras", "Hungary", "Indonesia",
  "Iran", "Iraq", "Ivory Coast", "Japan", "Jordan",
  "Mali", "Mexico", "Morocco", "Netherlands", "New Zealand",
  "Nigeria", "Norway", "Oman", "Panama", "Paraguay",
  "Peru", "Poland", "Portugal", "Qatar", "Romania",
  "Saudi Arabia", "Scotland", "Senegal", "Serbia", "Slovakia",
  "Slovenia", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "Tunisia", "Turkey", "Ukraine", "Uruguay",
  "United States", "Uzbekistan", "Venezuela"
]

function App() {
  const [homeTeam, setHomeTeam] = useState(WORLD_CUP_TEAMS[0])
  const [awayTeam, setAwayTeam] = useState(WORLD_CUP_TEAMS[1])
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [predictionLog, setPredictionLog] = useState([])

  const handlePredict = async () => {
    if (homeTeam === awayTeam) {
      setError('Please select two different teams')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${FLASK_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ home_team: homeTeam, away_team: awayTeam })
      })
      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setPrediction(data)
        setPredictionLog(prev => [{
          homeTeam,
          awayTeam,
          homeWin: data.home_win,
          awayWin: data.away_win,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev])
      }
    } catch {
      setError('Could not reach Flask server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>
        World Cup Predictor
      </h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Select two teams to predict the match outcome
      </p>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>
            Home Team
          </label>
          <select
            value={homeTeam}
            onChange={e => setHomeTeam(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
          >
            {WORLD_CUP_TEAMS.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>
            Away Team
          </label>
          <select
            value={awayTeam}
            onChange={e => setAwayTeam(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
          >
            {WORLD_CUP_TEAMS.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          width: '100%', padding: '10px', borderRadius: '8px',
          background: loading ? '#aaa' : '#2563eb', color: 'white',
          border: 'none', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '24px'
        }}
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {prediction && (
        <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>
            {homeTeam} vs {awayTeam}
          </h2>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>{homeTeam} Win</span>
              <span style={{ fontWeight: '500' }}>{(prediction.home_win * 100).toFixed(1)}%</span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '8px' }}>
              <div style={{ width: `${prediction.home_win * 100}%`, height: '8px', borderRadius: '999px', background: '#2563eb', transition: 'width 0.5s ease' }} />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>{awayTeam} Win</span>
              <span style={{ fontWeight: '500' }}>{(prediction.away_win * 100).toFixed(1)}%</span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '8px' }}>
              <div style={{ width: `${prediction.away_win * 100}%`, height: '8px', borderRadius: '999px', background: '#dc2626', transition: 'width 0.5s ease' }} />
            </div>
          </div>

        </div>
      )}

      {predictionLog.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Prediction Log</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#666', fontWeight: '400' }}>Match</th>
                <th style={{ textAlign: 'center', padding: '8px', color: '#666', fontWeight: '400' }}>Home Win</th>
                <th style={{ textAlign: 'center', padding: '8px', color: '#666', fontWeight: '400' }}>Away Win</th>
                <th style={{ textAlign: 'right', padding: '8px', color: '#666', fontWeight: '400' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {predictionLog.map((log, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px' }}>{log.homeTeam} vs {log.awayTeam}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{(log.homeWin * 100).toFixed(1)}%</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{(log.awayWin * 100).toFixed(1)}%</td>
                  <td style={{ padding: '8px', textAlign: 'right', color: '#999' }}>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App