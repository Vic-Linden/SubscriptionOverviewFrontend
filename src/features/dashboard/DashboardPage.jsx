import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
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

            {/* TODO: replace with real data from GET /api/categories and GET /api/subscriptions */}
            <Grid container spacing={4} sx={{ marginTop: 4 }}>
                <Grid item xs={7}>
                    <Typography variant="body1">No categories yet.</Typography>
                </Grid>

                <Grid item xs={5}>
                    <Paper sx={{ padding: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Chart will appear here once you have subscriptions.
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