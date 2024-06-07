import * as yup from 'yup';

export const RegisterValidation = yup.object().shape({
    name: yup.string().required('نام الزامی است.'),
    number: yup.string().required('شماره تلفن الزامی است.'),
    email: yup
        .string()
        .required('ایمیل الزامی است.')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'لطفا یک ایمیل معتبر وارد کنید.'
        ),
    password: yup.string().required('رمز عبور الزامی است.'),
});
