import { useState } from 'react'
import './App.css'

function App() {
  

  return (
    <>
    <h1>TraficTracker</h1>
      <form action="login" id="loginForm" method="post">
        User Name: <input type="text" name="usr.name" />
        Password: <input type="password" name="usr.pwd" />
        <input type="submit" value="Login" />
      </form>
    </>
  )
}

export default App
