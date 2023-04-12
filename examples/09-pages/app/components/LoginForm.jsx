"use client"
import { useState, useRef } from "react"

export default function LoginForm () {
/*    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")*/
    const [values, setValues] = useState({ email: "", password: "" })

    const handleChange = e => {
        const {name, value} = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        alert(JSON.stringify(values))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
                name="email" id="email" placeholder="e-mail"
                type="email" required
                value={values.email}
                onChange={handleChange} />

            <label htmlFor='password'>Password</label>
            <input
                name="password" id="password" placeholder="password"
                type="password" required
                value={values.password}
                onChange={handleChange} />

            <button type="submit">Login</button>
            <p>email: {values.email}</p>
            <p>password: {values.password}</p>
        </form>
    )
}