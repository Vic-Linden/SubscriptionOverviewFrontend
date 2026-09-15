import { useState, useContext } from 'react';
import { Card, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { register } from './authApi';
import { AuthContext } from './AuthContext';
import bgImage from '../../assets/bg-mountain.avif';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await register(email, password);
            loginUser(data.token);
        } catch {
            setError('Email already in use.');
        }
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <Card elovation={3}
                sx={{
                    maxWidth: 400,
                    padding: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.23)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)'
                }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    Register
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

                    <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
                        Submit
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'left', marginTop: 2 }}>
                        <Link to="/login">Back</Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}
export default RegisterPage;