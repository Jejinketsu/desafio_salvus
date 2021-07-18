import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import "./Login.css";

import salvus_logo from "../../assets/salvus-logo.png";

function Login(props) {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);

    async function handleSubmit(event){
        event.preventDefault();
        setFailed(false);

        api.get("/login", {
            auth: {
                username: email,
                password: password,
            }
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            history.push("/profile", {})
        }).catch((error) => {
            setFailed(true);
        })
    }

    return(
        <div className="container">
            <div className="logo_box">
                <img src={salvus_logo} />
            </div>
            <section className="form_box">
                <h1>Log In</h1>

                <form className="form" onSubmit={handleSubmit}>
                    { failed && 
                        <div className="error_feedback">
                            <p>O login ou a senha está incorreto</p>
                        </div>
                    }
                    <input 
                        className="input_text" 
                        placeholder="email" 
                        type="text" 
                        id="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />

                    <input
                        className="input_text"
                        placeholder="senha"
                        type="password"
                        id="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <button type="submit" className="submit_buttom">Login</button>
                    
                    <p className="hint"><strong>Não tem conta ainda? Crie uma nova!</strong></p>
                    <Link className="register_buttom" to="/register">Criar Conta</Link>
                </form>
            </section>
        </div>
    );

}

export default Login;