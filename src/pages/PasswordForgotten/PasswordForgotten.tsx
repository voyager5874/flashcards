import { useEffect } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useDebouncedValue } from 'hooks';
import styles from 'pages/PasswordForgotten/PasswordForgotten.module.scss';
import { startPasswordRecovery } from 'store/asyncActions/password';
import { createValidationSchema } from 'utils/formsValidationSchema';

// type AppFormsFieldType = {
//   email?: string;
//   // how to write universal validationSchema?
//   password?: string;
//   confirmPassword?: string;
// };

const initialValues = {
  email: '',
  // password: 'validPass775',
  // confirmPassword: 'validPass775',
};

const formValidationSchema = createValidationSchema(initialValues);

export const PasswordForgotten = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: formValidationSchema,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      dispatch(
        startPasswordRecovery(
          {
            email: values.email,
            origin: window.location.origin,
            senderName: 'alex',
            senderEmail: values.email,
          },
          navigate,
          formikHelpers.setSubmitting,
        ),
      );
    },
  });

  const debouncedEmailField = useDebouncedValue(formik.values.email);

  useEffect(() => {
    // if (!formik.errors.email) return;
    if (!debouncedEmailField) return;
    formik.validateForm();
    // }, [formik.errors.email, debouncedEmailField]);
  }, [debouncedEmailField]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Forgot your password?</h1>
        <TextInput
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="email"
          onBlur={formik.handleBlur}
          error={formik.touched && formik.errors.email ? formik.errors.email : ''}
        />
        <p>Enter your email and we will send you further instructions</p>

        <ButtonFlatDesign type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          Send instructions
        </ButtonFlatDesign>

        <NavLink to="/login">Try logging in</NavLink>
      </form>
    </div>
  );
};
