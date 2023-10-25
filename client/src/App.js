import './App.css';
import { Routes, Route } from "react-router-dom";


import Home from "./pages/home/home";
import CreateListing from "./pages/createPropertyListing/createPropertyListing";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import MyProperties from "./pages/myProperties/myProperties";
import Register from "./pages/register/register";


function App() {

  const isBrokerSignedIn = !!localStorage.getItem('token');
  return (
    <div className="App">


  <Routes>
  <Route path="/login" element={<Login />}></Route>
  <Route path="/about" element={<About />}></Route>
  {isBrokerSignedIn && <Route path="/properties" element={<MyProperties />}></Route>}
  <Route path="/" element={<Home />}></Route>
  <Route path="/register" element={<Register />}></Route>
  {isBrokerSignedIn && <Route path="/create-property-listing" element={<CreateListing />}></Route>}
  
</Routes>
</div>
);

}

export default App;
