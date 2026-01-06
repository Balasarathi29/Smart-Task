import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
  }

  return (
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 flex flex-col justify-center gap-3 mt-50">
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
            {error && <p>{error}</p>}
            <button className='login-button text-white bg-primary' type="submit">Login</button>
            <p className="text-[13px] text-slate-800 mt-3">Don't have an account?  
            <Link className="font-medium text-primary underline" to="/signup"> Signup</Link></p>
          </form>
        </div>
    </AuthLayout>
  );
};

export default Login;
