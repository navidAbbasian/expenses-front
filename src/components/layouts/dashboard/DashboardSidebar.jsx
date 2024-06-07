import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { menuItems } from './../../../data/data';

const drawerWidth = 240;

const openMenuMixin = (theme) => ({
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'openMenu',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openMenuMixin(theme),
        '& .MuiDrawer-paper': openMenuMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function DashboardSidebar(props) {
    const { openMenu, handleDrawerClose } = props;
    const theme = useTheme();
    const location = useLocation();
    const { pathname } = location;
    const { setStoredMenuItem } = useAppContext();

    const handleMenu = (val) => {
        setStoredMenuItem(val);
    };

    return (
        <Drawer
            variant="permanent"
            open={openMenu}
            anchor="right"
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: theme.palette.primary.main,
                },
                display: { xs: openMenu ? 'flex' : 'none', md: 'flex' },
            }}
        >
            <DrawerHeader
                sx={{ justifyContent: openMenu ? 'flex-start' : 'flex-end' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                        pr: 3,
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px',
                        }}
                    >
                        پنل هزینه‌ها
                    </Typography>
                    <Button variant="text" onClick={handleDrawerClose}>
                        <Icon
                            icon="material-symbols:arrow-forward-ios-rounded"
                            width="1.5em"
                            height="1.5em"
                            color="white"
                        />
                    </Button>
                </Box>
            </DrawerHeader>
            <Divider />
            <List>
                {menuItems?.map((item, index) => (
                    <Link
                        onClick={() => handleMenu(item.name)}
                        to={item.link}
                        key={index}
                    >
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block',
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                },
                                backgroundColor:
                                    pathname == `/dashboard/${item.link}` &&
                                    theme.palette.secondary.main,
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    py: 1.5,
                                    minHeight: 48,
                                    justifyContent: openMenu
                                        ? 'initial'
                                        : 'center',
                                    gap: '10px',
                                    color: 'white',
                                    pr: openMenu ? 0 : 2,
                                    pl: 0,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: openMenu ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon
                                        icon={item.iconName}
                                        width="1.5em"
                                        height="1.5em"
                                        color="white"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    sx={{
                                        opacity: openMenu ? 1 : 0,
                                        display: 'flex',
                                        width: 'fit-content',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
}
