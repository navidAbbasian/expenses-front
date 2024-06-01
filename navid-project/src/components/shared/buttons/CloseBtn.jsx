import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';

const CloseBtn = ({ onClick }) => {
    return (
        <IconButton aria-label="close" onClick={onClick}>
            <Icon icon="eva:close-fill" color="black" fontSize={25} />
        </IconButton>
    );
};

export default CloseBtn;
