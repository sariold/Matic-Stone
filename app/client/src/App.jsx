// @ts-ignore
import { Routes, Route } from "react-router-dom";
import Game from "./components/routes/Game";
import CardCarousel from "./components/routes/CardCarousel";
import Home from "./components/routes/Home";
import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        // @ts-ignore
        element={<Home />}
      />
      <Route
        path="/game"
        // @ts-ignore
        element={<Game />}
      />
      <Route
        path="/carousel"
        // @ts-ignore
        element={<CardCarousel />}
      />
    </Routes>
  );
};

export default App;
