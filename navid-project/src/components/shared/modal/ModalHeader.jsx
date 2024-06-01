import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import CloseBtn from '../buttons/CloseBtn';

const ModalHeader = ({ title, onClose }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingX: '10px',
            }}
        >
            <DialogTitle
                sx={{ fontWeight: '600', paddingRight: 1, fontSize: "18px" }}
                id="customized-dialog-title"
            >
                {title}
            </DialogTitle>
            <CloseBtn onClick={onClose} />
        </Box>
    );
};

export default ModalHeader;
