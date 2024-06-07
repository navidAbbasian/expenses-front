import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';

const FileUploaderBtn = ({ text, onClick }) => {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                backgroundColor: theme.palette.customGreen.main,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingRight: 1,
                marginTop: 3,
                width: 'fit-content',
            }}
            startIcon={
                <Icon
                    icon="line-md:uploading-loop"
                    color="white"
                    width="23"
                    height="23"
                    style={{ marginBottom: '3px' }}
                />
            }
        >
            {text}
        </Button>
    );
};

export default FileUploaderBtn;
