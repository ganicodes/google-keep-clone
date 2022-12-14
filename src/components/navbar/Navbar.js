import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TopBar from '../topBar/TopBar';
import { sideBarItems } from '../../utils/sidebarItems';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "inset 0 0 0 0 #dadce0",
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        backgroundColor: "#feefc3",
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Navbar = () => {
    const navigate = useNavigate();
    // const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    let location = useLocation();
    return (
        <Box sx={{ display: 'flex' }}>
            <StyledAppBar position="fixed" open={open}>
                <TopBar handleDrawer={handleDrawer} />
            </StyledAppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader />
                <List sx={{ mt: 1 }}>
                    {sideBarItems.map((text) => (
                        <ListItem key={text.id} onClick={() => navigate(text.route)} disablePadding sx={{
                            '& :hover': {
                                backgroundColor: location.pathname !== text.route ? "#f1f3f4" : "#feefc3",
                                borderRadius: open ? "0 25px 25px 0" : "25px"
                            },
                            backgroundColor: location.pathname === text.route ? "#feefc3" : "",
                            display: 'block',
                            borderRadius: open ? "0 25px 25px 0" : "50px",
                            padding: open ? "0" : "5px",
                            margin: open ? "0" : "5px 0",
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box >
    );
}

export default Navbar
