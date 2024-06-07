import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { singleTagReq, updateTagReq } from '../../../../api/requests';
import FetchLoading from '../../../shared/loadings/FetchLoading';
import EditTagForm from './EditTagForm';

const EditTag = (props) => {
    const {
        itemName,
        openEditModal,
        setOpenEditModal,
        handleCloseEditModal,
        itemId,
    } = props.items;
    const [tagData, setTagData] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverError, setServerError] = useState(null);

    // fetch single tag
    const { data, isLoading, isFetching, isSuccess } = useQuery({
        queryKey: ['single-tag', itemId],
        queryFn: () => {
            return singleTagReq(itemId);
        },
        enabled: !!itemId,
    });

    console.log("data", data)

    useEffect(() => {
        if (isSuccess) {
            setTagData(data?.data);
        }
    }, [isFetching]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                await updateTagReq(itemId, data);
                setSubmissionStatus(1);
                setTimeout(() => {
                    handleCloseEditModal();
                }, 500);
                queryClient.invalidateQueries('tags');
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
    const handleEditTag = (data) => mutation.mutate(data);

    const isPend = mutation?.isPending;

    if (isLoading) {
        return <FetchLoading />;
    } else if (tagData)
        return (
            <EditTagForm
                formData={{
                    tagData,
                    openEditModal,
                    setOpenEditModal,
                    onSubmit: handleEditTag,
                    submissionStatus,
                    setSubmissionStatus,
                    serverError,
                    isPend,
                    itemName,
                }}
            />
        );
};

export default EditTag;
