import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBankReq } from '../../../../api/requests';
import { BankValidation } from '../../../../schema/BankValidation';
import AddBankForm from './AddBankForm';

const AddBank = ({ openFormModal, setOpenFormModal }) => {
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverError, setServerError] = useState(null);
    const adminProfile = JSON.parse(localStorage.getItem('adminProfile'));
    const adminProfileId = adminProfile ? adminProfile.id : null;

    const { reset, ...formMethods } = useForm({
        resolver: yupResolver(BankValidation),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                const updatedData = {
                    account_owner: adminProfileId,
                    ...data
                };
                await createBankReq(updatedData);
                setSubmissionStatus(1);
                setOpenFormModal(false);
                reset();
                queryClient.invalidateQueries('banks');
            } catch (error) {
                setSubmissionStatus(0);
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 2000);
                setServerError(error?.response?.data?.message);
            }
        },
    });

    const handleAddBank = (data) => mutation.mutate(data);

    const isPend = mutation?.isPending;

    return (
        <AddBankForm
            formData={{
                openFormModal,
                setOpenFormModal,
                onSubmit: handleAddBank,
                submissionStatus,
                setSubmissionStatus,
                serverError,
                isPend,
                ...formMethods,
            }}
        />
    );
};

export default AddBank;
