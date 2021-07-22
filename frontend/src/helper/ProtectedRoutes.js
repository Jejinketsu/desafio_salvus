import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../services/authHook";

const ProtectedRouter = (props) => {
  const { login } = React.useContext(authContext);

  if (login === true) 
    return <Route {...props} />;
  else if (login === false) 
    return <Redirect to={{pathname: "/"}} />;
  else 
    return null;
};

export default ProtectedRouter;