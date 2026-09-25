import {useContext} from 'react';
import {jwtDecode} from 'jwt-decode';
import { Typography, Box} from '@mui/material';
import { AuthContext } from '../auth/AuthContext';

function DashboardPage(){
    const {token} = useContext(AuthContext);

    const decoded = token ? jwtDecode(token) : null;
    const username = decoded?.username || 'User';

    return(
        <Box sx={{padding: 4}}>
            <Typography variant="h4">Welcome, {username}</Typography>
        </Box>
    );
}

export default DashboardPage;