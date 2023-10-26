import './App.css';
import { Routes, Route } from "react-router-dom";


import Home from "./pages/home/home";
import CreateListing from "./pages/create/create";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import MyProperties from "./pages/properties/properties";
import Register from "./pages/register/register";
import Profile from "./pages/user/profile";
import NavBar from "./components/menu/navigationBar"

function App() {

  const isBrokerSignedIn = !!localStorage.getItem('token');
  return (
    
  <div className="App">
  <NavBar/>
  <Routes>
  <Route path="/login" element={<Login />}></Route>
  <Route path="/about" element={<About />}></Route>
  {isBrokerSignedIn && <Route path="/properties" element={<MyProperties />}></Route>}
  <Route path="/" element={<Home />}></Route>
  <Route path="/register" element={<Register />}></Route>
  {isBrokerSignedIn && <Route path="/create" element={<CreateListing />}></Route>}
  {isBrokerSignedIn && <Route path="/users/user/:id" element={<Profile  />} /> }
  
</Routes>
</div>
);

}

export default App;
