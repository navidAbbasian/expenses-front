import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginReq, registerReq } from '../api/requests';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [adminProfile, setAdminProfile] = useState({});
    const [successLogin, setSuccessLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [serverError, setServerError] = useState(null);

    console.log('adminProfile', adminProfile);

    useEffect(() => {
        const storedProfile = localStorage.getItem('adminProfile');
        if (storedProfile) {
            setAdminProfile(JSON.parse(storedProfile));
        }
    }, []);

    // handle logout
    const handleLogOut = async () => {
        setIsLoading(true);
        try {
            setIsLoading(false);
            Cookies.remove('access_token');
            navigate('/login', { replace: true });
            localStorage.removeItem('adminProfile');
            Swal.fire({
                icon: 'success',
                title: 'شما با موفقیت از پنل خارج شدید.',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log('error', error);
            setServerError(error?.response?.data?.message);
        }
    };

    // handle login
    const handleLogin = async (data) => {
        setIsLoading(true);
        try {
            const res = await loginReq(data);
            setIsLoading(false);

            Cookies.set('access_token', res.data.token, {
                secure: true,
            });
            setSuccessLogin(true);
            setAdminProfile(res.data.user);
            localStorage.setItem('adminProfile', JSON.stringify(res.data.user));
            Swal.fire({
                icon: 'success',
                title: 'شما با موفقیت وارد پنل نوید شدید.',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/dashboard/banks', { replace: true });
        } catch (error) {
            setIsLoading(false);
            setServerError(error?.response?.data?.message);
            setTimeout(() => {
                setServerError(null);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    // handle register
    const handleRegister = async (data) => {
        setIsLoading(true);
        try {
            const res = await registerReq(data);
            setIsLoading(false);

            Cookies.set('access_token', res.data.token, {
                secure: true,
            });
            setSuccessLogin(true);
            setAdminProfile(res.data.user);
            localStorage.setItem('adminProfile', JSON.stringify(res.data.user));
            Swal.fire({
                icon: 'success',
                title: 'شما با موفقیت وارد پنل نوید شدید.',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/dashboard/banks', { replace: true });
        } catch (error) {
            setIsLoading(false);
            setServerError(error?.response?.data?.message);
            setTimeout(() => {
                setServerError(null);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                adminProfile,
                successLogin,
                setSuccessLogin,
                isLoading,
                handleLogOut,
                handleLogin,
                handleRegister,
                serverError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
