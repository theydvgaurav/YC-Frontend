import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem('userInformation'));
        if(userInfo)
            history('/contact-list')
    },[history])

    const submitForm = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({ email, password });

        const config = {
            method: 'post',
            url: 'https://yc-backend-production.up.railway.app/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                localStorage.setItem('userInformation', JSON.stringify(response.data));
                history('/contact-list')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const _loginRedirect = () => {
        history('/signup')
    }

    return (
        <div className='mainContainer'>
            <div className='heading'>Login Screen</div>
            <form onSubmit={submitForm}>
                <div className='inputContainer'>
                    <input 
                        type="email" 
                        placeholder='Email' 
                        required
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className='inputContainer'>
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required
                        onChange={e => setPassword(e.target.value)} 
                    />
                </div>
                <button className='button'>Submit</button>
            </form>
            <div className='alreadyAccount'>Not a existing User <span onClick={_loginRedirect} className='login'>Register here</span> </div>
        </div>
    )
}

export default Login
