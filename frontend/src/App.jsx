import { useEffect, useState } from 'react'

import * as noteService from './services/Notes'
import { Note } from './components/Note'
import { Form } from './components/Form'
import { Notification } from './components/Notification'
import { Footer } from './components/Footer'
import './index.css'


const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = async (newNote) => {
    try {
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5
      }
      const response = await noteService.create(noteObject)

      setNotes(notes.concat(await response))
    } catch (error) {
      setErrorMessage(`Error adding a new note to the server: ${error}`)
    }
  }

  const toggleImportanceOf = async (id) => {
    try {
      const note = notes.find(note => note.id === id)
      const changedNote = { ...note, important:!note.important}

      const response = await noteService.update(id, changedNote)
    
      setNotes(notes.map(note => note.id !== id ? note : response))
    } catch (error) {
      setErrorMessage(`Error setting the importance of a note: ${error}`)
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await noteService.remove(id)
      setNotes(notes.filter(note => note.id !== response.id))
    } catch (error) {
      setErrorMessage(`Error deleting a note: ${error}`)
    }
  }
    

  useEffect(() => {
    noteService
      .getAll()
      .then(data => setNotes(data))
      .catch(error => setErrorMessage(`Error conecting to the server: ${error}`))
  }, [])


  return (
    <>

    <h1>Notes</h1>
  
    <Notification message={errorMessage} />

    <div>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'all' : 'important'}</button>
    </div>

    <div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note}  toggleImportance={() => toggleImportanceOf(note.id)}  deleteNote={() => deleteNote(note.id)}/>
        )}
      </ul>
    </div>

    <h3>Add a new note</h3>
    <div>
      <Form addNote={addNote} />
    </div>

    <Footer />
    </>
  )
}

export default App