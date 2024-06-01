import { Box, Fade } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const LogoOnlyLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            navigate('/dashboard/banks');
        }
    }, [navigate]);

    return (
        <Fade in={true} timeout={1000}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    width: 1,
                }}
            >
                <Outlet />
            </Box>
        </Fade>
    );
};

export default LogoOnlyLayout;
