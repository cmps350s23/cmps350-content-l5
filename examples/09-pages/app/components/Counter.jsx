"use client"
import {useState, useEffect} from "react"

export default function Counter() {
    //let count = 0

    const [count, setCount] = useState(0)

    //Invoked only one time when the component is first mounted to the DOM.
    useEffect(() => {
        console.log(`I just mounted!`)
    }, [])

    //Gets auto-executed on every render (i.e., every time count changes)
    useEffect(() => {
        console.log(`The count is now ${count}`)
    })

    function increment() {
         setCount(count + 1)
    }

    function handleFancyBoxClick(clickCount) {
        //alert(`Fancy box clicked! ${clickCount} times`)
        console.log(`Fancy box clicked! ${clickCount} times`)
    }

    return <div>
        Count: {count}
        <button onClick={ () => increment() }>+</button>
        <button onClick={ () => setCount(count - 1) }>-</button>
        <button onClick={ () => setCount(0) }>Reset</button>
        Init Val <input  onChange={ (e) => setCount(parseInt(e.target.value)) } />
        <br />
        <FancyBox count={count} onClick= { handleFancyBoxClick } />
    </div>    
}

function FancyBox({count, onClick}) {
    const [clickCount, setClickCount] = useState(1)
    return <div className="fancyBox" onClick={() => { 
            setClickCount(clickCount + 1)
            onClick(clickCount) }
        }>
        Current Count: {count}
    </div>
}

