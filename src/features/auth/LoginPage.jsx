import { useState, useContext } from 'react';
import { Card, Typography, TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { login } from './authApi';
import { AuthContext } from './AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await login(email, password);
            loginUser(data.token);

            const decoded = jwtDecode(data.token);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            if (role === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch {
            setError('Invalid email or password');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            padding: 2,
        }}>
            <Typography variant="h3" sx={{
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                textAlign: 'center',
                fontWeight: 300,
                color: 'white',
                textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)',
                fontSize: { xs: '1.5rem', sm: '3rem' },
            }}>
                Your Subscription Overview
            </Typography>

            <Card elevation={3}
                sx={{
                    maxWidth: 400,
                    padding: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.23)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)'
                }}>
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
        </Box>
    );
}
export default LoginPage;