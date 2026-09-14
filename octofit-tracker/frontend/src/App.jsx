import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Athletes'], ['/workouts', 'Workouts']]

function Overview() {
  return <div className="overview"><div className="overview-copy"><p className="eyebrow">OCTOFIT / DAILY BRIEF</p><h2>Make today<br /><em>count.</em></h2><p className="intro">Small, consistent efforts become your strongest habit. Pick a session and keep your team moving.</p><NavLink className="primary-button" to="/workouts">Find a workout <span>→</span></NavLink></div><div className="overview-stamp"><span>01</span><strong>MOVE<br />WITH<br />INTENT</strong></div></div>
}

function App() {
  return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/"><span className="brand-mark">O</span><span>OCTOFIT<br /><small>TRACKER</small></span></NavLink><nav className="nav-links">{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav><span className="status-dot" title={`API: ${apiBaseUrl}`}>LIVE</span></header><main className="page-content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Page title="Activity log" kicker="KEEP MOVING"><Activities /></Page>} /><Route path="/leaderboard" element={<Page title="Leaderboard" kicker="FRIENDLY COMPETITION"><Leaderboard /></Page>} /><Route path="/teams" element={<Page title="Your teams" kicker="TRAIN TOGETHER"><Teams /></Page>} /><Route path="/users" element={<Page title="Athletes" kicker="THE COMMUNITY"><Users /></Page>} /><Route path="/workouts" element={<Page title="Workout library" kicker="YOUR NEXT SESSION"><Workouts /></Page>} /></Routes></main><footer>OCTOFIT TRACKER <span>Built for steady progress.</span></footer></div>
}

function Page({ kicker, title, children }) { return <section className="resource-page"><div className="page-heading"><p className="eyebrow">{kicker}</p><h2>{title}</h2></div>{children}</section> }

export default App