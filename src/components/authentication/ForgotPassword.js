import React, { useRef, useState } from 'react'
import {
  Form,
  Button,
  TextInput,
  Tile,
  InlineNotification,
} from 'carbon-components-react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from "react-router-dom"
import '../../styles/authentication.scss';


export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check you inbox for further instructions')
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false)
  }

  return (
        <div className="container">
      <Tile>
        <h2 className="text-left" >Esqueci minha senha</h2>

        {error &&
          <InlineNotification
            iconDescription="Fechar"
            timeout={0}
            title={error}
            kind="error"
          />}
        {message &&
          <InlineNotification
            iconDescription="Fechar"
            timeout={0}
            title={message}
            kind="success"
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
          <div className="button-wrapper">
            <Button
              className="text-right"
              disabled={loading}
              kind="primary"
              tabIndex={0}
              type="submit"
            >
              Enviar Email
            </Button>
          </div>
        </Form>

        <div className="signup-container">
          <Link to="/login">Cancelar</Link>
        </div>
      </Tile>

    </div>
  )
}
