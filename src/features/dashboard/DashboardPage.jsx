import { useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Grid,
    Paper
} from '@mui/material';
import { AuthContext } from '../auth/AuthContext';
import SubscriptionList from '../subscriptions/SubscriptionList';

function DashboardPage() {
    const { token, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [subscriptions, setSubscriptions] = useState([]);

    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.username || 'User';

    // User logs out and sends them back to the login page. 
    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    // Fetches all subscriptions once, used to calculate the summary stats
    useEffect(() => {
        getSubscriptions()
            .then((data) => setSubscriptions(data))
            .catch(() => setSubscriptions([]));
    }, []);

    // Adds up the price of all subscriptions.
    const monthlyTotal = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

    // Counts how many subscriptions there are.
    const activeCount = subscriptions.length;

    // Counts how many subscriptions belong to each category
    const categoryCounts = subscriptions.reduce((counts, sub) => {
        counts[sub.categoryName] = (counts[sub.categoryName] || 0) + 1;
        return counts;
    }, {});

    // Finds the category with the most subscriptions.
    const topCategory = Object.keys(categoryCounts).length > 0
        ? Object.keys(categoryCounts).reduce((a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b))
        : '—';

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


                {/* TODO: replace with real chart once subscription data exists*/}
                <Grid size={5}>
                    <Paper sx={{ padding: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Chart will be displayed here when user have subscriptions.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ marginTop: 4 }}>
                <SubscriptionList />
            </Grid>

        </Box>
    );
}

export default DashboardPage;