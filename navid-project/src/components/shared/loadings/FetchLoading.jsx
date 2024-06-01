import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const FetchLoading = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme?.zIndex?.drawer + 1 }}
            open={open}
        >
            <CircularProgress
                color={'primary'}
                variant="indeterminate"
                size={60}
            />
        </Backdrop>
    );
};

export default FetchLoading;
