import React, {Component} from 'react';

class SignIn extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    redirectToReferer: false
  };

  signIn = (user) => {
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: ''
    })
  };

  handleForm = event => {
    event.preventDefault();
    const {email,password} = this.state;
    const user = {email,password};
    this.signIn(user).then(data => {
      if(data.error) this.setState({error: data.error});
      else {

      }
    });
  };

  render() {

    const {password,email,error} = this.state;

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Login</h2>

          {error &&
          <div className="alert alert-danger">
            {error}
          </div>}

          <form onSubmit={this.handleForm}>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input
                  type="email"
                  className="form-control"
                  onChange={this.handleChange('email')}
                  value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input
                  type="password"
                  className="form-control"
                  onChange={this.handleChange('password')}
                  value={password}
              />
            </div>
            <button
                className="btn btn-raised btn-primary"
                onClick={this.handleForm}
                type="submit"
            >Login</button>
          </form>
        </div>
    );
  }
}

export default SignIn;