import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const SignUpHandler = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are mandatory');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match');
      return;
    }

    const FatchApi = async ()=>{
        try{
        const response = await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/users.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password, confirmPassword}),
        });
        const data = await response.json();
        console.log(data);
              
    }
    catch(error) {
        console.error(error);
      }
}
FatchApi()
    

    const newSignUp = { email, password, confirmPassword };
    setSignUp([...signUp, newSignUp]);

    // Clear input fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');

    console.log(signUp);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh', width: '500px' }}>
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary" onClick={SignUpHandler}>
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
