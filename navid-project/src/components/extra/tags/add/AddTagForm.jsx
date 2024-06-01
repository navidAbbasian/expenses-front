import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormAlert from '../../../shared/alerts/FormAlert';
import FormErrorMessage from '../../../shared/alerts/FormErrorMessage';
import SubmitBtn from '../../../shared/buttons/SubmitBtn';
import FormModal from '../../../shared/modal/FormModal';

const AddTagForm = ({ formData }) => {
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
                title="افزودن تگ"
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
                                error={Boolean(errors.description)}
                                {...register('description')}
                            />
                            {errors.description && (
                                <FormErrorMessage
                                    error={errors.description.message}
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
                successMessage="تگ با موفقیت افزوده شد."
                errorMessage={serverError}
            />
        </>
    );
};

export default AddTagForm;
