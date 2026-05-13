import React, { useState } from 'react'
import { Link,  useNavigate } from "react-router-dom";
import {useAuth} from "./context/AuthContext"

export default function Navbar() {

    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogout(){
        logout(); navigate("/");
    }
  return (
    <>
    <nav>
      <Link to = "/">LearnHub</Link>
      <div>
      <Link to = "/">Courses</Link>
      {user ? (
        <>
        <Link to = "/dashboard">Dashboard</Link>
        <span>Hi, {user.name}</span>
        <button onClick = {handleLogout}>Logout</button>
        </>
      ):(
        <Link to = "/login">Login</Link>
      )}
      </div>
      <button onClick = {()=> setMenuOpen(!menuOpen)}>{menuOpen? "X":"☰"}</button>
      {menuOpen && (
        <div>
          <Link to="/" onClick={() => setMenuOpen(false)}>Courses</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
     
      
    
    </nav>
    </>
  )
}

