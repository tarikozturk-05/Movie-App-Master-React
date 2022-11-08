import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../auth/Firebase';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)  
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            <h4>Movie App</h4>
          </Link>
          <div className="d-flex text-white align-items-center ">
            { currentUser ? (
              <>
                <h5 className="mb-0 text-capitalize">
                  {currentUser?.displayName}
                </h5>
                <button
                  className="ms-2 btn btn-outline-light"
                  onClick={()=>logOut()}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="ms-2 btn btn-outline-light"
                  onClick={()=>navigate("/login")}
                >
                  Login
                </button>
                <button onClick={()=>navigate("/register")} className="ms-2 btn btn-outline-light">Register</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar