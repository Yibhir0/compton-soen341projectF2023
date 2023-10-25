import './App.css';
import { Routes, Route } from "react-router-dom";


import Home from "./pages/home/home";
import CreateListing from "./pages/create/create";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import MyProperties from "./pages/properties/properties";
import Register from "./pages/register/register";
import PropertyDetails from "./pages/propertyDetails/propertyDetails";

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
  {isBrokerSignedIn && <Route path="/create" element={<CreateListing />}></Route>}
  {isBrokerSignedIn && <Route path="/properties/:id" element={<PropertyDetails />} /> }
  
</Routes>
</div>
);

}

export default App;
