import React, {useState} from 'react';


export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const[pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="username">username</label>
                <input value={username} type="username" placeholder="username" id="username" name="username" />
                <label for="password">password</label>
                <input value={pass} type="password" placeholder="*******" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
            <button>Don't have an account? Sign up here</button>
        </>
    )
}

export default LoginForm
