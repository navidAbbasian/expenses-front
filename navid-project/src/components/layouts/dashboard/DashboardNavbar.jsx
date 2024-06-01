import { Icon } from '@iconify/react';
import { IconButton, Toolbar, Typography, Box } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { useAppContext } from '../../../context/AppContext';
import Profile from './accessibility/Profile';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DashboardNavbar = (props) => {
    const { openMenu, handleDrawerOpen } = props;
    const { storedMenuItem } = useAppContext();

    return (
        <AppBar position="fixed" open={openMenu}>
            <Toolbar
                style={{
                    paddingRight: '13px',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            ...(openMenu && { display: 'none' }),
                        }}
                    >
                        <Icon
                            icon="uis:align-right"
                            color="white"
                            fontSize={25}
                        />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', pr: 5 }}>
                        <Typography
                            sx={{ fontWeight: 'bold', fontSize: '16px' }}
                        >
                            {storedMenuItem}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: openMenu ? 'none' : 'flex', md: "flex" },
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Profile />
                    {/* <Notifications /> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardNavbar;
