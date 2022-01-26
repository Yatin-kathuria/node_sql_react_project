import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './numbers.module.css';
import Alert from 'react-bootstrap/Alert';
import { getNumbers, setNumbers as setNumbersApi } from '../../http';
import { useSelector } from 'react-redux';

const Numbers = () => {
  const {
    user: { id },
    token,
  } = useSelector((state) => state.user);

  const [alert, setAlert] = useState({ variant: '', message: '' });
  const [numbers, setNumbers] = useState('');
  const [calc, setCalc] = useState({});

  function handleSetNumbers(event) {
    event.preventDefault();
    setAlert({ variant: '', message: '' });
    let nums = numbers.split(',');
    if (nums.length < 5) {
      setAlert({ variant: 'danger', message: '5 numbers are required' });
      return;
    }

    for (let n of nums) {
      if (isNaN(n) || n.trim() == '') {
        setAlert({ variant: 'danger', message: 'Only numbers are required' });
        return;
      }
    }

    nums = nums.map(Number);
    setNumbersApi(id, nums, token)
      .then(({ data }) => {
        setAlert({ variant: 'success', message: 'Numbers Saved.' });
        console.log(data);
      })
      .catch((err) => {
        setAlert({ variant: 'danger', message: 'Something Went Wrong' });
      });
  }

  const fetchNumbers = () => {
    getNumbers(id, token)
      .then(({ data }) => {
        console.log(data);
        setCalc(data);
      })
      .catch((err) => {
        setAlert({ variant: 'danger', message: err.response.data.message });
      });
  };

  return (
    <div className={styles.root}>
      <Form onSubmit={handleSetNumbers}>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form.Group size='lg' controlId='email'>
          <p>Enter 5 comma(,) separated numbers.</p>
          <Form.Label>Numbers</Form.Label>
          <Form.Control
            autoFocus
            type='text'
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
          />
        </Form.Group>
        <Button
          className='mt-3'
          onClick={handleSetNumbers}
          style={{ marginRight: '1rem' }}
        >
          Set Numbers
        </Button>
        <Button className='mt-3' onClick={fetchNumbers}>
          Fetch Numbers
        </Button>
        {Object.keys(calc).map((key) => (
          <p key={key}>
            {key} : {calc[key]}
          </p>
        ))}
      </Form>
    </div>
  );
};

export default Numbers;
