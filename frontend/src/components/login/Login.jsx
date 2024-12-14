import './login.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Login({onLogin}) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const registerNavigate = () =>{
        navigate('/register')
    }
   
    const sendFormData = async (event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let paswd = document.getElementById('password').value;
    
        let datos = { email, paswd };

        let datosJson = JSON.stringify(datos);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: datosJson
            });
            
            const data = await response.json();

            // Si la respuesta contiene el token
            if (data) {
                const token = data.token; 
                const sesionID = data.session_id;
                localStorage.setItem('authToken', token); 
                localStorage.setItem('isLoggedIn', sesionID);
                onLogin();  
                navigate('/'); 
            } else {
                console.log(data)
                console.error("Token no encontrado en la respuesta");
            
            }
        } catch (error) {
            console.error("Error en login:", error);
            setErrorMessage('Error en el login. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form id="loginForm" onSubmit={sendFormData}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" className="password" required />
                </div>
                <button type="submit" className="btn">Iniciar sesión</button>
            </form>
            <a onClick={registerNavigate} >Do not have an account? Register</a>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
    );
}
