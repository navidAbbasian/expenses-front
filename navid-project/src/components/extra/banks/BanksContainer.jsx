import { Box } from '@mui/material';
import { useState } from 'react';
import AddToBtn from './../../shared/buttons/AddToBtn';
import AddBank from './add/AddBank';
import BankList from './list/BankList';

const BanksContainer = () => {
    const [openFormModal, setOpenFormModal] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: '1rem', md: '2rem' },
                width: '100%',
            }}
        >
            <AddToBtn
                icon="mi:add"
                text="افزودن"
                onClick={() => setOpenFormModal(true)}
            />
            <AddBank
                openFormModal={openFormModal}
                setOpenFormModal={setOpenFormModal}
            />
            <BankList />
        </Box>
    );
};

export default BanksContainer;
