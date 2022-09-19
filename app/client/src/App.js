import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
import Game from "./components/Game";

function App() {
	return (
		<div className="App">
			<h1>Hello</h1>
			<Routes>
				<Route path="/" element={<Game />}></Route>
			</Routes>
		</div>
	);
}

export default App;
