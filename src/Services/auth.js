import api from './api';

export async function loginRequest(email, password) {
  const response = await api.get('/users', {
    params: { email },
  });

  // json-server returns array
  const user = response.data.find(
    (u) => u.password === password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  return user;
}