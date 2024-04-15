import { Route, Routes } from "react-router-dom";

import Test from "./view/Test";

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<Test />} />
		</Routes>
	);
}

export default App;
