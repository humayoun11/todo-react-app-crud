import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../UserContext';

const Login = () => {
  const { setIsLoggedIn } = useUserContext();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const userapi = 'https://66fc53c9c3a184a84d16c491.mockapi.io/userdetails';

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(userapi);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const user = data.find(user => user.username === username && user.password === password);

      if (user) {
        setIsLoggedIn(true);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('userId', user.id);
        toast.success('Login successful!');
        console.log("Navigating to /User/Generic"); // Debug message before navigating
        navigate('/User/Generic');
      } else {
        toast.error('username or password m koi masla hai dobara dalo');
      }
    } catch (error) {
      console.error('loginmkoimaslahai', error); // Log the error for debugging
      toast.error('loi masla hai login nahi horaha apka');
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <ToastContainer />
      <div className="card" style={{ width: '300px' }}>
        <div className="card-body">
          <h1 className="card-title text-center">Login</h1>
          <form onSubmit={handlelogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
