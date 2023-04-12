"use client"
import {useState, useEffect} from "react"

export default function Counter() {
    const [count, setCount] = useState(0)

    //Invoked only one time when the component is first mounted to the DOM.
    useEffect(() => {
        console.log(`I just mounted!`)
    }, [])

    //Gets auto-executed on every render (i.e., every time count changes)
    useEffect(() => {
        console.log(`The count is now ${count}`)
    })

    return <div>
        Count: {count}
        <button onClick={ () => setCount(count + 1) }>+</button>
        <button onClick={ () => setCount(count - 1) }>-</button>
        <button onClick={ () => setCount(0) }>Reset</button>
        Init Val <input  onChange={ (e) => setCount(parseInt(e.target.value)) } />
    </div>    
}

