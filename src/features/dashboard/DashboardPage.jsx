import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { AuthContext } from '../auth/AuthContext';

function DashboardPage() {
    const { token } = useContext(AuthContext);

    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.username || 'User';

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">Welcome, {username}</Typography>

            {/* TODO: replace with real data from GET /api/subscriptions */}
            <Grid container spacing={2} sx={{ marginTop: 2, backgroundColor: '#57565A', borderRadius: 2, padding: 2 }}>
                <Grid item xs={4}>
                    <Typography variant="body2" color="white">Monthly total</Typography>
                    <Typography variant="h5" color="white">0 kr</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" color="white">Active subscriptions</Typography>
                    <Typography variant="h5" color="white">0</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" color="white">Top category</Typography>
                    <Typography variant="h5" color="white">—</Typography>
                </Grid>
            </Grid>

        </Box>
    );
}

export default DashboardPage;