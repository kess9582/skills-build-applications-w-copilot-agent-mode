import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <ResourceState {...state} emptyMessage="Create a team to start training together.">
    <div className="resource-grid">{teams.map((team) => <article className="data-card team-card" key={team._id}><div className="team-mark">+</div><div><h3>{team.name}</h3><p>{team.description}</p><small>{team.members?.length || 0} members</small></div></article>)}</div>
  </ResourceState>
}