import * as yup from 'yup';

export const LoginValidation = yup.object().shape({
    email: yup
        .string()
        .required('ایمیل الزامی است.')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'لطفا یک ایمیل معتبر وارد کنید.'
        ),
    password: yup.string().required('رمز عبور الزامی است.'),
});
