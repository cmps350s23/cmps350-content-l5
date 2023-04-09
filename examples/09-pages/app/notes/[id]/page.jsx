import React from 'react'
import styles from '../Notes.module.css'

const getNote = async (noteId) => {
  const res = await fetch(`http://localhost:3500/notes2/${noteId}`,
    { next: { revalidate: 10 } }
  )
  return res.json()
}

const NotePage = async ({ params }) => {
  const note = await getNote(params.id)
  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
      </div>
    </div>
  )
}

export default NotePage
