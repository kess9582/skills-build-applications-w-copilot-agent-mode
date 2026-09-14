import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
export default function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('activities').then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <ResourceState {...state} emptyMessage="Log your first activity to see it here.">
    <div className="table-wrap"><table><thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Points</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td>{activity.type}</td><td>{activity.user?.name || 'Unknown athlete'}</td><td>{activity.durationMinutes} min</td><td><strong>+{activity.points}</strong></td></tr>)}</tbody></table></div>
  </ResourceState>
}