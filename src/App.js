import { Route, Routes } from "react-router-dom";

import MainView from "./view/MainView";
// import Login from "./view/Login"
import Signup from "./view/Signup";
import Chat from "./component/Chat";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<MainView />} />
        <Route exact path="/result" element={<Chat />} />
        {/* <Route exact path="/Login" element={<Login />} /> */}
        <Route exact path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
