import React, { useState, createContext, useEffect } from "react";
import api from "./api";

export const authContext = createContext();

export const ProvideAuth = ({children}) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  const signin = async (email, password) => {
    try {
        const response = await api.get('/login', {
            auth: {
                username: email,
                password: password,
            }
        });
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setLogin(true);
    } catch (error) {
        setLogin(false);
    }
  };

  const signout = React.useCallback(() => {
    localStorage.removeItem("token");
    setUser(false);
    setLogin(false);
  });

  useEffect(() => {
    async function getUser(){
        const token = localStorage.getItem("token");
        if(token){
            await api.get("/check_auth", {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setUser(response.data.auth);
            }).catch((error) => {
                signout();
            });
        } else {
            signout();
        }
    }
    getUser();
  }, []);

  return (
    <authContext.Provider value={{signin, signout, user, login}}>
      {children}
    </authContext.Provider>
  )
}