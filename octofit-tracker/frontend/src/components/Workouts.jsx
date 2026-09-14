import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchResource('workouts').then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <ResourceState {...state} emptyMessage="No workouts have been published yet.">
    <div className="resource-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><div className="workout-top"><span className="difficulty">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.name}</h3><p>{workout.description}</p><div className="exercise-list">{workout.exercises?.slice(0, 3).map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div>
  </ResourceState>
}