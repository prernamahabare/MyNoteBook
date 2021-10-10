import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const noteinitial = [];
    const [notes, setnotes] = useState(noteinitial)
    let token = JSON.parse(localStorage.getItem('token'))
    //console.log(token.Auth_token)

    //Add Note
    const addnote = async (title, description, tag) => {
        //API call to create new note
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //  'auth-token':  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YTkwNTJlNzg0YmQzNzAwNzczZDAxIn0sImlhdCI6MTYzMzMyNTM2NH0.gkNtTrtKaIBhtUrabL6FX165SsNk-qkrRa2xvMjOiqs"
                'auth-token':  token.Auth_token
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        setnotes(notes.concat(note))
    }

   
    //Delete Note
    const deletenote = async (id) => {
        //API call to edit note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YTkwNTJlNzg0YmQzNzAwNzczZDAxIn0sImlhdCI6MTYzMzMyNTM2NH0.gkNtTrtKaIBhtUrabL6FX165SsNk-qkrRa2xvMjOiqs"
                'auth-token':  token.Auth_token
            },
        })
        const json = await response.json();
        const newnote = notes.filter((note) => { return note._id !== id })
        setnotes(newnote)
    }

    //Edit Note
    const editnote = async (id, title, description, tag) => {

        //API call to edit note
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YTkwNTJlNzg0YmQzNzAwNzczZDAxIn0sImlhdCI6MTYzMzMyNTM2NH0.gkNtTrtKaIBhtUrabL6FX165SsNk-qkrRa2xvMjOiqs"
                'auth-token':  token.Auth_token
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();

        let newnote = JSON.parse(JSON.stringify(notes))
        //logic to edit note
        for (let index = 0; index < newnote.length; index++) {
            const element = newnote[index];
            if (element._id === id) {
                newnote[index].title = title;
                newnote[index].description = description;
                newnote[index].tag = tag;
                break;
            }
        }
        setnotes(newnote);
    }
     //Get all Notes
     const getnotes = async() => {
        //API call to create new note
        const response =  await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YTkwNTJlNzg0YmQzNzAwNzczZDAxIn0sImlhdCI6MTYzMzMyNTM2NH0.gkNtTrtKaIBhtUrabL6FX165SsNk-qkrRa2xvMjOiqs"
                'auth-token':  token.Auth_token
            },
        })
        // .then(response=> console.log(response))
        // .catch(error => console.log(error));
        const json =  await response.json();
        setnotes(json)
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState