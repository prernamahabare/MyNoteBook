import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useHistory } from 'react-router-dom';

function Note(props) {
    const context = useContext(noteContext);
    let history = useHistory()
    const { notes, getnotes, editnote } = context;
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        if (!token.Auth_token){
            history.push("/login")
            console.log(12)
        }
        else {
            getnotes()
            console.log(14)
            console.log(token.Auth_token)
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handlesubmitnote = (e) => {
        console.log("Updating the note...", note)
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully!!!", "success")
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <Addnote showAlert={props.showAlert} />
                <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                        {/* <div id="emailHelp" className="form-text"></div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Descripation</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                        <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handlesubmitnote} className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row container">
                <h4>Your Notes</h4>
                <div className="container">
                    {notes.length === 0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                })}
            </div> */}
            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
export default Note
