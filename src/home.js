import React from 'react';
import "./App.css"
import { useState, useEffect } from 'react';
import Tweet from './tweet';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query } from 'firebase/firestore'
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

function Home() {
    const firebApp = initializeApp(firebaseConfig)
    const firestore = getFirestore(firebApp)
    const tweetsCollection = collection(firestore, 'tweets')

    let [tweet, setTweet] = useState('')
    let [tweets, setTweets] = useState([])

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate('/login')
    }

    useEffect(() => {
        onSnapshot(query(tweetsCollection), snapshot => {
            const data = snapshot.docs.map(doc => 
                doc.data()
            )
            setTweets(data)
        })
    })

    function handleChange(e) {
        setTweet(e.target.value)
    }

    function handleClickTweet() {
        const data = {
            user: localStorage.user,
            message: tweet,
            createdAt: new Date().getTime()
        }
        addDoc(tweetsCollection, data)
        setTweet('')
    }

    if (!localStorage.getItem('loggedIn')) {
        return navigate('/login')
    }

    return (
        <div className='container'>
        <div className='title'>
            <h1>Fake Twitter</h1>
            <button onClick={handleLogout}>Log out</button>
        </div>
        <textarea onChange={handleChange} placeholder="Tweet ..."></textarea>
        <button onClick={handleClickTweet}>Tweet</button>
        <div className='tweets'>
            {tweets.map(item => {
                return <Tweet
                    key={item.user}
                    user={item.user}
                    message={item.message}
                /> 
            })}
        </div>
        </div>
    );
}

export default Home;