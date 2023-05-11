"use client";
import { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  // This Ref variable is used to store the timer
  // so that its state is preserved even if the component is re-rendered
  const intervalRef = useRef(null);

  function startTimer() {
    stopTimer();
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    startTimer();
    // Clean up function
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      Timer - {seconds} -
      <button onClick={() => clearInterval(intervalRef.current)}>
        Stop Timer
      </button>
      <button onClick={() => startTimer(intervalRef.current)}>
        Restart Timer
      </button>
    </div>
  );
}
