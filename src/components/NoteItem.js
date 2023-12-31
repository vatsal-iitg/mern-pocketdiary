import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const { note,updateNote } = props;
  const context = useContext(noteContext)
  const {deleteNote} = context
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="d-flex align-items-center">
        <h5 className="card-title">{note.title}</h5>
        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);
        props.showAlert("Deleted successfully","success")}}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{console.log('updatenote clicked');
        updateNote(note);}}></i>
        </div>
        <p className="card-text">{note.description}</p>
        
      </div>
    </div>
  );
}
