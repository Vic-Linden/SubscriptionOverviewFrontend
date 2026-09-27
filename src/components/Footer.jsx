import { Typography } from '@mui/material';

function Footer() {
  return (
    <Typography
      variant="body2"
      sx={{
        position: { xs: 'static', sm: 'fixed' },
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        padding: 1,
        color: 'gray',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      Designed by Victoria Lindén NET25
    </Typography>
  );
}

export default Footer;