import React from 'react';
import './register.css';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const sendFormData = (event) => {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let lastname = document.getElementById('lastname').value;
        let email = document.getElementById('email').value;
        let paswd = document.getElementById('password').value;
        let repeatPaswd = document.getElementById('repeatPassword').value;
    
        if (paswd !== repeatPaswd) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        let datos = {
            name,
            lastname,
            email,
            paswd
        };
        
        let datosJson = JSON.stringify(datos);
        
        fetch('http://127.0.0.1:5000/api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: datosJson
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Network response was not ok: ${errorData.error}`);
                });
            }
            return response.json();
        })
        .then(response => {
            console.log("Response completa:", response); 
            if (response.message.token) {
                const token = response.message.token; 
                localStorage.setItem('authToken', token); 
                alert("Registro exitoso");
                navigate('/login');
            } else {
                console.error("Token no encontrado en la respuesta");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    return (
        <div className="container">
            <h2>Formulario de Registro</h2>
            <form id="registroForm" onSubmit={sendFormData}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" className="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Apellido</label>
                    <input type="text" id="lastname" className="lastname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" className="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="repeatPassword">Repetir Contraseña</label>
                    <input type="password" id="repeatPassword" className="repeatPassword" required />
                </div>
                <button type="submit" className="btn">Registrarse</button>
            </form>
        </div>
    );
}
