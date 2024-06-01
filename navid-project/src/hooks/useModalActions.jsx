import { useState } from 'react';

const useModalActions = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [itemId, setItemID] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemData, setItemData] = useState();

    // delete modal handlers
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleDelete = (id, name) => {
        setItemID(id);
        setItemName(name);
        handleOpenDeleteModal(true);
    };

    // edit modal handlers
    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleEdit = (id, name, data) => {
        setItemID(id);
        setItemName(name);
        setItemData(data);
        handleOpenEditModal(true);
    };

    return {
        openDeleteModal,
        setOpenDeleteModal,
        openEditModal,
        setOpenEditModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleOpenEditModal,
        handleCloseEditModal,
        handleEdit,
        itemId,
        setItemID,
        handleDelete,
        itemName,
        setItemName,
        itemData,
        setItemData,
    };
};

export default useModalActions;
