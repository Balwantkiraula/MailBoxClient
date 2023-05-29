import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate('');

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('All fields are mandatory');
      return;
    }

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfoPwO0ULnk4ApUv1ImaDvLlCpo_747T8`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, you can handle it according to your requirements, such as navigating to a different page
        navigate('/home');
      } else {
        // Login failed, display the error message
        setErrorMessage(data.error.message);
      }
    } catch (error) {
      console.error(error);
    }

    // Clear input fields
    setEmail('');
    setPassword('');
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
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary" onClick={loginHandler}>
            Login
          </button>
          <div>
            <Link to="/">Don't have an account? SignUp</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
