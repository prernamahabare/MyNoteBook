import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import NoteState from './Context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert = {showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert = {showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert = {showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>

  )
}

export default App;

