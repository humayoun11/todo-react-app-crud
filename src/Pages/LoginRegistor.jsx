
import React from 'react';
import { Link, Outlet } from "react-router-dom";
const LoginRegistor = () => {

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="row" style={{ textAlign: 'center' }}>
          <h2>
            <Link to="login">Login</Link> / <Link to="Registor">Register</Link>
          </h2>
          <Outlet />
        </div>


      </div>


    </div>
  )


}

export default LoginRegistor;