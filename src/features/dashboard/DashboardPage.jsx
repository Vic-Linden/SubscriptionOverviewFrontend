import { useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import {
    Typography,
    Box,
    Grid,
    Menu,
    MenuItem,
    Card
} from '@mui/material';
import bgImage from '../../assets/bg-mountain.avif';
import { AuthContext } from '../auth/AuthContext';
import SubscriptionList from '../subscriptions/SubscriptionList';
import { getSubscriptions } from '../subscriptions/subscriptionApi';
import { getCategories } from '../categories/CategoryApi';

function DashboardPage() {
    const { token, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [subscriptions, setSubscriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.username || 'User';

    // User logs out and sends them back to the login page. 
    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const handleUserMenuClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorElUser(null);
    };

    // Fetches all subscriptions once, used to calculate the summary stats
    useEffect(() => {
        getSubscriptions()
            .then((data) => setSubscriptions(data))
            .catch(() => setSubscriptions([]));
    }, []);

    // Fetches all subscriptions and categories once, used for the summary and the donut chart.
    useEffect(() => {
        getSubscriptions()
            .then((data) => setSubscriptions(data))
            .catch(() => setSubscriptions([]));

        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    // Adds up the price of all subscriptions.
    const monthlyTotal = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

    // Counts how many subscriptions there are.
    const activeCount = subscriptions.length;

    // Adds up the total price per category.
    const categoryTotals = subscriptions.reduce((totals, sub) => {
        totals[sub.categoryName] = (totals[sub.categoryName] || 0) + sub.price;
        return totals;
    }, {});

    // Finds the category with the highest total price.
    const topCategory = Object.keys(categoryTotals).length > 0
        ? Object.keys(categoryTotals).reduce((a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b))
        : '—';

    // Builds the data Recharts. one entry per category, with its total price.
    const chartData = categories
        .map((category) => ({
            name: category.name,
            value: subscriptions
                .filter((sub) => sub.categoryName === category.name)
                .reduce((sum, sub) => sum + sub.price, 0),
        }))
        .filter((entry) => entry.value > 0);

    // Add sets of colors which will be assigned to categories.
    const chartColors = ['#378ADD', '#3B6D11', '#D97706', '#DB2777', '#7C3AED', '#DC2626'];

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
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
            }}>

                {/* Welcome text with username, positioned top-right; clicking the username opens a logout menu */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <Typography variant="body1">
                        Welcome{' '}
                        <Typography
                            variant="body1"
                            component="span"
                            onClick={handleUserMenuClick}
                            sx={{ cursor: 'pointer', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
                        >
                            {username}
                        </Typography>
                    </Typography>
                </Box>

                {/* Logout menu, opens when the username is clicked */}
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleUserMenuClose}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

                {/* The summary bar for monthly total, active subscription count, and top category */}
                <Grid container spacing={2} sx={{ marginTop: 2, backgroundColor: '#57565A', borderRadius: 2, padding: 2 }}>
                    <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>Monthly total</Typography>
                        <Typography variant="h5" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>{monthlyTotal} kr</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>Active subscriptions</Typography>
                        <Typography variant="h5" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>{activeCount}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>Top category</Typography>
                        <Typography variant="h5" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>{topCategory}</Typography>
                    </Grid>
                </Grid>

                {/* Category list with grouped subscriptions, and the "New Subscription"/"New Category" buttons */}
                <Grid container spacing={4} sx={{ marginTop: 4 }}>
                    <SubscriptionList />

                    {/* Donut chart showing total price per category, with a color-coded legend */}
                    <Grid size={{ xs: 12, sm: 5 }} sx={{ order: { xs: -1, sm: 0 } }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'center', gap: 2 }}>
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    outerRadius={80}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                                    ))}
                                </Pie>
                            </PieChart>

                            <div>
                                {chartData.map((entry, index) => (
                                    <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                backgroundColor: chartColors[index % chartColors.length],
                                                borderRadius: 2,
                                            }}
                                        />
                                        <Typography variant="body2">{entry.name}</Typography>
                                    </div>
                                ))}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default DashboardPage;