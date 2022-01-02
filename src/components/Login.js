import React, { useRef, useState } from 'react'
import { Form,
  Button,
  TextInput,
  Tile,
  InlineNotification,
  } from 'carbon-components-react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import '../styles/authentication.scss';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <Tile>
        <h2 className="text-left" >Log In</h2>

        {error &&
          <InlineNotification
            iconDescription="Fechar"
            timeout={0}
            title={error}
            kind="error"
          />}
        <Form onSubmit={handleSubmit}>
          <div>
            <TextInput
              id="email"
              invalidText="Invalid error message."
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>
          <div>
            <TextInput.PasswordInput
              id="password"
              invalidText="Invalid error message."
              placeholder="Senha"
              ref={passwordRef}
              required
            />
          </div>
          <div className="forgot-password-container">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>
          <div className="button-wrapper">
            <Button
              className="text-right"
              disabled={loading}
              kind="primary"
              tabIndex={0}
              type="submit"
            >
              Log In
            </Button>
          </div>
        </Form>
        <div className="signup-container">
          <Link to="/signup">Sign Up</Link>
        </div>
      </Tile>

    </div>
  )
}
