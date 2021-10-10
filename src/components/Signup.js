import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

function Signup(props) {
    const [credentials, setcredentials] = useState({name:"", email: "", password: "", cpassword:"" });
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials;
        //login page to login user
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            //redirected
           localStorage.setItem('token', json);
           history.push("/")
           props.showAlert("Signup Successfully ","success")
        }else{
            props.showAlert("Envalid credentials ","danger")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  name="email" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
