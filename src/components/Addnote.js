import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/NoteContext';

function Addnote(props) {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handlesubmitnote = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully!!!","success")
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <h3>Add notes</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Descripation</label>
                    <input type="text" className="form-control" id="descripation" name="description" value={note.description} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required />
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary mb-3" onClick={handlesubmitnote}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
