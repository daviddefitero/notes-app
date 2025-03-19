import { useState } from "react"

export const Form = ({addNote}) => {
    const [newNote, setNewNote] = useState('... new note')

    const handleNewNote = (event) => {
        event.preventDefault()
        addNote(newNote)
        setNewNote('')
    }


    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    return (

        <form onSubmit={handleNewNote}>  
            <input onChange={handleChange} value={newNote} />
            <button type="submit">Submit</button>
        </form>
    )
}