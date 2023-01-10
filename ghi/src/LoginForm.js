import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const[pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }
    const navigate = useNavigate();

    function handleClick() {
        navigate('/signup');
    }

    return (
        <Form>
            <Form.Group onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input value={username} onChange={e => setUsername(e.target.value)}type="username" placeholder="username" id="username" name="username" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={e => setPass(e.target.value)}type="password" placeholder="*******" id="password" name="password" />
                <Button variant="primary" type="submit">Login
                </Button>
            </Form.Group>
            <Button variant="primary" onClick={handleClick}>Don't have an account? Sign up here</Button>
        </Form>
    )

}

export default LoginForm
