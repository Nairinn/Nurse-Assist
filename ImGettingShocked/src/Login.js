import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  align-items: center; 
  background-color: #5cbdb5;
  color: white;
  padding: 1rem;
  position: absolute; 
  top: 20px; 
  left: 20px; 
  border-radius: 8px; 
`;

const HeaderTitle = styled.h2`
  font-size: 1.5rem; 
  font-weight: bold;
  margin: 0;
`;

const IconContainer = styled.div`
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
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 15px rgba(92, 189, 181, 0.4);

  &:hover {
    background-color: #4aa99c;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(92, 189, 181, 0.4);
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const users = {
    user1: 'password1',
    user2: 'password2',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[username] && users[username] === password) {
      navigate('/main');
    } else {
      setError('Invalid username or password');
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
        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
