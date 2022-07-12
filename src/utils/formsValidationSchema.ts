import * as Yup from 'yup';

import { ZERO_LENGTH } from 'const';

// const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;
const MAX_EMAIL_LENGTH = 50;

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .max(MAX_EMAIL_LENGTH, 'this seems too long'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      // 'Must Contain at least 8 chars, one uppercase, one lowercase, one number and one symbol',
      'password is too weak',
    )
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
