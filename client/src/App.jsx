import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import StatsPage from './pages/StatsPage'
function App() {
  return (
    <main>
      <Header />
      {/* <HomePage></HomePage> */}
      <GamePage></GamePage>
      {/* <StatsPage></StatsPage> */}
    </main>
  )
}

export default App
