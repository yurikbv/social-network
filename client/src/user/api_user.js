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
      'Authorization': `Bearer ${token}`
    },
    body: user
  })
      .then(response => response.json())
      .catch(err => console.error(err));
};

export const updateLocalUser = (user, next) => {
  if(typeof window !== "undefined"){
    if(localStorage.getItem('jwt')){
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      next();
    }
  }
};

export const follow = (userId, token, followId) => {
  return fetch('/api/user/follow', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({userId,followId})
  })
      .then(response => response.json())
      .catch(err => console.log(err));
};

export const unFollow = (userId, token, unfollowId) => {
  return fetch('/api/user/un_follow', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({userId,unfollowId})
  })
      .then(response => response.json())
      .catch(err => console.log(err));
};

export const findPeople = (userId, token) => {
  return fetch(`/api/user/find_people/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
      .then(response => response.json())
      .catch(err => console.log(err));
};