import { ReactElement, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useAppSelector } from 'hooks';
import { login } from 'store/asyncActions/login';
import { createValidationSchema } from 'utils/formsValidationSchema';

const initialValues = {
  email: process.env.REACT_APP_EMAIL || '',
  password: process.env.REACT_APP_PASSWORD || '',
  confirmPassword: '',
  rememberMe: false,
};

const validationSchema = createValidationSchema({
  email: initialValues.email,
  password: initialValues.password,
});

export const Login = (): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ email, password, rememberMe }, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(login({ email, password, rememberMe })).then(res => setSubmitting(false));
    },
  });

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    navigate('../packs', { replace: true });
  }, [isLoggedIn]);

  return (
    <div className={styles.wrapper}>
      <form>
        <h1>Sign in</h1>
        <TextInput
          name="email"
          value={formik.values.email}
          placeholder="login"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        />
        <TextInput
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''
          }
        />

        <NavLink to="/password-forgotten" style={{ alignSelf: 'left' }}>
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
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
};
