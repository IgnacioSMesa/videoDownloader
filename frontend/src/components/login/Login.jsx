import './login.css';

export default function Login() {
    
    return (

        <div className="container">
            <h2>Login</h2>
            <form id="loginForm">
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
        </div>



    );
}