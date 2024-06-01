import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModalHeader from './ModalHeader';

export default function FormModal(props) {
    const { children, title, openFormModal, setOpenFormModal, useFullScreen } = props;

    const theme = useTheme();

    const fullScreen = useFullScreen !== undefined ? useFullScreen : useMediaQuery(theme.breakpoints.down('md'));

    const handleCloseFormModal = () => {
        setOpenFormModal(false);
    };

    return (
        <Dialog
            fullWidth
            fullScreen={fullScreen} 
            onClose={handleCloseFormModal}
            open={openFormModal}
            aria-labelledby="responsive-dialog-title"
        >
            <ModalHeader title={title} onClose={handleCloseFormModal} />
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
}
