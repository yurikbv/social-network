export const signUp = (user) => {
  return fetch('/api/sign_up',{
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => {
    return response.json();
  }).catch(err => console.error(err));
};

export const signIn = (user) => {
  return fetch('/api/sign_in',{
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => {
    return response.json();
  }).catch(err => console.error(err));
};

export const authenticate  = (jwt, next) => {
  if(typeof window !== 'undefined'){
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const signOut = next => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt');
  next();
  return fetch('/api/sign_out', {
    method: 'GET'
  }).then(response => response.json()).catch(err => console.error(err));
};

export const isAuthenticated = () => {
  if(typeof window == "undefined") return false;
  if(localStorage.getItem('jwt')) return JSON.parse(localStorage.getItem('jwt'));
  else return false;
};