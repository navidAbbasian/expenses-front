import { Box, styled } from '@mui/material';
import login from '../assets/images/login.svg';
import LoginForm from '../components/extra/login/LoginForm';

const LoginIllustration = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '50%',
    },
}));

const Login = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                gap: '25px',
                width: '100%',
                maxWidth: {
                    xs: '90%',
                    sm: '60%',
                    lg: '90%',
                    xl: '75%',
                    xxl: '60%',
                },
            }}
        >
            <LoginForm />
            <LoginIllustration alt="login-illustration" src={login} />
        </Box>
    );
};

export default Login;
