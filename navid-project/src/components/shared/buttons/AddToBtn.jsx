import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';

const AddToBtn = (props) => {
    const { text, onClick, icon } = props;
    const theme = useTheme();

    return (
        <Button
            sx={{
                backgroundColor: theme.palette.secondary.main,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingRight: 1,
                width: "fit-content"
            }}
            onClick={onClick}
            variant="contained"
            startIcon={
                <Icon
                    icon={icon}
                    color="white"
                    fontSize={25}
                    style={{ marginBottom: '3px' }}
                />
            }
        >
            {text}
        </Button>
    );
};

export default AddToBtn;
