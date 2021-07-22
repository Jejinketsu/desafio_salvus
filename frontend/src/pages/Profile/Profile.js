import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaUserMinus } from 'react-icons/fa';
import { authContext } from '../../services/authHook';
import { DeleteUser, UpdateUser } from '../../services/api';

import "./Profile.css";

import salvus_logo from '../../assets/desafio_salvus.png';
import user_avatar from '../../assets/user-avatar.png';

function Profile(props) {
    const auth = React.useContext(authContext);
    const history = useHistory();

    const [user, setUser] = useState(auth.user || {});
    const [name, setName] = useState(user.name || "name");
    const [email, setEmail] = useState(user.email || "email");
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState(user.address || {});

    async function handleSubmit(event){
        event.preventDefault();
        const new_password = password !== '' ? password : null;
        console.log(address);
        UpdateUser({
            name: name,
            email: email,
            password: new_password,
            address: address
        }, localStorage.getItem("token"));
        
        setUser({
            name: name,
            email: email,
            password: new_password,
            address: address
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    async function handleCancelClick(event){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    async function handleLogoutClick(event){
        event.preventDefault();
        auth.signout();
        history.goBack();
    }

    async function handleDeleteClick(event){
        event.preventDefault();
        DeleteUser(localStorage.getItem("token"));
        auth.signout();
        history.goBack();
    }

    return(
        <div className="profile-container">
            <header>
                <img src={salvus_logo} alt="salvus logo"/>
            </header>

            <section className="update_form">
                <div className="top_panel">
                    <button className="red_buttom" onClick={handleLogoutClick}>
                        <FaSignOutAlt size="30px"/>
                    </button>
                    <h1>Perfil</h1>
                    <button className="red_buttom" onClick={handleDeleteClick}>
                        <FaUserMinus size="30px"/>
                    </button>
                </div>

                <div className="user-resume">
                    <img src={user_avatar} alt="user avatar"/>
                    <div className="user_text">
                        <p className="user_name">{user.name}</p>
                        <p className="user_email">{user.email}</p>
                    </div>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <label>Deseja mudar seu nome?</label>
                    <input className="input_text" type="text" id="name" 
                        placeholder={user.name} onChange={e => setName(e.target.value)}/>
                
                    <label>Deseja mudar seu email?</label>
                    <input className="input_text" type="text" id="email" 
                        placeholder={user.email} onChange={e => setEmail(e.target.value)}/>
                    <input className="input_text" type="text" id="confirm_email" 
                        placeholder="confirmar novo email" onChange={e => e.target.value === email ?
                        true : false}/>

                    <label>Deseja mudar sua senha?</label>
                    <input className="input_text" type="password" id="password" 
                        placeholder="nova senha" onChange={e => setPassword(e.target.value)}/>
                    <input className="input_text" type="password" id="confirm_password" 
                        placeholder="confirmar nova senha" onChange={e => e.target.value === password ?
                        true : false}/>

                    <label>Deseja Alterar seu endereço?</label>
                    <input className="input_text" type="text" id="postal_code" placeholder={user.address.postal_code}
                        onChange={e => setAddress({...address, postal_code: e.target.value})}/>
                    <div>
                        <input className="input_text" type="text" id="street" placeholder={user.address.street}
                            onChange={e => setAddress({...address, street: e.target.value})}/>
                        <input className="input_text" type="text" id="number" placeholder={user.address.number}
                            onChange={e => setAddress({...address, number: e.target.value})}/>
                    </div>
                    <input className="input_text" type="text" id="district" placeholder={user.address.district} 
                        onChange={e => setAddress({...address, district: e.target.value})}/>
                    <input className="input_text" type="text" id="city" placeholder={user.address.city} 
                        onChange={e => setAddress({...address, city: e.target.value})}/>
                    <input className="input_text" type="text" id="state" placeholder={user.address.state} 
                        onChange={e => setAddress({...address, state: e.target.value})}/>
                    <input className="input_text" type="text" id="country" placeholder={user.address.country}
                        onChange={e => setAddress({...address, country: e.target.value})}/>

                    <div>
                        <button type="reset" className="soft_buttom" onClick={handleCancelClick}>CANCELAR</button>
                        <button type="submit" className="submit_buttom">CONFIRMAR</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Profile;