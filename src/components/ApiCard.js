import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ChevronRight } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Chip } from '@mui/material';

function ApiCard({api}) {
  return (
    <Card sx={{ 
      width: {
        xs: '100%',
        sm: '49%',
        md: '49%',
        lg: '32%',
      },
      marginBottom: {
        xs: '20px',
        sm: '10',
        md: '10',
        lg: '20px',
      },
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h4" component="h4">
          {api.API}
        </Typography>

        {/* Description */}
        <Typography variant="body2">
          {api.Description}
        </Typography>

        <Stack 
          direction="row" 
          spacing={1}
          sx={{
            marginBottom: '0px',
            marginTop: '10px'
          }}
        >
          {api.HTTPS === true && <Chip label="HTTPS"></Chip>}
          {api.Cors === "yes" && <Chip label="CORS"></Chip>}
          {api.Auth !== "" && <Chip label="Auth"></Chip>}
        </Stack>

      </CardContent>
      <CardActions>
        <Button 
          sx={{
            marginLeft: '5px',
            marginBottom: '5px'
          }}
          size="small" 
          color="primary" 
          variant="contained"
          target="_blank"
          href={api.Link}
        >
          Explore
          <ChevronRight />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ApiCard;