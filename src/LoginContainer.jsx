import React from 'react';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {

    
return (
    <form onSubmit = {(e) => handleLogin(e)}>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
    </form>
);
};

export default LoginForm;