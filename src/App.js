import { Route, Routes } from "react-router-dom";

import MainView from "./view/MainView";

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<MainView />} />
		</Routes>
	);
}

export default App;
