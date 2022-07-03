import * as yup from 'yup';
import { BaseYup } from './ErrorMessage';

export const useErrorMessage = () => {
  // サイン時のエラーメッセージ
  const signInValidationSchema = BaseYup.object().shape({
    email: BaseYup.string().required().email(),
    password: BaseYup.string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, { message: '半角英数字以外が含まれています。' })
      .min(8)
      .max(16)
      .trim(),
  });

  // 新規登録時のエラーメッセージ
  const signUpValidationSchema = yup.object().shape({
    name: BaseYup.string().required().max(20),
    email: BaseYup.string().required().email(),
    password: BaseYup.string()
      .required()
      .matches(/^[a-zA-Z0-9]+$/, { message: '半角英数字以外が含まれています。' })
      .min(8)
      .max(16),
    pass: BaseYup.string()
      .required()
      .oneOf([yup.ref('password')], '入力したパスワードが一致しません'),
  });

  //問い合わせ時のエラーメッセージ
  const contactValidationSchema = yup.object().shape({
    name: BaseYup.string().required().max(30),
    email: BaseYup.string().required().email(),
    contact: BaseYup.string().required().max(999),
  });
  return { signInValidationSchema, signUpValidationSchema, contactValidationSchema };
};
