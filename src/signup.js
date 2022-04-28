import React from 'react';
import "./App.css"
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyDai2lh6LjgY4w805rpa0KWyfW1mrZWkQw",
    authDomain: "fake-twitter-3fee7.firebaseapp.com",
    projectId: "fake-twitter-3fee7",
    storageBucket: "fake-twitter-3fee7.appspot.com",
    messagingSenderId: "936681425178",
    appId: "1:936681425178:web:27fbd3c4c3e62aee6304a3",
    measurementId: "G-DMPD93WMS4"
};

function Signup(){
    const firebApp = initializeApp(firebaseConfig)
    const firestore = getFirestore(firebApp)
    const usersCollection = collection(firestore, 'users')

    let [user, setUser] = useState({ email: 'initial', username: 'initial', password: 'initial' })
    let [showError, setShowError] = useState(false)
    let [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loggedIn')) {
            return navigate('/')
        }
    })

    const handleChange = ({ target: { name, value } }) => {
        setUser({
          ...user,
          [name]: value
        })
    }

    function handleClickSignup(e) {
        e.preventDefault();

        if (!user.email.includes('cphbusiness.dk')) {
            e.target.email.classList.add('error')
            setErrorMsg('Email should contain cphbusiness.dk')
            setShowError(true)
            return
        } else if (user.username.length < 8) {
            e.target.username.classList.add('error')
            setErrorMsg('Username should have at least 8 characters')
            setShowError(true)
            return
        } else if (user.password.length < 8) {
            e.target.password.classList.add('error')
            setErrorMsg('Password should have at least 8 characters')
            setShowError(true)
            return
        } else {
            setShowError(false)
            addDoc(usersCollection, user)
            setUser({})
            e.target.reset()
            navigate('/login')
        }
    }

    function handleFocus(e) {
        e.target.classList.remove('error')
    }

    function handleRedirect() {
        navigate('/login')
    }

    return (
        <div className='form-container'>
            {
                showError ? <div className='error-msg'>{errorMsg}</div> : null
            }
            <form onSubmit={handleClickSignup}>
                <input type='email' placeholder='Email' name='email' onChange={handleChange} onFocus={handleFocus} />
                <input type='text' placeholder='Username' name='username' onChange={handleChange} onFocus={handleFocus} />
                <input type='password' placeholder='Password' name='password' onChange={handleChange} onFocus={handleFocus} />
                <button type='submit'>Sign up</button>
            </form>
            <div className='wrapper'>
                <button onClick={handleRedirect}>Have an account already? Log in to Twitter</button>
            </div>
        </div>
    )
}

export default Signup;