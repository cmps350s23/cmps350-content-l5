import React from 'react'
import Link from 'next/link'
import styles from './notes.module.css'
import CreateNote from './CreateNote'

const getNotes = async () => {
  const res = await fetch('http://localhost:3500/notes',
    { cache: 'no-store' }
  )
  return res.json()
}

export default async function NotesPage() {
  const notes = await getNotes()
  console.log(notes)

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes && notes?.map((note) => {
          return <Note key={note.id} note={note} />
        })}
      </div>

      <CreateNote />
    </div>
  )
}

function Note({ note }) {
  const { id, title, content } = note // || {}

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
      </div>
    </Link>
  )
}
