import { ReactElement, useEffect } from 'react';

import { Form, Formik, useFormikContext } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { FormikTextInput } from './FormikTextInput';
import styles from './Login.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FormikCheckbox } from 'pages/FormikComponentLogin/FormikCheckbox';
import { login } from 'store/asyncActions/login';
import { validationSchema } from 'utils';

type FormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialValues = {
  email: process.env.REACT_APP_MY_EMAIL || 'test@test.ru',
  password: process.env.REACT_APP_PASSWORD || 'test@test.ru',
  rememberMe: false,
};

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    navigate('../packs', { replace: true });
  }, [isLoggedIn]);

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ email, password, rememberMe }: FormValuesType) => {
          dispatch(
            login({
              email,
              password,
              rememberMe,
            }),
          );
        }}
      >
        <Form>
          <h1>Sign in</h1>
          <FormikTextInput name="email" />
          <FormikTextInput name="password" />

          <NavLink to="/password-forgotten" style={{ alignSelf: 'left' }}>
            Forgot password?
          </NavLink>
          <FormikCheckbox name="rememberMe">Remember me</FormikCheckbox>
          <ButtonFlatDesign type="submit" disabled={useFormikContext().isSubmitting}>
            Login
          </ButtonFlatDesign>

          <div className={styles.formBottom}>
            <p>Don&apos;t have an account?</p>
            <NavLink to="/register">Sign Up</NavLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
