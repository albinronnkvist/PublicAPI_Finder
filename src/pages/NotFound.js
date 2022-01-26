import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box sx={{ width: '100%', textAlign: 'center', marginTop: '10vh' }}>
      <img src="/images/404.svg" alt="404" />
      <Typography variant="h2" component="h1">
        404
      </Typography>
      <Typography variant="h4" component="h2" sx={{marginBottom: '10px'}}>
        Page not found
      </Typography>
      <Link to="/">
        <Button>
          <ChevronLeft /> Back to start
        </Button>
      </Link>
    </Box>
  );
}

export default NotFound;