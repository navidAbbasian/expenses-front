import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormAlert from '../../../shared/alerts/FormAlert';
import FormErrorMessage from '../../../shared/alerts/FormErrorMessage';
import SubmitBtn from '../../../shared/buttons/SubmitBtn';
import FormModal from '../../../shared/modal/FormModal';
import {
    Autocomplete,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const AddTransactionForm = ({ formData }) => {
    const {
        openFormModal,
        setOpenFormModal,
        onSubmit,
        submissionStatus,
        setSubmissionStatus,
        serverError,
        isPend,
        users,
        tags,
        handleChooseFromBank,
        handleChooseToBank,
        handleChooseTag,
        register,
        handleTypeChange,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = formData;

    const bankOptions = users.flatMap((user) =>
        user.banks.map((bank) => ({
            ...bank,
            userName: user.name,
        }))
    );

    console.log("errors", errors)

    const watchedType = watch('type');

    return (
        <>
            <FormModal
                openFormModal={openFormModal}
                setOpenFormModal={setOpenFormModal}
                title="افزودن تراکنش"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={12}
                            sm={watchedType === 'cart_to_cart' ? 12 : 6}
                        >
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel id="demo-simple-select-outlined-label">
                                    نوع
                                </InputLabel>
                                <Controller
                                    control={control}
                                    name="type"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="نوع"
                                            id="demo-simple-select-outlined"
                                            labelId="demo-simple-select-outlined-label"
                                            onChange={handleTypeChange}
                                            {...register('type')}
                                        >
                                            <MenuItem value={'income'}>
                                                درآمد
                                            </MenuItem>
                                            <MenuItem value={'cost'}>
                                                هزینه
                                            </MenuItem>
                                            <MenuItem value={'cart_to_cart'}>
                                                کارت به کارت
                                            </MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.type && (
                                    <FormErrorMessage
                                        error={errors.type.message}
                                    />
                                )}
                            </FormControl>
                        </Grid>
                        {watchedType === 'cart_to_cart' ? (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        loading
                                        disablePortal
                                        size="small"
                                        id="combo-box-demo"
                                        options={bankOptions}
                                        getOptionLabel={(option) =>
                                            `${option?.name} (${option?.userName})`
                                        }
                                        name="bank_id"
                                        onChange={(event, val) =>
                                            handleChooseFromBank(
                                                event,
                                                val ? val.id : null
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} label="از" />
                                        )}
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}>
                                                {`${option.name} (${option.userName})`}
                                            </li>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        loading
                                        disablePortal
                                        size="small"
                                        id="combo-box-demo"
                                        options={bankOptions}
                                        getOptionLabel={(option) =>
                                            `${option?.name} (${option?.userName})`
                                        }
                                        name="bank_id"
                                        onChange={(event, val) =>
                                            handleChooseToBank(event, val.id)
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} label="به" />
                                        )}
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}>
                                                {`${option.name} (${option.userName})`}
                                            </li>
                                        )}
                                    />
                                </Grid>
                            </>
                        ) : watchedType === 'cost' ? (
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    loading
                                    disablePortal
                                    size="small"
                                    id="combo-box-demo"
                                    options={bankOptions}
                                    getOptionLabel={(option) =>
                                        `${option?.name} (${option?.userName})`
                                    }
                                    name="bank_id"
                                    onChange={(event, val) =>
                                        handleChooseFromBank(
                                            event,
                                            val ? val.id : null
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="از" />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option?.id}>
                                            {`${option?.name} (${option?.userName})`}
                                        </li>
                                    )}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    loading
                                    disablePortal
                                    size="small"
                                    id="combo-box-demo"
                                    options={bankOptions}
                                    getOptionLabel={(option) =>
                                        `${option?.name} (${option?.userName})`
                                    }
                                    name="bank_id"
                                    onChange={(event, val) =>
                                        handleChooseToBank(event, val.id)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="به" />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option?.id}>
                                            {`${option?.name} (${option?.userName})`}
                                        </li>
                                    )}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="number"
                                size="small"
                                label="مقدار"
                                name="amount"
                                error={Boolean(errors.amount)}
                                {...register('amount')}
                            />
                            {errors.amount && (
                                <FormErrorMessage
                                    error={errors.amount.message}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                loading
                                multiple
                                size="small"
                                id="checkboxes-tags-demo"
                                name="tags_id"
                                options={tags}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                onChange={handleChooseTag}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props} key={option?.id}>
                                        <Checkbox checked={selected} />
                                        {option?.name}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} label="انتخاب تگ" />
                                )}
                            />
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
                successMessage="تراکنش با موفقیت افزوده شد."
                errorMessage={serverError}
            />
        </>
    );
};

export default AddTransactionForm;
