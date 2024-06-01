import { useEffect } from 'react';
import Swal from 'sweetalert2';

const ErrorAlert = () => {

    useEffect(() => {
        Swal.fire({
            icon: 'error',
            title: 'خطای ارتباط با اینترنت!',
            text: 'لطفا اتصال دستگاه خود به اینترنت را بررسی کنید و سپس دوباره تلاش کنید.',
            showConfirmButton: false,
            timer: 4000,
        });
    }, []);
};

export default ErrorAlert;
