import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext';

function Noteitem(props) {
    const context = useContext(noteContext);
    const { deletenote } = context
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* <p className="card-text">{note.tag}</p> */}
                    <i className="far fa-edit mx-1" onClick={() => {updateNote(note)}}></i>
                    <i className="far fa-trash-alt mx-1" onClick={() => {deletenote(note._id);props.showAlert("Deleted Successfully!!!","success") }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
