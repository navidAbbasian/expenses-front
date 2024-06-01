import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    createTransactionReq,
    tagsListReq,
    usersListReq,
} from '../../../../api/requests';
import AddTransactionForm from './AddTransactionForm';
import { TransactionValidation } from '../../../../schema/TransactionValidation';
import { yupResolver } from '@hookform/resolvers/yup';

const AddTransaction = ({ openFormModal, setOpenFormModal }) => {
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [users, setUsers] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedFromBank, setSelectedFromBank] = useState(null);
    const [selectedToBank, setSelectedToBank] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);

    // console.log("selectedTag", selectedTag)
    console.log('selectedToBank', selectedToBank);
    console.log('selectedFromBank', selectedFromBank);

    const { reset, setValue, ...formMethods } = useForm({
        resolver: yupResolver(TransactionValidation),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                const updatedData = {
                    ...data,
                    from: selectedFromBank,
                    to: selectedToBank,
                    ...selectedTag,
                };
                if (data?.type === 'cart_to_cart') {
                    const costData = { ...updatedData, type: 'cost' };
                    const incomeData = { ...updatedData, type: 'income' };

                    await createTransactionReq(costData);
                    await createTransactionReq(incomeData);
                } else {
                    await createTransactionReq(updatedData);
                }
                setSubmissionStatus(1);
                setOpenFormModal(false);
                queryClient.invalidateQueries('transactions');
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

    const handleAddTransaction = (data) => mutation.mutate(data);

    const {
        data: usersData,
        isFetching: isFetchingUsersLIst,
        isSuccess: isSuccessUsersList,
    } = useQuery({
        queryKey: ['users-list'],
        queryFn: ({ signal }) => {
            return usersListReq(1, signal);
        },
    });

    const {
        data: tagsData,
        isFetching: isFetchingTagsLIst,
        isSuccess: isSuccessTagsList,
    } = useQuery({
        queryKey: ['tags-list'],
        queryFn: ({ signal }) => {
            return tagsListReq(1, signal);
        },
    });

    useEffect(() => {
        if (isSuccessUsersList) {
            setUsers(usersData?.data?.data);
        }
        if (isSuccessTagsList) {
            setTags(tagsData?.data?.data);
        }
    }, [isFetchingUsersLIst, isFetchingTagsLIst]);

    const handleChooseFromBank = (event, val) => {
        setSelectedFromBank(val);
    };

    const handleChooseToBank = (event, val) => {
        setSelectedToBank(val);
    };

    const handleChooseTag = (event, values) => {
        const selectedTagsId = values?.map((value) => value?.id);
        const formattedTags = selectedTagsId.reduce(
            (acc, customerId, index) => {
                acc[`tag_ids[${index}]`] = customerId;
                return acc;
            },
            {}
        );
        setSelectedTag(formattedTags);
    };

    const handleTypeChange = (event) => {
        const value = event.target.value;
        setValue('type', value);
    };

    const isPend = mutation?.isPending;

    return (
        <AddTransactionForm
            formData={{
                openFormModal,
                setOpenFormModal,
                onSubmit: handleAddTransaction,
                submissionStatus,
                setSubmissionStatus,
                serverError,
                isPend,
                handleTypeChange,
                handleChooseFromBank,
                handleChooseToBank,
                handleChooseTag,
                users,
                tags,
                ...formMethods,
            }}
        />
    );
};

export default AddTransaction;
