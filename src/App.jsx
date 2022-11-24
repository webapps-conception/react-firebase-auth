import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom'
import {
  FirebaseCheck,
  FirebaseSignIn,
  FirebaseSignOut
} from './firebaseAuth'
import SignIn from './signin'


function App() {
  const [stateUser, isUser] = useState(null)
  const [stateError, isError] = useState(null)

  function Status() {
    FirebaseCheck(isUser)
    return (
      <p>
        Statut: {stateUser != null ? 'utilisateur connecté en ' + stateUser : 'déconnecté'}
      </p>
    )
  }

  function Error() {
    if (stateError) {
      return (
        <p style={{ color: 'red' }}><b>{stateError}</b></p>
      )
    }
  }
  
  function Buttons() {
    if (stateUser) {
      return (
        <button onClick={handleClickSignOut}>
          Sign-out
        </button>
      )
    } else {
      return (
        <SignIn isError={isError} />
      )
    }
  }

  function handleClickSignOut() {
    FirebaseSignOut(isError)
  }

  return (
    <div className="App">
      <h1>Hello Firebase Basic Authentificate</h1>
      <Status />
      <Error />
      <Buttons />
    </div>
  )
}

export default App
