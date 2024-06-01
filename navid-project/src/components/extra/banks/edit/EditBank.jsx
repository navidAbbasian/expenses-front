import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { singleBankReq, updateBankReq } from '../../../../api/requests';
import FetchLoading from '../../../shared/loadings/FetchLoading';
import EditBankForm from './EditBankForm';

const EditBank = (props) => {
    // props
    const {
        itemName,
        openEditModal,
        setOpenEditModal,
        handleCloseEditModal,
        itemId,
    } = props.items;
    // states
    const [bankData, setBankData] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverError, setServerError] = useState(null);
    const adminProfile = JSON.parse(localStorage.getItem('adminProfile'));
    const adminProfileId = adminProfile ? adminProfile.id : null;

    console.log("adminProfileId", adminProfileId)

    // fetch single bank
    const { data, isLoading, isFetching, isSuccess } = useQuery({
        queryKey: ['single-bank', itemId],
        queryFn: () => {
            return singleBankReq(itemId);
        },
        enabled: !!itemId,
    });

    useEffect(() => {
        if (isSuccess) {
            setBankData(data?.data);
        }
    }, [isFetching]);

    const queryClient = useQueryClient();

    // form handler
    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                const updatedData = {
                    ...data,
                    account_owner: adminProfileId,
                };
                await updateBankReq(itemId, updatedData);
                setSubmissionStatus(1);
                setTimeout(() => {
                    handleCloseEditModal();
                }, 500);
                queryClient.invalidateQueries('banks');
            } catch (error) {
                console.log('error is', error);
                setSubmissionStatus(0);
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 2000);
                setServerError(error?.response?.data?.message);
            }
        },
    });

    const handleUpdateBank = (data) => {
        mutation?.mutate(data);
    };

    const isPend = mutation.isPending;

    if (isLoading) {
        return <FetchLoading />;
    } else if (bankData)
        return (
            <EditBankForm
                formData={{
                    bankData,
                    openEditModal,
                    setOpenEditModal,
                    onSubmit: handleUpdateBank,
                    submissionStatus,
                    setSubmissionStatus,
                    serverError,
                    isPend,
                    itemName,
                }}
            />
        );
};

export default EditBank;
