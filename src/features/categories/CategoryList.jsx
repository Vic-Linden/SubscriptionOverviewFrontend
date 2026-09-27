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
    Menu,
    MenuItem
} from '@mui/material';
import { getCategories, createCategory, updateCategory, deleteCategory } from './CategoryApi';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState('');

    // Fetches all categories once when the page loads.
    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    // Creates a new category, refreshes the list, reset and closes the dialog. 
    const handleCreateCategory = async () => {
        await createCategory(newCategoryName);
        const updated = await getCategories();
        setCategories(updated);
        setNewCategoryName('');
        setOpenDialog(false);
    };

    // Opens a smal dropdown menu, saves which category its for and prefills the edit field. 
    const handleRowClick = (event, category) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
        setEditCategoryName(category.name);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setOpenEditDialog(true);
        setAnchorEl(null);
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

    return (
        <Grid size={7}>
            {categories.length === 0 ? (
                <Typography variant="body1">No categories yet.</Typography>
            ) : (
                categories.map((category) => (
                    <Typography key={category.id}
                        variant="body1"
                        onClick={(e) => handleRowClick(e, category)}
                        sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                    >
                        {category.name}
                    </Typography>
                ))
            )}

            {/* Opens the create-category dialog */}
            <Button variant="text" sx={{ marginTop: 4, textTransform: 'none', fontSize: '1rem' }}
                onClick={() => setOpenDialog(true)}>
                + New Subscription
            </Button>

            {/* Create category dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateCategory} variant="contained">Create</Button>
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
        </Grid>
    );
}

export default CategoryList;