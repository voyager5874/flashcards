import { useEffect } from 'react';

import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './PasswordReset.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useDebouncedValue } from 'hooks';
import { requestPasswordReset } from 'store/asyncActions/password';
import { createValidationSchema } from 'utils/formsValidationSchema';

const initialValues = {
  password: '',
  confirmPassword: '',
  token: '',
};

const formValidationSchema = createValidationSchema({
  password: initialValues.password,
  token: initialValues.token,
});

export const PasswordReset = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const params = useParams();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      token: params.token || '',
    },
    validationSchema: formValidationSchema,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      dispatch(
        requestPasswordReset(
          { password: values.password, resetPasswordToken: formik.values.token },
          navigate,
          formikHelpers.setSubmitting,
        ),
      );
    },
  });

  const debouncedPasswordField = useDebouncedValue(formik.values.password);
  const debouncedConfirmPasswordField = useDebouncedValue(formik.values.confirmPassword);

  useEffect(() => {
    if (!formik.values.password) return;
    formik.validateForm();
  }, [debouncedPasswordField, debouncedConfirmPasswordField]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Set new password</h1>
        <div>{JSON.stringify(formik.status)}</div>
        {/* <div>{formik.values.token}</div> */}
        {/* <div>{JSON.stringify(formik.errors)}</div> */}
        <TextInput
          disabled={formik.isSubmitting}
          placeholder="new password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched && formik.errors.password ? formik.errors.password : ''}
        />
        <TextInput
          disabled={formik.isSubmitting}
          placeholder="confirm password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ''
          }
        />
        <TextInput
          hidden
          disabled
          name="token"
          value={formik.values.token}
          onChange={formik.handleChange}
          // error={formik.errors.token ? formik.errors.token : ''}
        />

        <p>Enter a valid password and the old one will be reset</p>
        <ButtonFlatDesign type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          Set new password
        </ButtonFlatDesign>
      </form>
    </div>
  );
};
