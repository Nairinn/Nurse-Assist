import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components (you can customize these further)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #f0f4f8, #d9e2ec);
`;

const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: border 0.3s;

  &:focus {
    border: 2px solid #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(0, 123, 255, 0.4);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const Greeting = styled.p`
  font-size: 1.5rem; /* Increased font size */
  font-weight: bold; /* Make the text bold */
  color: #333; /* Darker color for the text */
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Simple user credentials for authentication
  const users = {
    user1: 'password1',
    user2: 'password2',
    ChelseaSmells: 'PenisFart',
    // Add more users as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the username and password are correct
    if (users[username] && users[username] === password) {
      navigate('/main'); // Navigate to the main page after successful login
    } else {
      setError('Invalid username or password'); // Set error message
    }
  };

  return (
    <Container>
      <Greeting>Hey, what's up gangsta? This is Nurse Assist. Enter your details now.</Greeting>
      <Title>Login</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <Form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }} htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }} htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
