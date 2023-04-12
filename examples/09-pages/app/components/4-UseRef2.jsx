"use client"
import {useState, useEffect, useRef} from 'react'

export default function HookTimer() {
  const [state, setState] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setState(prev => prev + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div>
      HookTimer - {state} -
      <button onClick={() => clearInterval(intervalRef.current)}>Clear Timer</button>
    </div>
  )
}