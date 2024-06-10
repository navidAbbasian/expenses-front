import * as yup from 'yup';

export const TransactionValidation = yup.object().shape({
    amount: yup.string().required('مقدار تگ الزامی است.'),
    description: yup.string().required('توضیحات تراکنش الزامی است.'),
    type: yup.string().required('نوع تراکنش الزامی است.'),
});
