import React from 'react';
import styles from './header.module.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';

const Header = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.root}>
      <div className={styles.brand}> Application</div>
      <div className={styles.auth}>
        {user && <span className={styles.user}>{user.name}</span>}
        {isAuth ? (
          <Button variant='primary' onClick={signOut}>
            Sign out
          </Button>
        ) : (
          <Link to='/login'>
            <Button variant='primary'>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
