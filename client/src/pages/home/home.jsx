import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../http';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    getAllUsers(token)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <div className={`my-2 ${styles.header}`}>
        <h3>All Users</h3>
        <Link to='numbers'>
          <Button>Play with numbers</Button>
        </Link>
      </div>
      <Alert variant='primary' className={styles.header}>
        <div style={{ width: '2rem' }}>Id</div>
        <div style={{ width: '4rem' }}>Name</div>
        <div style={{ width: '4rem' }}>Email</div>
        <div style={{ width: '2rem' }}>Age</div>
      </Alert>
      {users.map((user) => (
        <Link to={`/${user.id}`}>
          <Alert key={user.id} variant='info' className={styles.user}>
            <div style={{ width: '2rem' }}>{user.id}</div>
            <div style={{ width: '4rem' }}>{user.name}</div>
            <div style={{ width: '4rem' }}>{user.email}</div>
            <div style={{ width: '2rem' }}>{user.age}</div>
          </Alert>
        </Link>
      ))}
    </div>
  );
};

export default Home;
