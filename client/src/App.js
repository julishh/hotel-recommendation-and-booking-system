import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavigationBar from "./components/NavigationBar";
import Profile from "./user/Profile";
import ProfileSeller from "./components/ProfileSeller";
import NewHotel from "./hotels/NewHotel";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <ToastContainer position="bottom-center"></ToastContainer>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/profile/seller"
          element={
            <PrivateRoute>
              <ProfileSeller />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/hotel/new"
          element={
            <PrivateRoute>
              <NewHotel />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
