// src/components/home/Home.jsx
import React, { useEffect, useState } from 'react';
import Nav from "../nav/Nav";
import './home.css';
import { data } from 'react-router-dom';

export default function Home() {
    
    
    return (
        <>
            <nav><Nav /></nav>
            <main>
                <h1>Descarga tu vídeo</h1>
                <form id="formURL">
                    <label id="labelURL">URL</label>
                    <input id="inputURL" type="text" className="url" placeholder="Introduzca la url del video" />
                    <input id="submitURL" type="submit" value='Enviar' />
                </form>
            </main>
            <footer></footer>
        </>
    );
}
