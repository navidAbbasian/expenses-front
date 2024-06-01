import { Box, styled } from '@mui/material';
import register from '../assets/images/register.svg';
import RegisterForm from '../components/extra/register/RegisterForm';

const RegisterIllustration = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '50%',
    },
}));

const Register = () => {
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
            <RegisterForm />
            <RegisterIllustration alt="login-illustration" src={register} />
        </Box>
    );
};

export default Register;
