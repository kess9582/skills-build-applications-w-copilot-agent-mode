import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
export default function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource('users').then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <ResourceState {...state} emptyMessage="No athletes yet.">
    <div className="resource-grid">{users.map((user) => <article className="data-card" key={user._id}><span className="avatar">{user.name?.slice(0, 1)}</span><div><h3>{user.name}</h3><p>{user.email}</p></div></article>)}</div>
  </ResourceState>
}