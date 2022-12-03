// @ts-ignore
import { Routes, Route } from "react-router-dom";
import Game from "./components/routes/Game";
import Carousel from "./components/routes/Carousel";
import Home from "./components/routes/Home";
import Tutorial from "./components/routes/Tutorial";
import "./App.scss";

/**
 * App component that handles routing and URL navigation.
 * @returns {JSX.Element} - App component instance
 */
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        // @ts-ignore
        element={<Home />}
      />
      <Route
        path="/tutorial"
        // @ts-ignore
        element={<Tutorial />}
      />
      <Route
        path="/carousel"
        // @ts-ignore
        element={<Carousel />}
      />
      <Route
        path="/game"
        // @ts-ignore
        element={<Game />}
      />
    </Routes>
  );
};

export default App;
