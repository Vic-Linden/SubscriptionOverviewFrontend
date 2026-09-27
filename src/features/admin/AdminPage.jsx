import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Grid, Card, Avatar } from '@mui/material';
import bgImage from '../../assets/bg-mountain.avif';
import { getAllUsers } from './adminApi';
import { AuthContext } from '../auth/AuthContext';


function AdminPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');


    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    // Fetches all users on dashboard.
    useEffect(() => {
        getAllUsers()
            .then((data) => setUsers(data))
            .catch(() => setUsers([]));
    }, []);

    // Filters users by email based on the search text.
    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
    }}>
        <Card sx={{
            maxWidth: 900,
            width: '100%',
            padding: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
        }}>

            <Typography
                variant="h4"
                onClick={handleLogout}
                sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                gutterBottom
            >
                Welcome Admin
            </Typography>

            <TextField
                label="Search by email"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Typography variant="h4" gutterBottom>
                All Users
            </Typography>

            {/* Shows all users as a card with an avatar */}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {filteredUsers.map((user) => (
                    <Grid size={6} key={user.id}>
                        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, gap: 2 }}>
                            <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
                            <Typography>{user.email}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Card>
    </Box>
);
}

export default AdminPage;