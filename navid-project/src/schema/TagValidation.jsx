import * as yup from 'yup';

export const TagValidation = yup.object().shape({
    name: yup.string().required('نام تگ الزامی است.'),
    description: yup.string()
});
