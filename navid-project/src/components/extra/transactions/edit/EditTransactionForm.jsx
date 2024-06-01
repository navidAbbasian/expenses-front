import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { TransactionValidation } from '../../../../schema/TransactionValidation';
import FormAlert from '../../../shared/alerts/FormAlert';
import FormErrorMessage from '../../../shared/alerts/FormErrorMessage';
import SubmitBtn from '../../../shared/buttons/SubmitBtn';
import FormModal from '../../../shared/modal/FormModal';

const EditTransactionForm = ({ formData }) => {
    const {
        transactionData,
        openEditModal,
        setOpenEditModal,
        onSubmit,
        submissionStatus,
        setSubmissionStatus,
        serverError,
        isPend,
        itemName,
    } = formData;

    // hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(TransactionValidation),
    });

    const { amount, description, from, to, type } = transactionData;

    return (
        <>
            <FormModal
                openFormModal={openEditModal}
                setOpenFormModal={setOpenEditModal}
                title={`ویرایش تراکنش ${itemName}`}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="number"
                                label="مقدار"
                                name="amount"
                                defaultValue={amount}
                                error={Boolean(errors.amount)}
                                {...register('amount')}
                            />
                            {errors.amount && (
                                <FormErrorMessage
                                    error={errors.amount.message}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="توضیحات"
                                type="text"
                                fullWidth
                                multiline
                                maxRows={3}
                                variant="outlined"
                                name="description"
                                defaultValue={description}
                                error={Boolean(errors.description)}
                                {...register('description')}
                            />
                            {errors.description && (
                                <FormErrorMessage
                                    error={errors.description.message}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="text"
                                label="نوع"
                                name="type"
                                defaultValue={type}
                                error={Boolean(errors.type)}
                                {...register('type')}
                            />
                            {errors.type && (
                                <FormErrorMessage error={errors.type.message} />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="text"
                                label="از"
                                name="from"
                                defaultValue={from}
                                error={Boolean(errors.from)}
                                {...register('from')}
                            />
                            {errors.from && (
                                <FormErrorMessage error={errors.from.message} />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="text"
                                label="مقدار"
                                name="to"
                                defaultValue={to}
                                error={Boolean(errors.to)}
                                {...register('to')}
                            />
                            {errors.to && (
                                <FormErrorMessage error={errors.to.message} />
                            )}
                        </Grid>
                    </Grid>
                    <SubmitBtn onLoading={isPend} />
                </form>
            </FormModal>
            <FormAlert
                status={submissionStatus}
                onClose={() => setSubmissionStatus(null)}
                successMessage="تراکنش با موفقیت ویرایش شد."
                errorMessage={serverError}
            />
        </>
    );
};

export default EditTransactionForm;
