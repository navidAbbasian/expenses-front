import { Box } from '@mui/material';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { useAppContext } from '../../../context/AppContext';

const SideNavContainer = () => {
    const { openMenu, setOpenMenu } = useAppContext();
    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <DashboardSidebar
                openMenu={openMenu}
                handleDrawerClose={handleDrawerClose}
            />
            <DashboardNavbar
                openMenu={openMenu}
                handleDrawerOpen={handleDrawerOpen}
            />
        </Box>
    );
};

export default SideNavContainer;
