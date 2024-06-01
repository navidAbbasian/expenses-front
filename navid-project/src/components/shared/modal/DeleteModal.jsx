import { Icon } from '@iconify/react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: '4px 7px 13px rgba(0, 0, 0, 0.3)',
    p: 4,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
};

export default function DeleteModal(props) {
    const theme = useTheme();

    const {
        itemName,
        openDeleteModal,
        handleCloseDeleteModal,
        itemId,
        setShowConfirmAlert,
    } = props.items;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (itemId) => {
            try {
                await props.reqFn(itemId);
                setShowConfirmAlert(1);
                queryClient.invalidateQueries('units');
            } catch (error) {
                console.log('error', error);
                setShowConfirmAlert(0);
            } finally {
                handleCloseDeleteModal();
            }
        },
    });

    const deleteItem = (itemId) => {
        mutation?.mutate(itemId);
    };

    const pending = mutation.isPending;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={openDeleteModal}>
                <Box sx={style}>
                    <Icon
                        icon="fluent:warning-32-regular"
                        fontSize={70}
                        color="orange"
                    />
                    <Typography
                        component={'span'}
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                    >
                        آیا از حذف{' '}
                        <Typography sx={{ color: 'red', display: 'inline' }}>
                            {itemName}{' '}
                        </Typography>
                        اطمینان دارید؟
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: { sm: 1, md: '80%' },
                        }}
                    >
                        <LoadingButton
                            loading={pending}
                            disabled={pending}
                            loadingPosition="end"
                            variant="contained"
                            onClick={() => deleteItem(itemId)}
                            sx={{
                                width: 1,
                                mt: '15px',
                                paddingLeft: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: theme.palette.customGreen.main,
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                },
                            }}
                            endIcon={
                                <Icon
                                    icon="line-md:check-all"
                                    color="white"
                                    fontSize={25}
                                />
                            }
                        >
                            بله
                        </LoadingButton>
                        <Button
                            disabled={pending}
                            onClick={handleCloseDeleteModal}
                            variant="contained"
                            sx={{
                                width: 1,
                                mt: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                paddingLeft: 1,
                                backgroundColor: theme.palette.customPink.main,
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                },
                            }}
                            endIcon={
                                <Icon
                                    icon="line-md:close-small"
                                    color="white"
                                    fontSize={25}
                                />
                            }
                        >
                            خیر
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
