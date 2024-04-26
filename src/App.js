import { Route, Routes } from "react-router-dom";

import MainView from "./view/MainView";
import Login from "./view/Login";
import Signup from "./view/Signup";
function App() {
	return (
		<Routes>
			<Route exact path="/" element={<Test />} />
			<Route exact path="/Login" element ={<Login/>} />
			<Route exact path="/Signup" element ={<Signup/>}/>
		</Routes>
	);
}

export default App;
