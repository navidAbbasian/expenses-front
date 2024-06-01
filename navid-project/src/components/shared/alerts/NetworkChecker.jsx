import { useEffect } from 'react';
import { useNetworkState } from '@uidotdev/usehooks';
import Swal from 'sweetalert2';

const NetworkChecker = () => {
    const network = useNetworkState();

    useEffect(() => {
        if (!network.online) {
            Swal.fire({
                icon: 'warning',
                title: 'خطای ارتباط با اینترنت!',
                text: 'لطفا اتصال دستگاه خود به اینترنت را بررسی کنید و سپس دوباره تلاش کنید.',
                showConfirmButton: false,
                timer: 5000,
            });
        }
    }, [network.online]);
};

export default NetworkChecker;
