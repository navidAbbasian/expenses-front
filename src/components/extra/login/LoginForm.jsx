import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from '../../../context/AuthContext';
import { LoginValidation } from '../../../schema/LoginValidation';
import FormErrorMessage from '../../shared/alerts/FormErrorMessage';
import ToastAlert from '../../shared/alerts/ToastAlert';
import { Link } from 'react-router-dom';

const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: '0.18px',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) },
}));

const LoginForm = () => {
    const { handleLogin, serverError, isLoading } = useAuthContext();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginValidation),
    });

    return (
        <>
            <Box sx={{ width: 1 }}>
                <Box sx={{ mb: 6 }}>
                    <TypographyStyled variant="h5">
                        به پنل مدیریتی هزینه‌ها خوش آمدید👋🏻
                    </TypographyStyled>
                    <Typography variant="body1">
                        لطفا اطلاعات خود را وارد نمایید.
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Stack spacing={3}>
                        <Box>
                            <TextField
                                fullWidth
                                autoComplete="email"
                                type="email"
                                label="آدرس ایمیل"
                                placeholder="admin@gmail.com"
                                name="email"
                                error={Boolean(errors.email)}
                                {...register('email')}
                            />
                            {errors.email && (
                                <FormErrorMessage
                                    error={errors.email.message}
                                />
                            )}
                        </Box>
                        <Box>
                            <TextField
                                autoComplete="current-password"
                                label="رمز عبور"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                placeholder="*******"
                                variant="outlined"
                                name="password"
                                error={Boolean(errors.password)}
                                {...register('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="button"
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Icon
                                                        icon="mdi:eye-off"
                                                        fontSize={20}
                                                        width="22"
                                                        height="22"
                                                    />
                                                ) : (
                                                    <Icon
                                                        icon="mdi:eye"
                                                        fontSize={20}
                                                        width="22"
                                                        height="22"
                                                    />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {errors.password && (
                                <FormErrorMessage
                                    error={errors.password.message}
                                />
                            )}
                        </Box>
                    </Stack>
                    <LoadingButton
                        disabled={isLoading}
                        loading={isLoading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 4,
                            backgroundColor: theme.palette.secondary.main,
                        }}
                    >
                        ورود
                    </LoadingButton>
                </form>
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontSize: '15px' }}>
                        چنانچه حساب ندارید روی این{' '}
                        <Link
                            to="/register"
                            style={{ color: 'blue', fontWeight: 600 }}
                        >
                            لینک
                        </Link>{' '}
                        کلیک کنید.
                    </Typography>
                </Box>
            </Box>
            {serverError && <ToastAlert message={serverError} icon="error" />}
        </>
    );
};

export default LoginForm;
