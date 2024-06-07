import { Icon } from '@iconify/react';
import { Button, Box, useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

const Notifications = () => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'lightgray',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                    },
                    minWidth: '55px',
                    maxWidth: "45px"
                }}
                onClick={handleClick}
            >
                <Icon
                    icon="octicon:bell-24"
                    color={theme.palette.primary.main}
                    fontSize={24}
                />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ marginTop: '1.5rem' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '10rem',
                    }}
                ></Box>
            </Popover>
        </>
    );
};

export default Notifications;
