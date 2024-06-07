import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import SideNavContainer from './SideNavContainer';

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflowX: 'hidden',
    background: "#f1f1f1",
    height: "100vh",
});

const DashboardLayout = () => {
    return (
        <RootStyle>
            <SideNavContainer />
            <Container sx={{paddingTop: {xs: "5rem", xl: "7rem"}}}>
                <Outlet />
            </Container>
        </RootStyle>
    );
};

export default DashboardLayout;
