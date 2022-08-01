import { PropsWithChildren } from 'react';

import { useFormik } from 'formik';

import { CreateFlashcardParameterType, PutFlashcardDataType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { ControlledPromiseType } from 'hooks/useControlledPromise';
import styles from 'pages/Flashcards/Flashcards.module.scss';

type AddFlashcardFormPropsType<T> = {
  promiseToControl: ControlledPromiseType;
  submitCallback: (data: T) => void;
  initialValues: T;
};

export const FlashcardEditForm = <
  T extends CreateFlashcardParameterType | PutFlashcardDataType,
>({
  promiseToControl,
  submitCallback,
  initialValues,
}: PropsWithChildren<AddFlashcardFormPropsType<T>>) => {
  // const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values, formikHelpers) => {
      submitCallback(values);
      if (promiseToControl.resolve) promiseToControl.resolve(true);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        placeholder="question"
        name="question"
        value={formik.values.question}
        onChange={formik.handleChange}
      />
      <TextInput
        name="answer"
        placeholder="answer"
        value={formik.values.answer}
        onChange={formik.handleChange}
      />
      <ButtonFlatDesign className={styles.button} type="submit">
        Save
      </ButtonFlatDesign>
      <ButtonFlatDesign
        onClick={() => promiseToControl.resolve && promiseToControl.resolve(false)}
      >
        Cancel
      </ButtonFlatDesign>
    </form>
  );
};
