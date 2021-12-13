import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import './Login.css'
import { FormGroup } from 'react-bootstrap'
import LoaderButton from "../components/LoaderButton";

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoding] = useState(false)
  const [auth, setAuth] = useState(false)

  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  async function handleSubmit(event) {
    //  event.prventDefault()
    setIsLoding(true)
   // console.log('handleSubmit');

    const opt = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }

    const res = fetch('http://localhost:8090/api/auth/login', opt)
    const data = await res.json()
    console.log(data);
    setIsLoding(false)
    if (data.status === 'ok')
      this.setAuth(true)
            
  }


  return (
    <>
      <div className='Login'>
        <Form onSubmit={handleSubmit}>
          <Form.Group size='lg' controlId='account'>
            <Form.Label>Account</Form.Label>
            <Form.Control
              autoFocus
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <FormGroup size='lg' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <LoaderButton
            block size='lg' type='submit' disabled={!validateForm()}
            isLoading={isLoading}
          >Login</LoaderButton>
        </Form>
      </div>
      <p>{auth}</p>
    </>
  )
}