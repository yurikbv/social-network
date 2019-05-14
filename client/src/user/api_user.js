export const read = (userId, token) => {
  return fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
      .then(response => response.json())
      .catch(err => console.error(err));
};

export const list = () => {
  return fetch(`/api/users`, {
    method: 'GET'
  })
      .then(response => response.json())
      .catch(err => console.error(err));
};

export const removeAccount = (userId, token) => {
  return fetch(`/api/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
      .then(response => response.json())
      .catch(err => console.error(err));
};

export const update = (userId, token, user) => {
  return fetch(`/api/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
      .then(response => response.json())
      .catch(err => console.error(err));
};