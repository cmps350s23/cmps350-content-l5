"use client"
import {useState} from 'react'

export default function FriendForm({onAddFriend}) {
    const [name, setName] = useState('')

    const handleAddFriend = () => {
        onAddFriend(name)
        setName('')
    }

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleAddFriend}> Add Friend</button>
        </div>
    )
}