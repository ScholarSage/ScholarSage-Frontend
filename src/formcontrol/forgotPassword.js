import React, { Component } from 'react';
import axios from 'axios';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    axios.post('http://localhost:5000/forgot-password', {
      email: email,
    })
      .then(response => {
        console.log(response.data, 'userRegister');
        alert(response.data.status);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <h3 style={styles.header}>Forgot Password</h3>

          <div style={styles.formGroup}>
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={e => this.setState({ email: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <button
              type="submit"
              className="btn btn-primary"
              style={styles.submitButton}
            >
              Submit
            </button>
          </div>

          <p className="forgot-password text-right" style={styles.signUpLink}>
            <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#42026F',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: '#42026F',
    borderRadius: '10px',
    color: '#fff',
    width: '100%',
    padding: '10px',
    cursor: 'pointer',
  },
  signUpLink: {
    margin: '0',
    textAlign: 'center',
  },
};
