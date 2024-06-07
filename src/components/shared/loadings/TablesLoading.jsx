import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const TablesLoading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
            }}
        >
            <CircularProgress color={"secondary"} size={50} />
        </Box>
    );
};

export default TablesLoading;
