import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter your password");
      return;
    }
    if(password.length <8){
      setError("Password must be at least 8 characters long");
      return;
    }
    if(!validatePassword(password)){
      setError("Password must contain at least one letter and one number");
      return;
    }
    setError("");
  }

  return (
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 flex flex-col justify-center gap-3 mt-30">
          <h2 className="font-semibold text-2xl text-black ">Welcome Back</h2>
          <p className="text-slate-600 text-xs">Please enter your details to log in</p>

          <form onSubmit={handleSubmit}>
            <Input
            value = {email}
            label = "Email Address"
            placeholder = {"info@gmail.com"}
            type = "text"
            onChange = {(e) => setEmail(e.target.value)}
            />
            <Input
            value = {password}
            label = "Password"
            placeholder = {"min 8 characters"}
            type = "password"
            onChange = {(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm font-medium text-red-600 mb-3">{error}</p>}
            <button className='login-button text-white bg-primary' type="submit">Login</button>
            <p className="text-[13px] text-slate-800 mt-3">Don't have an account?  
            <Link className="font-medium text-primary underline" to="/signup"> Signup</Link></p>
          </form>
        </div>
    </AuthLayout>
  );
};

export default Login;
