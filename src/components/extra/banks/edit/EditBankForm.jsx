import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { BankValidation } from '../../../../schema/BankValidation';
import FormAlert from '../../../shared/alerts/FormAlert';
import FormErrorMessage from '../../../shared/alerts/FormErrorMessage';
import SubmitBtn from '../../../shared/buttons/SubmitBtn';
import FormModal from '../../../shared/modal/FormModal';

const EditBankForm = ({ formData }) => {
    const {
        bankData,
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
        resolver: yupResolver(BankValidation),
    });

    const { name, account_number } = bankData;

    return (
        <>
            <FormModal
                openFormModal={openEditModal}
                setOpenFormModal={setOpenEditModal}
                title={`ویرایش بانک ${itemName}`}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                label="نام"
                                name="name"
                                error={Boolean(errors.name)}
                                defaultValue={name}
                                {...register('name')}
                            />
                            {errors.name && (
                                <FormErrorMessage error={errors.name.message} />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                label="شماره حساب"
                                name="account_number"
                                error={Boolean(errors.account_number)}
                                defaultValue={account_number}
                                {...register('account_number')}
                            />
                            {errors.account_number && (
                                <FormErrorMessage
                                    error={errors.account_number.message}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <SubmitBtn onLoading={isPend} />
                </form>
            </FormModal>
            <FormAlert
                status={submissionStatus}
                onClose={() => setSubmissionStatus(null)}
                successMessage="بانک با موفقیت ویرایش شد."
                errorMessage={serverError}
            />
        </>
    );
};

export default EditBankForm;
