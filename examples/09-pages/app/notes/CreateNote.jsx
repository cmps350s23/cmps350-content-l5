'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateNote = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const createNote = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3500/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    setTitle('')
    setContent('')
    router.refresh()
  }

  return (
    <form onSubmit={(e) => createNote(e)}>
      <h3>Create a new note</h3>
      <input
        type='text'
        required
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder='Content'
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type='submit'>Create note</button>
    </form>
  )
}

export default CreateNote