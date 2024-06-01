import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { singleTransactionReq, updateTransactionReq } from '../../../../api/requests';
import FetchLoading from '../../../shared/loadings/FetchLoading';
import EditTransactionForm from './EditTransactionForm';

const EditTransaction = (props) => {
    const {
        itemName,
        openEditModal,
        setOpenEditModal,
        handleCloseEditModal,
        itemId,
    } = props.items;
    const [transactionData, setTransactionData] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverError, setServerError] = useState(null);

    // fetch single transaction
    const { data, isLoading, isFetching, isSuccess } = useQuery({
        queryKey: ['single-transaction', itemId],
        queryFn: () => {
            return singleTransactionReq(itemId);
        },
        enabled: !!itemId,
    });

    console.log("data", data)

    useEffect(() => {
        if (isSuccess) {
            setTransactionData(data?.data);
        }
    }, [isFetching]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                await updateTransactionReq(itemId, data);
                setSubmissionStatus(1);
                setTimeout(() => {
                    handleCloseEditModal();
                }, 500);
                queryClient.invalidateQueries('transactions');
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
    const handleEditTransaction = (data) => mutation.mutate(data);

    const isPend = mutation?.isPending;

    if (isLoading) {
        return <FetchLoading />;
    } else if (transactionData)
        return (
            <EditTransactionForm
                formData={{
                    transactionData,
                    openEditModal,
                    setOpenEditModal,
                    onSubmit: handleEditTransaction,
                    submissionStatus,
                    setSubmissionStatus,
                    serverError,
                    isPend,
                    itemName,
                }}
            />
        );
};

export default EditTransaction;
