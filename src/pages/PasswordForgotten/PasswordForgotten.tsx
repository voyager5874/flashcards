import { FormikHelpers, useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch } from 'hooks';
import styles from 'pages/PasswordForgotten/PasswordForgotten.module.scss';
import { startPasswordRecovery } from 'store/asyncActions/password';
import { validationSchema } from 'utils';
import { createValidationSchema } from 'utils/formsValidationSchema';

type FormInitialValuesType = {
  email: string;
  // how to write universal validationSchema?
  // password: string;
  // confirmPassword: string;
};

const initialValues: FormInitialValuesType = {
  email: '',
  // password: 'validPass775',
  // confirmPassword: 'validPass775',
};

export const PasswordForgotten = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: createValidationSchema(Object.keys(initialValues)),
    validateOnChange: false,
    onSubmit: (values, formikHelpers) =>
      // { setSubmitting }: FormikHelpers<FormInitialValuesType>,
      {
        // eslint-disable-next-line no-debugger
        debugger;
        dispatch(
          startPasswordRecovery(values.email, navigate, formikHelpers.setSubmitting),
        );
      },
  });

  const checkData = () => {
    console.log(formik.errors);
  };

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
        <p>Enter your password and we will send you further instructions</p>

        <ButtonFlatDesign
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          onClick={checkData}
        >
          Send instructions
        </ButtonFlatDesign>

        <NavLink to="/login">Try logging in</NavLink>
      </form>
    </div>
  );
};
