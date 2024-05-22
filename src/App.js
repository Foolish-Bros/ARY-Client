import { Route, Routes, useLocation } from "react-router-dom";

import MainView from "./view/MainView";
import Chat from "./component/Chat";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Login from "./view/Login"; // Import the Login component
import Signup from "./view/Signup"; // Import the Signin component

function App() {
  const location = useLocation();

  // Check if the current path is login or signup
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<MainView />} />
        <Route exact path="/result" element={<Chat />} />
        <Route exact path="/login" element={<Login />} />{" "}
        {/* Route for Login */}
        <Route exact path="/signup" element={<Signup />} />{" "}
        {/* Route for Signup */}
      </Routes>
    </>
  );
}

export default App;
