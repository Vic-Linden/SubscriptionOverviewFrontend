import { useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import { AuthContext } from '../auth/AuthContext';
import { getCategories } from '../categories/CategoryApi';

function DashboardPage() {
    const { token, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.username || 'User';

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <Box sx={{ padding: 4 }}>

            {/* TODO: move "Welcome, [displayUsername]" to right corner to match my Figma design*/}
            <Typography variant="h4" component="span">Welcome {''}
                {/*TODO: replace logout on click with a dropdown menu for "logout" option*/}
                <Typography variant="h4" component="span" onClick={handleLogout}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' }
                    }}>
                    {username}
                </Typography>
            </Typography>

            {/* TODO: replace with real data from GET /api/subscriptions */}
            <Grid container spacing={2} sx={{ marginTop: 2, backgroundColor: '#57565A', borderRadius: 2, padding: 2 }}>
                <Grid size={4}>
                    <Typography variant="body2" color="white">Monthly total</Typography>
                    <Typography variant="h5" color="white">0 kr</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography variant="body2" color="white">Active subscriptions</Typography>
                    <Typography variant="h5" color="white">0</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography variant="body2" color="white">Top category</Typography>
                    <Typography variant="h5" color="white">—</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ marginTop: 4 }}>

                <Grid size={7}> 
                    {categories.length === 0 ? (
                    <Typography variant="body1">No categories yet.</Typography>
                ) : (
                    categories.map((category) => (
                        <Typography key={category.id} variant="body1">
                            {category.name} 
                        </Typography>
                    ))
                )}
                </Grid>

                <Grid size={5}>
                    <Paper sx={{ padding: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Chart will be displayed here when user have subscriptions.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* TODO: open a create-subscription dialog on click */}
            <Button variant="text" sx={{ marginTop: 4, textTransform: 'none', fontSize: '1rem' }}>
                + New Subscription
            </Button>

        </Box>
    );
}

export default DashboardPage;