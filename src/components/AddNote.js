import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "Default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Describe"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
