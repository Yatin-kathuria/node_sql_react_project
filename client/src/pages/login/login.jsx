import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../http';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { login as actionLogin } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('yatin@gmail.com');
  const [password, setPassword] = useState('test');
  const [alert, setAlert] = useState({ variant: '', message: '' });

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAlert({ variant: '', message: '' });
    login({ email, password })
      .then(({ data }) => {
        setAlert({ variant: 'success', message: data.message });
        dispatch(actionLogin(data));
        setTimeout(() => {
          navigate('/');
        }, 1000);
        console.log(data);
      })
      .catch((err) => {
        setAlert({ variant: 'danger', message: err.response.data.message });
      });
  }

  return (
    <div className={styles.login}>
      <Form onSubmit={handleSubmit}>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form.Group size='lg' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' disabled={!validateForm()} className='mt-3'>
          Login
        </Button>
        <p className={styles.link}>
          Don't have a account ?<Link to='/signup'>Sign up</Link>
          here
        </p>
      </Form>
    </div>
  );
};

export default Login;
