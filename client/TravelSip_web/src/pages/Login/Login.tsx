import React from "react";
import { FormLogin } from "../../component";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const {authState} = useAuth()
  console.log(authState)
  return <FormLogin />;
};

export default Login;
