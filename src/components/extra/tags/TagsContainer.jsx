import { Box } from '@mui/material';
import { useState } from 'react';
import AddToBtn from './../../shared/buttons/AddToBtn';
import AddTag from './add/AddTag';
import TagsList from './list/TagsList';

const TagsContainer = () => {
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
            <AddTag
                openFormModal={openFormModal}
                setOpenFormModal={setOpenFormModal}
            />
            <TagsList />
        </Box>
    );
};

export default TagsContainer;
