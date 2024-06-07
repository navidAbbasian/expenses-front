import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTagReq } from '../../../../api/requests';
import { TagValidation } from '../../../../schema/TagValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTagForm from './AddTagForm';

const AddTag = ({ openFormModal, setOpenFormModal }) => {
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverError, setServerError] = useState(null);

    const { reset, ...formMethods } = useForm({
        resolver: yupResolver(TagValidation),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                await createTagReq(data);
                setSubmissionStatus(1);
                setOpenFormModal(false);
                queryClient.invalidateQueries('tags');
                reset();
            } catch (error) {
                setSubmissionStatus(0);
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 2000);
                setServerError(error?.response?.data?.message);
            }
        },
    });

    const handleAddTag = (data) => mutation.mutate(data);

    const isPend = mutation?.isPending;

    return (
        <AddTagForm
            formData={{
                openFormModal,
                setOpenFormModal,
                onSubmit: handleAddTag,
                submissionStatus,
                setSubmissionStatus,
                serverError,
                isPend,
                ...formMethods
            }}
        />
    );
};

export default AddTag;
