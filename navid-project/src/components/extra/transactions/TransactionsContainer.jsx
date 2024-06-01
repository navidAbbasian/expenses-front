import { Box } from '@mui/material';
import { useState } from 'react';
import AddToBtn from './../../shared/buttons/AddToBtn';
import AddTransaction from './add/AddTransaction';
import TransactionsList from './list/TransactionsList';

const TransactionsContainer = () => {
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
            <AddTransaction
                openFormModal={openFormModal}
                setOpenFormModal={setOpenFormModal}
            />
            <TransactionsList />
        </Box>
    );
};

export default TransactionsContainer;
