import './App.css'
import Header from './components/Header'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import StatsPage from './pages/StatsPage'
function App() {
  return (
    <main>
      <Header />
      {/* <GamePage /> */}
      <StatsPage/>
    </main>
  )
}

export default App
