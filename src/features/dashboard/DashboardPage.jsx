import {useContext} from 'react';
import { Typography, Box} from '@mui/material';
import { AuthContext } from '../auth/AuthContext';

function DashboardPage(){
    const {token} = useContext(AuthContext);

    //TODO: read username claim out of the token (currently hardcoded)
    const username = 'User';

    return(
        <Box sx={{padding: 4}}>
            <Typography variant="h4">Welcome, {username}</Typography>
        </Box>
    );
}

export default DashboardPage;