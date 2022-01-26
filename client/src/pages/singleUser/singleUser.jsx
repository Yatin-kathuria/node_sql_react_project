import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getSingleUser, updateUser } from '../../http';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from './singleUser.module.css';

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({ variant: '', message: '' });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    getSingleUser(id, token)
      .then(({ data }) => {
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(user.id, { name: user.name, age: user.age }, token)
      .then(({ data }) => {
        setAlert({ variant: 'success', message: 'Update Success' });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        getUser();
        setAlert({
          variant: 'danger',
          message: 'Sonthing went wrong.Cant update the user',
        });
      });
  };

  const handleDelete = () => {
    deleteUser(user.id, token)
      .then(({ data }) => {
        setAlert({ variant: 'success', message: 'Delete Success' });
        navigate('/');
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          variant: 'danger',
          message: 'Unable to delete the user',
        });
      });
  };

  return (
    <div className={styles.root}>
      <Form onSubmit={handleUpdate}>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form.Group size='lg' controlId='name'>
          <Form.Label>Id</Form.Label>
          <Form.Control
            type='text'
            name='id'
            value={user.id || ''}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={user.email || ''}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group size='lg' controlId='email'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={user.name || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group size='lg' controlId='confirm_password'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='number'
            name='age'
            value={user.age || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          className='mt-3'
          style={{ marginRight: '1rem' }}
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button variant='danger' className='mt-3' onClick={handleDelete}>
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default SingleUser;
