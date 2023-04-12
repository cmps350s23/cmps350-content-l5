"use client"
import {useState} from "react"
import FriendForm from "./FriendForm"

export default function FriendsList() {
    const [friends, setFriends] = useState(['Fatima', 'Mouza', 'Sarah'])

    const handleAddFriend = name => {
        //Clone the friends then add the new one
        const newFriends = [...friends, name]
        setFriends(newFriends)
    }

    //const handleClick = () => alert('You did it!')

    return <>
       {/* <a href='' onClick={handleClick}> Click me</a>*/}
            <FriendForm onAddFriend={handleAddFriend} />
            <ul>
                {friends.map((friend, i) =>
                    <li key={i}>{friend}</li>
                )}
            </ul>
          </>
}