import { Box } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const MySweetAlert = ({ status, successMessage, errorMessage }) => {
    const Toast = Swal.mixin({
        customClass: {
            container: 'swal2-container',
        },
        toast: true,
        position: 'bottom-left',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        // status 0 = error , status 1 = success
        if (status == 1) {
            Toast.fire({
                icon: 'success',
                title: successMessage,
            });
        } else if (status == 0) {
            Toast.fire({
                icon: 'error',
                title: errorMessage,
            });
        }
    }, [status]);

    return null;
};

const FormAlert = (props) => {
    const { status, onClose, successMessage, errorMessage } = props;

    useEffect(() => {
        let timeout;
        if (status) {
            timeout = setTimeout(() => {
                onClose();
            }, 3000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [status, onClose]);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '25px',
                right: '2%',
                transform: 'translateX(-50%)',
                transition: 'transform 0.3s ease-out',
            }}
            style={{ transform: status ? 'translateY(0)' : 'translateY(100%)' }}
        >
            <MySweetAlert
                status={status}
                successMessage={successMessage}
                errorMessage={errorMessage}
            />
        </Box>
    );
};

export default FormAlert;
