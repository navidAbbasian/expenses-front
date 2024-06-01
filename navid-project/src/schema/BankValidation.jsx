import * as yup from 'yup';

export const BankValidation = yup.object().shape({
    name: yup.string().required('نام الزامی است.'),
    account_number: yup.string().required('شماره حساب الزامی است.'),
});
