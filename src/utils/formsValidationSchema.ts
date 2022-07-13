import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { RequiredStringSchema } from 'yup/lib/string';

import { ZERO_LENGTH } from 'const';

YupPassword(Yup);

// const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;
const MAX_EMAIL_LENGTH = 50;

type AppFormsFieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .max(MAX_EMAIL_LENGTH, 'this seems too long'),
  password: Yup.string()
    .password()
    .required('Required')
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

export const createValidationSchema = (formFields: string[]) => {
  const validationObject: any = {};
  console.dir(Yup.object);
  console.dir(Yup.object({}));
  console.dir(typeof Yup.object);
  formFields.forEach(field => {
    switch (field) {
      case 'email':
        validationObject[field] = Yup.string()
          .email('Invalid email address')
          .required('Required')
          .max(MAX_EMAIL_LENGTH, 'this seems too long');
        break;
      case 'password':
        validationObject[field] = Yup.string()
          .password()
          .required('Required')
          .minSymbols(ZERO_LENGTH)
          .max(MAX_PASSWORD_LENGTH, 'Are you sure you will remember this?');
        break;
      case 'confirmPassword':
        validationObject[field] = Yup.string().when('password', {
          is: (val: string) => !!(val && val.length > ZERO_LENGTH),
          then: Yup.string().oneOf([Yup.ref('password')], 'passwords mismatch'),
        });
        break;
      default:
        validationObject[field] = Yup.string().required();
    }
  });
  return Yup.object(validationObject);
};
