import { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { getSubscriptions, createSubscription } from './subscriptionApi';
import { getCategories } from '../categories/CategoryApi';

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [billingInterval, setBillingInterval] = useState(0);
    const [categoryId, setCategoryId] = useState('');

    // Fetch all subscriptions and categories once when the page loads. 
    useEffect(() => {
        getSubscriptions()
            .then((data) => {
                setSubscriptions(data);
            })
            .catch(() => setSubscriptions([]));

        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    // Creates a new subscription, refreshes the list, reset and closes the dialog.
    const handleCreateSubscription = async () => {
        await createSubscription(name, price, billingInterval, categoryId);
        const updated = await getSubscriptions();
        setSubscriptions(updated);
        setName('');
        setPrice('');
        setBillingInterval(0);
        setCategoryId('');
        setOpenDialog(false);
    };

    return (
        <Grid size={7}>
            {categories.length === 0 ? (
                <Typography variant="body1">No categories yet.</Typography>
            ) : (
                categories.map((category) => {
                    const categorySubscriptions = subscriptions.filter(
                        (subscription) => subscription.categoryName === category.name
                    );

                    return (
                        <div key={category.id}>
                            <Typography variant="body1" sx={{ fontWeight: 500, marginTop: 3, marginBottom: 1 }}>
                                {category.name}
                            </Typography>
                            {categorySubscriptions.map((subscription) => (
                                <Typography key={subscription.id} variant="body2" sx={{ paddingLeft: 2 }}>
                                    {subscription.name} — {subscription.price} kr
                                </Typography>
                            ))}
                        </div>
                    );
                })
            )}

            {/* Opens the create-subscription dialog */}
            <Button
                variant="text"
                sx={{ marginTop: 4, textTransform: 'none', fontSize: '1rem' }}
                onClick={() => setOpenDialog(true)}
            >
                + New Subscription
            </Button>

            {/* Create subscription dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle sx={{ textAlign: 'center' }}>New Subscription</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Billing Interval</InputLabel>
                        <Select
                            value={billingInterval}
                            label="Billing Interval"
                            onChange={(e) => setBillingInterval(e.target.value)}
                        >
                            <MenuItem value={0}>Monthly</MenuItem>
                            <MenuItem value={1}>Yearly</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryId}
                            label="Category"
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateSubscription} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
export default SubscriptionList;