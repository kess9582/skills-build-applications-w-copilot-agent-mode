export function ResourceState({ loading, error, emptyMessage, children }) {
  if (loading) return <div className="panel-message">Loading your tracker data...</div>
  if (error) return <div className="panel-message error-message">{error}</div>
  if (!children) return <div className="panel-message">{emptyMessage}</div>
  return children
}