import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = props => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        props.history.push("/protected")
      })
      .catch(err => console.log(err))
  }

  return (
    <form onSubmit={login}>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button>Login in</button>
    </form>
  )
}

export default Login