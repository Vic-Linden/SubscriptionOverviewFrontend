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
    Menu
} from '@mui/material';
import { getSubscriptions, createSubscription, updateSubscription, deleteSubscription } from './subscriptionApi';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../categories/CategoryApi';

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [billingInterval, setBillingInterval] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [anchorElSub, setAnchorElSub] = useState(null);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [openEditSubDialog, setOpenEditSubDialog] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editBillingInterval, setEditBillingInterval] = useState(0);
    const [editCategoryId, setEditCategoryId] = useState('');

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

    // Opens a smal dropdown menu, saves which category its for and prefills the edit field. 
    const handleRowClick = (event, category) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
        setEditCategoryName(category.name);
    };

    // Opens a small dropdown menu for a subscription row, prefills the edit fields
    const handleSubRowClick = (event, subscription) => {
        setAnchorElSub(event.currentTarget);
        setSelectedSubscription(subscription);
        setEditName(subscription.name);
        setEditPrice(subscription.price);
        setEditBillingInterval(subscription.billingInterval);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setOpenEditDialog(true);
        setAnchorEl(null);
    };

    const handleSubMenuClose = () => {
        setAnchorElSub(null);
    };

    const handleEditSubClick = () => {
        setOpenEditSubDialog(true);
        setAnchorElSub(null);
    };

    // Saves the edited category name, refresh the list and close the dialog.
    const handleUpdateCategory = async () => {
        await updateCategory(selectedCategory.id, editCategoryName);
        const updated = await getCategories();
        setCategories(updated);
        setOpenEditDialog(false);
    };

    // Deletes the selected category, refresh the list and closes the menu. 
    const handleDeleteCategory = async () => {
        await deleteCategory(selectedCategory.id);
        const updated = await getCategories();
        setCategories(updated);
        handleMenuClose();
    };

    // Creates a new category, refreshes the list, reset and closes the dialog. 
    const handleCreateCategory = async () => {
        await createCategory(newCategoryName);
        const updated = await getCategories();
        setCategories(updated);
        setNewCategoryName('');
        setOpenCategoryDialog(false);
    };

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

    // Saves the edited subscription, refreshes the list, closes the dialog
    const handleUpdateSubscription = async () => {
        await updateSubscription(selectedSubscription.id, editName, editPrice, editBillingInterval, editCategoryId);
        const updated = await getSubscriptions();
        setSubscriptions(updated);
        setOpenEditSubDialog(false);
    };

    // Deletes the selected subscription, refreshes the list, closes the menu
    const handleDeleteSubscription = async () => {
        await deleteSubscription(selectedSubscription.id);
        const updated = await getSubscriptions();
        setSubscriptions(updated);
        handleSubMenuClose();
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
                            <Typography variant="body1"
                                onClick={(e) => handleRowClick(e, category)}
                                sx={{
                                    fontWeight: 500,
                                    marginTop: 3,
                                    marginBottom: 1,
                                    cursor: 'pointer',
                                    '&:hover': { color: 'primary.main' }
                                }}>
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
            <div style={{ display: 'flex', gap: '24px' }}>
                <Button
                    variant="text"
                    sx={{ marginTop: 4, textTransform: 'none', fontSize: '1rem' }}
                    onClick={() => setOpenDialog(true)}
                >
                    + New Subscription
                </Button>

                <Button
                    variant="text"
                    sx={{ marginTop: 4, textTransform: 'none', fontSize: '1rem' }}
                    onClick={() => setOpenCategoryDialog(true)}
                >
                    + New Category
                </Button>
            </div>

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

            {/* Edit/Delete menu, opens when a category row is clicked*/}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteCategory}>Delete</MenuItem>
            </Menu>

            {/* Edit category dialog, pre-filled with the selected category's name*/}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle sx={{ textAlign: 'center' }}>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category name"
                        fullWidth
                        margin="normal"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdateCategory} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create category dialog */}
            <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
                <DialogTitle sx={{ textAlign: 'center' }}>New Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="category name"
                        fullWidth
                        margin="normal"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                    <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateCategory} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
export default SubscriptionList;