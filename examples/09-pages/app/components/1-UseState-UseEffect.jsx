"use client"
import { useEffect, useState } from "react"

export default function FavoriteColor() {
  const [color, setColor] = useState("green")

  useEffect(() => {
    document.body.style.background = color
  })

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
    </>
  )
}