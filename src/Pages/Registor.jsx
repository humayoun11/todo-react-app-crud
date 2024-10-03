import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registor = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      toast.error('apka password or confirm password match nahi ho raha hai to dono same dalo');
      return;
    }

    // Email validation
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!emailregex.test(email)) {
      toast.error('apki email m @ or .com hona zarori hai jese k ab@gmail.com');
      return;
    }

    // Check if username or email already exists
    const response = await fetch('https://66fc53c9c3a184a84d16c491.mockapi.io/userdetails');
    const data = await response.json();

    const existinguser = data.find(user => user.username === username || user.email === email);
    if (existinguser) {
      toast.error('ye username or email phele is app m hai ');
      return;
    }

    const newuser = { username, email, password };
    const result = await fetch('https://66fc53c9c3a184a84d16c491.mockapi.io/userdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newuser),
    });

    if (result.ok) {
      toast.success('Registration successful!');
      setusername('');
      setemail('');
      setpassword('');
      setconfirmpassword('');
    } else {
      toast.error('registor nahi howa dobara koshish kro ');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <ToastContainer />
      <div className="card" style={{ width: '300px' }}>
        <div className="card-body">
          <h1 className="card-title text-center">Register</h1>
          <form onSubmit={handleRegister}>
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
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
            <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registor;
