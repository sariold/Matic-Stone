// @ts-ignore
import { Routes, Route } from "react-router-dom";
import Game from "./components/routes/Game";
import Home from "./components/routes/Home";
import "./App.css";

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
    </Routes>
  );
};

export default App;
