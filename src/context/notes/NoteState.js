import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all the notes
  const getNotes=async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2Y0MjU4OWU0NzI1NzIwZWM5MTIzIn0sImlhdCI6MTY4NjM3ODI0Mn0.nJFu-kjplcncwpOZpEIQxUExcBGp5vbuGJcoiYfdT8M'
      }
    })

    const json = await response.json()
    console.log(json)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2Y0MjU4OWU0NzI1NzIwZWM5MTIzIn0sImlhdCI6MTY4NjM3ODI0Mn0.nJFu-kjplcncwpOZpEIQxUExcBGp5vbuGJcoiYfdT8M",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log("Adding a new note");
    let note = {
      _id: "64888871a53be02727e025d2c",
      user: "6483f42589e4725720ec9123",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-13T15:17:14.619Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = (id) => {
    console.log("deleting the note with id " + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update a note
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2Y0MjU4OWU0NzI1NzIwZWM5MTIzIn0sImlhdCI6MTY4NjM3ODI0Mn0.nJFu-kjplcncwpOZpEIQxUExcBGp5vbuGJcoiYfdT8M",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
