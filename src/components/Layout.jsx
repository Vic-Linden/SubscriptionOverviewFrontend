import { Box } from '@mui/material';
import bgImage from '../assets/bg-mountain.avif';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;