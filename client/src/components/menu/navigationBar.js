import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './navigationBar.css';
const Navbar=()=>{
    return (    
            <nav className="navbar"> 
                        <div className="container">                                                  
                                <div className="nav-elements">
                                        <ul>
                                            <li>
                                            <img className="logo-realestate" alt="Logo Real Estate" src={require('../../assets/images/placeholder_logo.png')}/>
                                            </li>
                                                    <li>
                                                    <NavLink to="/">Home</NavLink>
                                                    </li>
                                                    <li> 
                                                    <NavLink to="/login">Login</NavLink>
                                                    </li>
                                                    <li>
                                                    <NavLink to="/about">About</NavLink>
                                                    </li>
                                                    <li>
                                                    <NavLink to="/demo">Demo</NavLink>
                                                    </li>
                                                    <li>
                                                    <NavLink to="/properties">Property Listings</NavLink>
                                                    </li>
                                        </ul>      
                                </div>     
                         </div>        
            </nav>
    )

}

export default Navbar;