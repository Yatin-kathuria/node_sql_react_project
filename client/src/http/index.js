import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export const login = (data) => {
  return api.post('auth/login', data);
};

export const signUp = (data) => {
  return api.post('auth/register', data);
};

export const getAllUsers = (token) => {
  return api.get('users', { headers: { Authorization: `Bearer ${token}` } });
};

export const getSingleUser = (id, token) => {
  return api.get('users/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = (id, user, token) => {
  return api.post('users/' + id, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = (id, token) => {
  return api.delete('users/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const setNumbers = (id, numbers, token) => {
  return api.post(
    'users/numbers/' + id,
    { numbers },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getNumbers = (id, token) => {
  return api.get('users/calculation/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
