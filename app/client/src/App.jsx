import { Route, Routes } from "react-router-dom";
// import Game from "./components/Game";
import Home from "./components/routes/Home";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home/>}></Route>
			</Routes>
		</div>
	);
}

export default App;
