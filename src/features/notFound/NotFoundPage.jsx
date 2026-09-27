import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: 4,
            textAlign: 'center'
        }}>

            <Typography variant="h2"
                sx={{
                    color: 'white',
                    fontWeight: 300,
                    textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)'
                }}>
                404
            </Typography>

            <Typography variant="h6"
                sx={{
                    color: 'white',
                    marginBottom: 3,
                    textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)'
                }}>
                Page not found
            </Typography>

            <Button component={Link} to="/login" variant="contained">
                Back to login
            </Button>
        </Box>
    );
}

export default NotFoundPage;