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
  background-image: url('/background.jpg');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row; /* Arrange items horizontally */
  align-items: center; /* Center items vertically */
  background-color: #5cbdb5;
  color: white;
  padding: 1rem;
  position: absolute; 
  top: 20px; 
  left: 20px; 
  border-radius: 8px; 
`;

const HeaderTitle = styled.h2`
font-size: 1.5rem; /* Adjusted font size */
font-weight: bold;
margin: 0; /* Remove default margin */
`;

const IconContainer = styled.div`
display: flex;
justify-content: center; /* Center the image */
margin-left: 10px;
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
  background-color: #5cbdb5;
  color: white;
  margin-top: 10;
  padding: .5rem 1rem;
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
  text-align: center;
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
    // Add more users as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the username and password are correct
    if (users[username] && users[username] === password) {
      navigate('/'); // Navigate to the main page after successful login
    } else {
      setError('Invalid username or password'); // Set error message
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>NurseAssist</HeaderTitle>
        <IconContainer>
          <img src='/doctor.png' alt='health symbol' className='w-7 h-7 object-cover' />
        </IconContainer>
      </HeaderContainer>
      <Greeting>Enter your details to monitor patients.</Greeting>
      
      
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
