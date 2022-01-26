import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './signup.module.css';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { signUp } from '../../http';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ variant: '', message: '' });

  function validateForm() {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAlert({ variant: '', message: '' });

    if (confirmPassword !== password) {
      setAlert({
        variant: 'danger',
        message: 'Password and Confirm Password must have to be same.',
      });

      return false;
    }
    setAlert({ variant: '', message: '' });
    signUp({ email, password, name })
      .then(({ data }) => {
        setAlert({ variant: 'success', message: data.message });
        console.log(data);

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch((err) => {
        setAlert({ variant: 'danger', message: err.response.data.message });
      });
  }

  return (
    <div className={styles.signUp}>
      <Form onSubmit={handleSubmit}>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form.Group size='lg' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group size='lg' controlId='confirm_password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' disabled={!validateForm()} className='mt-3'>
          Sign Up
        </Button>
        <p className={styles.link}>
          Have a account ?<Link to='/login'>Login</Link>
          here
        </p>
      </Form>
    </div>
  );
};

export default Signup;
