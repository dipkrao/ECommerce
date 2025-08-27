import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { register, login, logout } from '../../store/slices/authSlice';

const AuthTest = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Registering with:', formData);
    const result = await dispatch(register(formData));
    console.log('Register result:', result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    const result = await dispatch(login({ email: formData.email, password: formData.password }));
    console.log('Login result:', result);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Authentication Test</h2>
      
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Current State:</h3>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>User: {user ? JSON.stringify(user, null, 2) : 'None'}</p>
        <p>Token: {token ? `${token.substring(0, 20)}...` : 'None'}</p>
        {error && <p className="text-red-600">Error: {error}</p>}
      </div>

      <form className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter username"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter password"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}

      <div className="mt-4 p-3 bg-yellow-100 rounded">
        <h3 className="font-semibold mb-2">Test Credentials:</h3>
        <p>Email: test@example.com</p>
        <p>Password: password123</p>
        <p>Username: testuser</p>
      </div>
    </div>
  );
};

export default AuthTest;
