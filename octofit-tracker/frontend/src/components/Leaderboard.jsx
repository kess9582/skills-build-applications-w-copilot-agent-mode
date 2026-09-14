import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('leaderboard').then(setLeaders).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <ResourceState {...state} emptyMessage="The leaderboard is waiting for its first champion.">
    <div className="leaderboard-list">{leaders.map((entry) => <article className="leader-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><div><h3>{entry.user?.name || 'Unknown athlete'}</h3><p>Current standing</p></div><strong>{entry.points} pts</strong></article>)}</div>
  </ResourceState>
}