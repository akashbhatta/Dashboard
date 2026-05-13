import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from './context/AuthContext'
import { Form, useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);

    useEffect(()=>{
        emailRef.current?.focus();
    },[])
    const emailError = email && !email.includes("@") ? "Enter a valid email" : "";
    const passwordError = password && password.length<8? "Minimum 8 characters": "";
    const isValid = email.includes("@") &&  password.length>=8; 
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (!isValid) return;
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login Failed");
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <p>Sign in to continue learning</p>
            <label>Email</label>
            <input type="email" value={email} ref={emailRef} 
            onChange={e => setEmail(e.target.value)} placeholder='abc@gmail.com' required
            />
            
            {emailError && <span>{emailError}</span>}
            <label>Password</label>
            <input type="password" value={password} onChange={e=> setPassword(e.target.value)} required/>
            {passwordError && <span>{passwordError}</span>}
            {error && <p role='alert'>{error}</p>}

            <button type="submit" disabled={!isValid || loading}>
                {loading ? "Signing in": "Sign in"}
            </button>
         
        </form>
    );
}
