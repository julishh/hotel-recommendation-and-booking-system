import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavigationBar from "./components/NavigationBar";
import Profile from "./user/Profile";
import ProfileSeller from "./components/ProfileSeller";
import ProfileSSeller from "./user/ProfileSSeller";
import NewHotel from "./hotels/NewHotel";
import DisplaySingleHotel from "./hotels/DisplaySingleHotel";
import EditHotel from "./hotels/EditHotel";
import Hotelregister from "./components/Hotelregister";
import SellerInfo from "./user/SellerInfo";
import sellerProfile from "./pages/profile/sellerProfile";

import HotelLogin from "./auth/HotelLogin";
import Ownerdashboard from "./hotelowner/Ownerdashboard";
import PrivateRoute from "./components/PrivateRoute";
import SearchResult from "./hotels/SearchResult";

import Details from "./components/booking/Details";
import PayOnArrival from "./components/booking/PayOnArrival";
import PayViaKhalti from "./components/booking/PayViaKhalti";
function App() {
  return (
    <BrowserRouter>
    <UserAuthContextProvider>
      <NavigationBar />
      <ToastContainer position="bottom-center"></ToastContainer>
      <Routes>
        <Route
          exact
          path="/hotel/:h_id"
          element={<DisplaySingleHotel />}
        ></Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/login/hotel" element={<HotelLogin />} />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/hotel" element={<Hotelregister />} />

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
              <ProfileSSeller />
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
        <Route
          exact
          path="/hotel/edit/:hotelId"
          element={
            <PrivateRoute>
              <EditHotel />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/continue-booking/:hotelId"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/confirmation/:hotelId"
          element={
            <PrivateRoute>
              <PayOnArrival />
            </PrivateRoute>
          }
        />

<Route
          exact
          path="/khalti"
          element={
            <PrivateRoute>
              <PayViaKhalti />
            </PrivateRoute>
          }
        />
        

        {/* <Route
          exact
          path="/newhotel/register"
          element={
            <PrivateRoute>
              <Hotelregister />
            </PrivateRoute>
          }
        /> */}
        <Route
          exact
          path="/checkseller"
          element={
            <PrivateRoute>
              <SellerInfo />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/owner/dashboard"
          element={
            <PrivateRoute>
              <Ownerdashboard />
            </PrivateRoute>
          }
        />

        <Route exact path="/search-result" element={<SearchResult />} />
      </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
