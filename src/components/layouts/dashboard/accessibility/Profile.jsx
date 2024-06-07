import { Icon } from '@iconify/react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';

const Profile = () => {
    const { adminProfile, handleLogOut, isLoading } = useAuthContext();
    const { name } = adminProfile || {};
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
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                }}
            >
                {!open ? (
                    <Icon
                        icon="octicon:chevron-down-24"
                        color="white"
                        fontSize={25}
                        style={{ paddingTop: '6px' }}
                    />
                ) : (
                    <Icon
                        icon="octicon:chevron-up-24"
                        color="white"
                        fontSize={25}
                        style={{ paddingTop: '6px' }}
                    />
                )}
                <Box
                    component="span"
                    sx={{ pt: '4px', display: { xs: 'none', md: 'block' } }}
                >
                    {name}
                </Box>
                <Icon icon="lucide:user-round" color="white" fontSize={25} />
            </Box>
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
                >
                    <LoadingButton
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleLogOut}
                        variant="text"
                        sx={{ gap: '10px', padding: '10px', width: '100%' }}
                    >
                        <Box component="span" sx={{ fontSize: '15px' }}>
                            خروج
                        </Box>
                        <Icon
                            icon="tabler:logout"
                            color="black"
                            fontSize={25}
                        />
                    </LoadingButton>
                </Box>
            </Popover>
        </>
    );
};

export default Profile;
