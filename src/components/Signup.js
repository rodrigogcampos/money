import React, { useRef, useState } from 'react'
import {
  Form,
  Button,
  TextInput,
  Tile,
  InlineNotification,
} from 'carbon-components-react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import '../styles/authentication.scss';


export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false)
  }

  return (
        <div className="container">
      <Tile>
        <h2 className="text-left" >Criar Conta</h2>

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

          <div>
            <TextInput.PasswordInput
              id="password"
              invalidText="Invalid error message."
              placeholder="Confirmar Senha"
              ref={passwordConfirmRef}
              required
            />
          </div>
          <div className="button-wrapper">
            <Button
              className="text-right"
              disabled={loading}
              kind="primary"
              tabIndex={0}
              type="submit"
            >
              Criar
            </Button>
          </div>
        </Form>

        <div className="signup-container">
          <Link to="/login">Já tem uma conta?</Link>
        </div>
      </Tile>

    </div>
  )
}
