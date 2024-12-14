import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from 'react';
import { data, useNavigate } from "react-router-dom";


export default function Nav() {
  const navigate = useNavigate();
  let isLogged = localStorage.getItem('isLoggedIn');
  const logout = () =>{
    let sessionid = isLogged;
    let datos = {sessionid}
    let datosJson = JSON.stringify(datos);
  
    fetch('http://127.0.0.1:5000/api/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          
      },
      body: datosJson

    }).then(data =>{
      if (data){
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('authToken');
        navigate('/login')
      }else if(!data.ok){
        console.log("error  ")
      }
    }) .catch(error => {
      console.error("Error:", error);
  });
  }

  const registerNavigate = () =>{
    navigate("/register")
  }
  const loginNavigate = () =>{
    navigate("/login")
  }
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Descarga videos por url</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button onClick={loginNavigate} className="nav-link active" aria-current="page" href="#">
                Iniciar sesión
              </button>
              <button onClick={logout} className="nav-link active" aria-current="page" href="#">
                Cerrar sesion
              </button>
            </li>
            <li className="nav-item">
              <button onClick={registerNavigate} className="nav-link" href="#">
                Registrarse
              </button>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
