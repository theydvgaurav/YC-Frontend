import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const history = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInformation'));
        if (userInfo)
            history('/contact-list')
    }, [history])

    const submitForm = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({ name, email, password });

        const config = {
            method: 'post',
            url: 'https://yc-backend-production.up.railway.app/register',
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
        history('/')
    }

    return (
        <div className='mainContainer'>
            <div className='heading'>Registration Screen</div>
            <form onSubmit={submitForm}>
                <div className='inputContainer'>
                    <input
                        type="type"
                        required
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='inputContainer'>
                    <input
                        type="email"
                        required
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='inputContainer'>
                    <input
                        type="password"
                        required
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className='button'>Submit</button>
            </form>
            <div className='alreadyAccount'>Have an account ? <span onClick={_loginRedirect} className='login'>Login here</span> </div>
        </div>
    )
}

export default Signup;