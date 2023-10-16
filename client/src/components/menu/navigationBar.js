import {Link} from 'react-router-dom';
import './navigationBar.css';
const Navbar=()=>{
    return (    
                <div className='navBar'>
                    <div >
                        <Link to="/" className ='navItem'>Home</Link>
                    </div>
                    <div >
                        <Link to="/login" className ='navItem'>Login</Link>
                    </div>
                    <div className='navItem'>
                        <Link to="/about" className ='navItem'>About</Link>
                    </div>
                    <div className='navItem'>
                        <Link to="/demo" className ='navItem'>Demo</Link>
                    </div>
                    <div className='navItem'>
                        <Link to="/properties" className ='navItem'>Property List</Link>
                    </div>
                </div>
    )

}

export default Navbar;