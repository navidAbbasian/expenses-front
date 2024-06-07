import LoadingButton from '@mui/lab/LoadingButton';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';

const SubmitBtn = ({ onLoading }) => {
    const theme = useTheme();

    return (
        <LoadingButton
            disabled={onLoading}
            loading={onLoading}
            type="submit"
            sx={{
                backgroundColor: theme.palette.secondary.main,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingRight: 1,
                marginTop: 3,
                width: 'fit-content',
            }}
            variant="contained"
            startIcon={
                <Icon
                    icon="iconamoon:check"
                    color="white"
                    fontSize={25}
                    style={{ marginBottom: '3px' }}
                />
            }
        >
            ذخیره
        </LoadingButton>
    );
};

export default SubmitBtn;
