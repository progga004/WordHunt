import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import StatsPage from "./pages/StatsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RulesPage from "./pages/RulesPage";

function App() {
  return (

    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/game-rules" element={<RulesPage /> } />
        </Routes>
      </main>
    </BrowserRouter>

  );
}

export default App;
