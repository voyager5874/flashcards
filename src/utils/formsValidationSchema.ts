import * as Yup from 'yup';
import YupPassword from 'yup-password';

import { ZERO_LENGTH } from 'const';

YupPassword(Yup);

const MIN_TOKEN_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;
const MAX_EMAIL_LENGTH = 50;

type AppFormsFieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
  rememberMe?: boolean;
};

const skipFieldValidation = Yup.string().nullable().strip();

export const baseValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .max(MAX_EMAIL_LENGTH, 'this seems too long'),
  password: Yup.string()
    .password()
    .minSymbols(ZERO_LENGTH)
    .max(MAX_PASSWORD_LENGTH, 'Are you sure you will remember this?'),
  token: Yup.string().min(MIN_TOKEN_LENGTH, 'token invalid'),
});

const confirmPasswordFieldValidationSchema = Yup.object({
  confirmPassword: Yup.string().when('password', {
    is: (val: string) => !!(val && val.length >= MIN_PASSWORD_LENGTH),
    then: Yup.string()
      .required('repeat your password')
      .oneOf([Yup.ref('password')], 'passwords mismatch'),
  }),
});

const skipPasswordQualityCheck = Yup.object({
  password: Yup.string()
    .password()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH)
    .minUppercase(ZERO_LENGTH)
    .minLowercase(ZERO_LENGTH)
    .minNumbers(ZERO_LENGTH)
    .minSymbols(ZERO_LENGTH),
});

export const createValidationSchema = (formFields: AppFormsFieldType) => {
  const formFieldsNames = Object.keys(formFields);
  const schemaFieldsNames = Object.keys(baseValidationSchema.fields);

  let schema = baseValidationSchema.concat(Yup.object({})); // to make a copy

  const isLoginForm = formFieldsNames.includes('rememberMe');
  const needConfirmPassword = formFieldsNames.includes('confirmPassword');

  schemaFieldsNames.forEach(field => {
    schema = formFieldsNames.includes(field)
      ? schema.concat(Yup.object({ [field]: Yup.string().required(`${field} required`) }))
      : (schema = schema.concat(Yup.object({ [field]: skipFieldValidation })));
  });

  if (needConfirmPassword) schema = schema.concat(confirmPasswordFieldValidationSchema);
  if (isLoginForm) schema = schema.concat(skipPasswordQualityCheck);

  return schema;
};

// just examples

// validationSchema={Yup.object({
//         lookingForAJob: Yup.boolean().oneOf(
//             [true, false],
//             'You must accept the terms and conditions.',
//         ),
//         contacts: Yup.object().shape({
//             github: Yup.string()
//                 .matches(correctUrlRe, 'Website should be a valid URL')
//                 .nullable(),
//         }),
//     })}

// .label('confirm password')
// .oneOf([Yup.ref('password'), null], 'passwords mismatch'),

// password: Yup.string().required('required')
// .matches(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
//   // 'at least 8 chars, one uppercase, one lowercase, one number and one symbol',
//   'password is too weak',
// )
