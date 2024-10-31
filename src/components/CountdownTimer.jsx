import React from 'react';
import {useState, useEffect} from 'react'


const CountdownTimer = () => {
    const [eventDate, setEventDate] = useState('');
    const [eventName, setEventName] = useState('');
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        if(countdownStarted && eventDate) {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const eventTime = new Date(eventDate).getTime();
                let remainingTime = eventTime - currentTime;

                if(remainingTime <= 0) {
                    remainingTime = 0;
                    clearInterval(countdownInterval);
                    alert("Countdown complete!");
                }
                setTimeRemaining(remainingTime);
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    },[eventDate, countdownStarted, timeRemaining]);

    useEffect(()=>{
        if(countdownStarted) {
            document.title = eventName;
        }
    },[eventName, countdownStarted]);

    function handleSetCountdown(){
        setCountdownStarted(true);
        localStorage.setItem("eventDate", eventDate);
        localStorage.setItem("eventName", eventName);
    }

    function handleStopCountdown(){
        setCountdownStarted(false);
        setTimeRemaining(0);

    }

    function handleResetCountdown(){
        setCountdownStarted(false);
        setEventName('');
        setEventDate('');
        localStorage.removeItem("eventDate");
        localStorage.removeItem("eventName");
    }

    const formatDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(date).toLocaleDateString('en-US', options)
    }

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        return (
            <div className="countdown-display">
                <div className="countdown-value">
                    {days.toString().padStart(2, '0')}<span>days</span>
                </div>
                <div className="countdown-value">
                    {hours.toString().padStart(2, '0')}<span>hours</span>
                </div>
                <div className="countdown-value">
                    {minutes.toString().padStart(2, '0')}<span>minutes</span>
                </div>
                <div className="countdown-value">
                    {seconds.toString().padStart(2, '0')}<span>seconds</span>
                </div>
            </div>
        )
    }

    return (
        <div className='countdown-timer-container'>
            <h2 className="countdown-name">
                {countdownStarted ? eventName : "Countdown Timer"}
            </h2>
            <p className="countdown-date">
                {countdownStarted && formatDate(eventDate)}
            </p>
            {!countdownStarted ? (<div className="countdown-timer-form">
                <form action=""></form>
                <label htmlFor="title">Event Name:</label>
                <input name='title'
                       type="text"
                       placeholder='Enter Event Name'
                       value={eventName}
                       onChange={(e) => setEventName(e.target.value)}
                />
                <label htmlFor="title">Event Date:</label>
                <input name='date-picker'
                       type="date"
                       value={eventDate}
                       onChange={(e) => setEventDate(e.target.value)}
                       onClick={(e) => (e.target.type = 'date')}

                />
                <button onClick={handleSetCountdown}>Start Countdown</button>
            </div>) :
                <>
                {formatTime(timeRemaining)}
                    <div className="control-buttons">
                        <button onClick={handleStopCountdown}>Stop</button>
                        <button onClick={handleResetCountdown}>Reset</button>
                    </div>
                </>
            }


        </div>
    );
};

export default CountdownTimer;