import { useState, useContext } from 'react';
import { Card, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';

import { login } from './authApi';
import { AuthContext } from './AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await login(email, password);
            loginUser(data.token);
        } catch {
            setError('Invalid email or password');
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card sx={{ maxWidth: 400, padding: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
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

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Typography variant="body2" sx={{ cursor: 'pointer' }}>
                            Forgot password?
                        </Typography>
                    </div>

                    {error && <Typography color="error">{error}</Typography>}

                    <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
                        Login
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}
export default LoginPage;