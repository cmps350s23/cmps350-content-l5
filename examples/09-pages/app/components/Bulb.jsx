"use client"
import {useState} from 'react';

export default function Bulb() {
    const [isBulbOn, setIsBulbOn] = useState(false);
    return (
        <>
        <img style={ {height : "300px"}}
            src={ isBulbOn ? "/images/bulb-on.png" : "/images/bulb-off.png" }
            onMouseOver={() => setIsBulbOn(true)}
            onMouseOut={() => setIsBulbOn(false)} />
        <br />
        <input type="button"
            value= {isBulbOn ? "Turn off" : "Turn on"}
            onClick={() => setIsBulbOn(!isBulbOn)} />
        </>
    );
}