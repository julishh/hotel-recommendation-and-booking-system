import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  

import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
    <NavigationBar/>
    <ToastContainer position="bottom-center"></ToastContainer>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
