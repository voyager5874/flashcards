import { useEffect } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useAppSelector, useDebouncedValue } from 'hooks';
import styles from 'pages/Register/Register.module.scss';
import { register } from 'store/asyncActions/register';
import { createValidationSchema } from 'utils/formsValidationSchema';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = createValidationSchema({ email: '', password: '' });

export const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userIsLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    if (userIsLoggedIn) {
      navigate('../packs', { replace: true });
    }
  }, [userIsLoggedIn]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: ({ email, password }, { setSubmitting }) => {
      dispatch(register({ email, password }, navigate, setSubmitting));
    },
  });

  const debouncedEmailField = useDebouncedValue(formik.values.email);

  const debouncedPasswordField = useDebouncedValue(formik.values.password);

  const debouncedConfirmPasswordField = useDebouncedValue(formik.values.confirmPassword);

  useEffect(() => {
    if (!debouncedEmailField) return;
    // formik.validateForm();
    formik.setFieldTouched('email');
    formik.validateField('email');
  }, [debouncedEmailField]);

  useEffect(() => {
    if (!debouncedPasswordField) return;
    // formik.validateForm();
    formik.setFieldTouched('password');
    formik.validateField('password');
  }, [debouncedPasswordField]);

  useEffect(() => {
    if (!debouncedConfirmPasswordField) return;
    // formik.validateForm();
    formik.validateField('confirmPassword');
  }, [debouncedConfirmPasswordField]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign Up</h1>
        <TextInput
          disabled={formik.isSubmitting}
          placeholder="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        />
        <TextInput
          type="password"
          disabled={formik.isSubmitting}
          placeholder="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''
          }
        />
        <TextInput
          type="password"
          disabled={formik.isSubmitting}
          placeholder="confirm password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword ? formik.errors.confirmPassword : ''}
        />
        <ButtonFlatDesign type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          Sign up
        </ButtonFlatDesign>
        <NavLink to="/login">Sign in</NavLink>
      </form>
    </div>
  );
};
