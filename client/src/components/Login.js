import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Form, Input, Button } from 'reactstrap'

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
    <Form onSubmit={login} className="login-form">
      Login to view the color list
      <Input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button color="primary" outline >Login in</Button>
    </Form>
  )
}

export default Login