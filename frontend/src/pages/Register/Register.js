import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import './Register.css'


import salvus_logo from "../../assets/desafio_salvus.png";

function Register() {
    const [user, setUser] = useState({});
    const [stage, setStage] = useState(1);
    const [isProfessional, setIsProfessional] = useState(false);

    return(
        <div className="register-container">
            <header>
                <img src={salvus_logo} alt="salvus logo"/>
            </header>

            <section className="form_section">
                <h1>Registro</h1>

                <form className="form" onSubmit={() => {}}>
                    <h2>Dados Básicos</h2>
                    
                    <input className="input_text" type="text" id="name" 
                        placeholder="nome" onChange={e => setUser({...user, name: e.target.value})}/>
                    <input className="input_text" type="text" id="email" 
                        placeholder="email" onChange={e => setUser({...user, email: e.target.value})}/>
                    <input className="input_text" type="text" id="password" 
                        placeholder="senha" onChange={e => setUser({...user, password: e.target.value})}/>
                    <label className="checkbox_label">
                        Deseja se cadastrar como <br/> profissional da saúde?
                        <span className="input_checkbox">
                            <input type="checkbox" onClick={() => setIsProfessional(!isProfessional)}/>
                            {isProfessional ? <FaCheck className="yes_icon"/> : null}
                        </span>
                    </label>
                </form>
            </section>
        </div>
    );
}

export default Register;