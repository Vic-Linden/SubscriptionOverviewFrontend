import {useState, useContext} from 'react';
import {Card, Typography, TextField, Button} from '@mui/material';

import {login} from './authApi';
import {AuthContext} from './AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {loginUser} = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const data = await login(email, password);
            loginUser(data.token);
        } catch 
        {
            setError('Invalid email or password');
        }
    };
    return (
    <Card sx={{maxWidth: 400, margin: '80px auto', padding: 4}}>
        <Typography variant="h5" gutterBottom>
            Login
        </Typography>

        <form onSubmit={handleSubmit}>
            <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button type="submit" variant="contained" fullWidth sx={{marginTop: 2}}>
                Login
            </Button>
        </form>
    </Card>
    );
}
export default LoginPage;