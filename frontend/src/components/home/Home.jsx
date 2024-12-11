// src/components/home/Home.jsx
import React, { useState } from 'react';
import Nav from "../nav/Nav";
import './home.css';
import { data } from 'react-router-dom';

export default function Home() {
    const [usuarios, setUsuarios] = useState([]);

    const handleSubmitURL = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica para el primer formulario si es necesario
    };

    const handleSubmitUsuarios = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/usuarios');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.log(data)
            console.error('Error al obtener usuarios:', error);
        }
    };

    return (
        <>
            <nav><Nav /></nav>
            <main>
                <h1>Descarga tu vídeo</h1>
                <form id="formURL" onSubmit={handleSubmitURL}>
                    <label id="labelURL">URL</label>
                    <input id="inputURL" type="text" name="url" placeholder="Introduzca la url del video" />
                    <input id="submitURL" type="submit" value='Enviar' />
                </form>
                <form id="formUsuarios" onSubmit={handleSubmitUsuarios}>
                    <input id="submitUsuarios" type="submit" value='Obtener Usuarios' />
                </form>
                <ul>
                    {usuarios.map((usuario, index) => (
                        <li key={index}>{usuario.nombre} - {usuario.edad} - {usuario.email}</li>
                    ))}
                </ul>
            </main>
            <footer></footer>
        </>
    );
}
