import * as React from 'react';
import { useState, useEffect } from "react";
import ApiList from "../components/ApiList";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Search, InfoRounded } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Loading from '../components/Loading';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [apis, setApis] = useState(null)
  const [count, setCount] = useState(null)
  const [categories, setCategories] = useState(null)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [currentDescription, setCurrentDescription] = useState(null)

  let getEntries = (category, description) => {
    setApis(null)
    setCurrentCategory(category)
    setCurrentDescription(description)

    let url;
    if(category == null && description == null) {
      url = `https://api.publicapis.org/entries`
    }
    else if(category != null && description == null) {
      url = `https://api.publicapis.org/entries?category=${category}`
    }
    else if(category == null && description != null) {
      url = `https://api.publicapis.org/entries?description=${description}`
    }
    else {
      url = `https://api.publicapis.org/entries?category=${category}&description=${description}`
    }

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setApis(data.entries)
        setCount(data.count)
      })
  }

  useEffect(() => {
    fetch(`https://api.publicapis.org/entries`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setApis(data.entries)
        setCount(data.count)
      })

    fetch(`https://api.publicapis.org/categories`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setCategories(data)
      })
  }, [])

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ display: 'flex', marginBottom: '40px' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="h1">
            API Finder
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="More information"
            onClick={handleOpen}
          >
            <InfoRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Typography 
          sx={{
            marginLeft: '15px'
          }}
          variant="h6" 
          component="h2"
        >
          Categories
        </Typography>
        <List>
          {categories ? (
            categories.map((category, index) => (
              <ListItem 
                button 
                key={index}
                onClick={() => {getEntries(category, currentDescription);}}
              >
                <ListItemText>{category}</ListItemText>
              </ListItem>
            ))
          ) : (
            <Box sx={{marginLeft: '20px'}}>
              <Loading />
            </Box>
          )}
        </List>
      </Drawer>

      <Main 
        sx={{
          paddingLeft: {
            xs: '8px',
            sm: '8px',
            md: '24px',
            lg: '24px',
          },
          paddingRight: {
            xs: '8px',
            sm: '8px',
            md: '24px',
            lg: '24px',
          },
          paddingTop: '40px'
        }}
        open={open}
      >
        <DrawerHeader />

        <TextField 
          id="outlined-basic" 
          label="Search" 
          variant="outlined"
          placeholder="Search API..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={e => getEntries(currentCategory, e.target.value)} 
        />

        <Stack 
          direction="row" 
          spacing={1}
          sx={{
            marginBottom: '20px',
            marginTop: '10px'
          }}
        >
          {currentCategory && <Chip label={`${currentCategory}`} onDelete={() => getEntries(null, currentDescription)}></Chip>}
          {currentDescription && <Chip label={`${currentDescription}`} onDelete={() => getEntries(currentCategory, null)}></Chip>}
        </Stack>

        <ApiList apis={apis} count={count} />
      </Main>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About API Finder
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            User interface created by <a href="https://www.albinronnkvist.me/en-US" target="_blank" rel="noreferrer">Albin Rönnkvist</a>, 
            &nbsp;<a href="https://www.albinronnkvist.me/en-US" target="_blank" rel="noreferrer">(view code)</a>.
            
            <br/>
            Data retrieved from: <a href="https://github.com/davemachado/public-api" target="_blank" rel="noreferrer">https://github.com/davemachado/public-api</a>.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}