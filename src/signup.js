import React from 'react';
import "./App.css"
import { useState } from 'react';
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

    let [user, setUser] = useState({})

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setUser({
          ...user,
          [name]: value
        })
    }

    function handleClickSignup(e) {
        e.preventDefault();

        if (user.email.includes('cphbusiness.dk') 
            && user.username.length >= 8
            && user.password.length >= 8) 
        {
                addDoc(usersCollection, user)
                setUser({})
                e.target.reset()
                navigate('/login')
        }
    }

    function handleRedirect() {
        navigate('/login')
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleClickSignup}>
                <input type='email' placeholder='Email' name='email' onChange={handleChange} />
                <input type='text' placeholder='Username' name='username' onChange={handleChange} />
                <input type='password' placeholder='Password' name='password' onChange={handleChange} />
                <button type='submit'>Sign up</button>
            </form>
            <div className='wrapper'>
                <button onClick={handleRedirect}>Have an account already? Log in to Twitter</button>
            </div>
        </div>
    )
}

export default Signup;