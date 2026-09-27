import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Card, Avatar } from '@mui/material';
import { getAllUsers } from './adminApi';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>

      <TextField
        label="Search by email"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
    </Box>
  );
}

export default AdminPage;