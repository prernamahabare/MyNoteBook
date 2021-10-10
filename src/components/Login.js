import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login=(props)=> {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //login page to login user
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        });
        const json = await response.json()

        if (json.success){
            // Save the auth token and redirect
            props.showAlert("Login successfully","success")
            let json_1 = JSON.stringify(json)
            localStorage.setItem('token',json_1); 
            console.log(localStorage.getItem('token'))
            history.push('/about');
        }
        else {
            alert("Invalid credentials");
        }

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
