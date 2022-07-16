import * as Yup from 'yup';
import YupPassword from 'yup-password';

import { ZERO_LENGTH } from 'const';

YupPassword(Yup);

// const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;
const MAX_EMAIL_LENGTH = 50;

type AppFormsFieldType = {
  email: string;
  password?: string;
  confirmPassword?: string;
};

// const baseTextFieldValidation = Yup.string().required('required');
const baseTextFieldValidation = Yup.string();
// const skipFieldValidation = Yup.string().strip();
const skipFieldValidation = Yup.string().nullable().strip();

export const validationSchema = Yup.object({
  email: baseTextFieldValidation
    .email('Invalid email address')
    .max(MAX_EMAIL_LENGTH, 'this seems too long'),
  password: baseTextFieldValidation
    .password()
    .minSymbols(ZERO_LENGTH)
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    //   // 'Must Contain at least 8 chars, one uppercase, one lowercase, one number and one symbol',
    //   'password is too weak',
    // )
    .max(MAX_PASSWORD_LENGTH, 'Are you sure you will remember this?'),
  confirmPassword: Yup.string().when('password', {
    is: (val: string) => !!(val && val.length > ZERO_LENGTH),
    then: Yup.string().oneOf([Yup.ref('password')], 'passwords mismatch'),
  }),
  // .label('confirm password')
  // .oneOf([Yup.ref('password'), null], 'passwords mismatch'),
});

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

export const createValidationSchema = (formFields: AppFormsFieldType) => {
  const formFieldsNames = Object.keys(formFields);
  const schemaFieldsNames = Object.keys(validationSchema.fields);
  let schema = validationSchema.concat(Yup.object({}));

  schemaFieldsNames.forEach(field => {
    schema = formFieldsNames.includes(field)
      ? schema.concat(Yup.object({ [field]: Yup.string().required(`${field} required`) }))
      : (schema = schema.concat(Yup.object({ [field]: skipFieldValidation })));
  });
  return schema;
};
