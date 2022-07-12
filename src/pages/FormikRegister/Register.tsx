import { useEffect } from 'react';

import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from 'pages/Register/Register.module.scss';
import { register } from 'store/asyncActions/register';
import { validationSchema } from 'utils';

type SignUpFormInitialValuesType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userIsLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    if (userIsLoggedIn) {
      navigate('../packs', { replace: true });
    }
  }, [userIsLoggedIn]);

  const initialValues: SignUpFormInitialValuesType = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(register(values, navigate));
      setSubmitting(false);
    },
  });
  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign Up</h1>
        <TextInput
          placeholder="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        />
        <TextInput
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
          placeholder="confirm password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ''
          }
        />
        <ButtonFlatDesign type="submit">Sign up</ButtonFlatDesign>
        <NavLink to="/login">Sign in</NavLink>
      </form>
    </div>
  );
};
