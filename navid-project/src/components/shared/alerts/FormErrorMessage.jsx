import {Typography} from '@mui/material';
const FormErrorMessage = ({ error }) => {
    return (
        <Typography
            sx={{
                color: 'red',
                mt: '5px',
                ml: '5px',
                fontSize: '13px',
                fontWeight: 'bold',
            }}
        >
            {error}
        </Typography>
    );
};

export default FormErrorMessage;
