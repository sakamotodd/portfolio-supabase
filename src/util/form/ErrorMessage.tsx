import * as yup from 'yup';

const LocaleJP = {
  mixed: {
    default: '${path}は無効です',
    required: '必須入力項目です',
  },
  string: {
    min: ({ min }) => `${min}文字以上の値を入力して下さい`,
    max: ({ max }) => `${max}文字以内で入力して下さい`,
      email: '形式が違います',
      trim: '前後にスペースを入れてはいけません',
      oneOf: '入力したパスワードが一致しません',
  },
};

yup.setLocale(LocaleJP);
export const BaseYup = yup;
