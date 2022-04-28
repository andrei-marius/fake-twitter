import React from 'react';
import "./App.css"
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query } from 'firebase/firestore'
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

function Login(){
    const firebApp = initializeApp(firebaseConfig)
    const firestore = getFirestore(firebApp)
    const usersCollection = collection(firestore, 'users')

    let [users, setUsers] = useState([])
    let [loggingUser, setLoggingUser] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        onSnapshot(query(usersCollection), snapshot => {
            const data = snapshot.docs.map(doc => 
                doc.data()
            )
            setUsers(data)
        })
    }, [])

    const handleChange = ({ target: { name, value } }) => {
        setLoggingUser({
          ...loggingUser,
          [name]: value
        })
    }

    function handleClickLogin(e) {
        e.preventDefault();

        const checkUsers = users.map((user, index) => {
            return user.username === loggingUser.username && user.password === loggingUser.password
        })

        if (checkUsers.includes(true)) {
            localStorage.setItem('user', loggingUser.username)
            localStorage.setItem('loggedIn', true)
            navigate('/')
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleClickLogin}>
                <input type='text' placeholder='Username' name='username' onChange={handleChange} />
                <input type='password' placeholder='Password' name='password' onChange={handleChange} />
                <button type='submit'>Log in</button>
            </form>
            <div className='wrapper'>
                <a href="/fake-twitter/signup">Don't have an account? Sign up for Twitter</a>
            </div>
        </div>
    )
}

export default Login;