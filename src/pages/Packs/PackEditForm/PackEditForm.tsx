import { PropsWithChildren } from 'react';

import { useFormik } from 'formik';

import { CreatePackParameterType, PutPackDataType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { ControlledPromiseType } from 'hooks/useControlledPromise';
import styles from 'pages/Flashcards/Flashcards.module.scss';

type PackEditFormPropsType<T> = {
  promiseToControl: ControlledPromiseType;
  submitCallback: (data: T) => void;
  initialValues: T;
};

export const PackEditForm = <T extends CreatePackParameterType | PutPackDataType>({
  promiseToControl,
  submitCallback,
  initialValues,
}: PropsWithChildren<PackEditFormPropsType<T>>) => {
  // const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      submitCallback(values);
      if (promiseToControl.resolve) promiseToControl.resolve(true);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        placeholder="pack name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <CheckboxFlatDesign
        name="private"
        checked={formik.values.private}
        onChange={formik.handleChange}
      >
        Private
      </CheckboxFlatDesign>
      <div>
        <ButtonFlatDesign className={styles.button} type="submit">
          Save
        </ButtonFlatDesign>
        <ButtonFlatDesign
          onClick={() => promiseToControl.resolve && promiseToControl.resolve(false)}
        >
          Cancel
        </ButtonFlatDesign>
      </div>
    </form>
  );
};
