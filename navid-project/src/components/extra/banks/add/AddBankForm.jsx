import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormAlert from '../../../shared/alerts/FormAlert';
import FormErrorMessage from '../../../shared/alerts/FormErrorMessage';
import SubmitBtn from '../../../shared/buttons/SubmitBtn';
import FormModal from '../../../shared/modal/FormModal';

const AddBankForm = ({ formData }) => {
    const {
        openFormModal,
        setOpenFormModal,
        onSubmit,
        submissionStatus,
        setSubmissionStatus,
        serverError,
        isPend,
        register,
        handleSubmit,
        formState: { errors },
    } = formData;

    return (
        <>
            <FormModal
                openFormModal={openFormModal}
                setOpenFormModal={setOpenFormModal}
                title="افزودن بانک"
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
                successMessage="بانک با موفقیت افزوده شد."
                errorMessage={serverError}
            />
        </>
    );
};

export default AddBankForm;
