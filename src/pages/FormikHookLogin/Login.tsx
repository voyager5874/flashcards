import { ReactElement, useEffect } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { LoginParameterType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useAppSelector } from 'hooks';
import { login } from 'store/asyncActions/login';
import { validationSchema } from 'utils';

// type FormValuesType = {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// };

const initialValues: LoginParameterType = {
  email: process.env.REACT_APP_MY_EMAIL || 'test@test.ru',
  password: process.env.REACT_APP_PASSWORD || 'test@test.ru',
  rememberMe: false,
};

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ email, password, rememberMe }: LoginParameterType) => {
      dispatch(
        login({
          email,
          password,
          rememberMe,
        }),
      );
    },
  });
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) return;
    navigate('../packs', { replace: true });
  }, [isLoggedIn]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign in</h1>
        <TextInput
          name="email"
          placeholder="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        />
        <TextInput
          name="password"
          placeholder="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''
          }
        />

        <NavLink to="/password-reset" style={{ alignSelf: 'left' }}>
          Forgot password?
        </NavLink>
        <CheckboxFlatDesign
          name="rememberMe"
          checked={formik.values.rememberMe}
          onChange={formik.handleChange}
        >
          Remember me
        </CheckboxFlatDesign>
        <ButtonFlatDesign type="submit">Login</ButtonFlatDesign>

        <div className={styles.formBottom}>
          <p>Don&apos;t have an account?</p>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
};
