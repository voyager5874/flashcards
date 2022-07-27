import { CSSProperties, ReactElement, useEffect } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { LoginParameterType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useAppSelector, useDebouncedValue } from 'hooks';
import { login } from 'store/asyncActions/login';
import { createValidationSchema } from 'utils/formsValidationSchema';

const disableNavLink: CSSProperties = {
  pointerEvents: 'none',
};

const initialValues: LoginParameterType = {
  email: process.env.REACT_APP_MY_EMAIL || 'test@test.ru',
  password: process.env.REACT_APP_PASSWORD || 'test@test.ru', // need to skip password strength check when login - only for register
  rememberMe: false,
};

const validationSchema = createValidationSchema({
  email: '',
  password: '',
});

export const Login = (): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: ({ email, password, rememberMe }, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(
        login({
          email,
          password,
          rememberMe,
        }),
      ).then(() => setSubmitting(false));
    },
  });

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) return;
    navigate('../packs', { replace: true });
  }, [isLoggedIn]);

  const debouncedEmailField = useDebouncedValue(formik.values.email);
  const debouncedPasswordField = useDebouncedValue(formik.values.password);

  useEffect(() => {
    if (!debouncedEmailField) return;
    // if (!formik.values.email) return;
    formik.setFieldTouched('email');
    // formik.validateForm();
    formik.validateField('email');
  }, [debouncedEmailField]);

  useEffect(() => {
    if (!debouncedPasswordField) return;
    formik.setFieldTouched('password');
    // formik.validateForm();
    formik.validateField('password');
  }, [debouncedPasswordField]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign in</h1>
        <TextInput
          disabled={formik.isSubmitting}
          name="email"
          placeholder="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          // touched toggles after first onBlur
          // error={formik.errors.email ? formik.errors.email : ''}
        />
        <TextInput
          type="password"
          disabled={formik.isSubmitting}
          name="password"
          placeholder="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''
          }
        />

        <NavLink
          to="/password-forgotten"
          style={{
            alignSelf: 'left',
            pointerEvents: `${formik.isSubmitting ? 'none' : 'all'}`,
          }}
        >
          Forgot password?
        </NavLink>
        <CheckboxFlatDesign
          name="rememberMe"
          checked={formik.values.rememberMe}
          onChange={formik.handleChange}
        >
          Remember me
        </CheckboxFlatDesign>
        <ButtonFlatDesign type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          Login
        </ButtonFlatDesign>

        <div className={styles.formBottom}>
          <p>Don&apos;t have an account?</p>
          <NavLink to="/register" style={formik.isSubmitting ? disableNavLink : {}}>
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
};
