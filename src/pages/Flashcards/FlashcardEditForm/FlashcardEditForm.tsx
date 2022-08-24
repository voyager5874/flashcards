import { ChangeEvent, PropsWithChildren, useEffect, useId } from 'react';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';

import styles from './FlashcardEditForm.module.scss';

import { CreateFlashcardParameterType, PutFlashcardDataType } from 'api/types';
import { ButtonFlatDesign } from 'components/Button';
import { TextArea } from 'components/TextArea/TextArea';
import { useBase64Picture } from 'hooks';
import { ControlledPromiseType } from 'hooks/useControlledPromise';
// import styles from 'pages/Flashcards/Flashcards.module.scss';

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
  const id = useId();
  const { base64String, setInputEvent, loaderId } = useBase64Picture();
  // const [questionImagePreview, setQuestionImagePreview] = useState(
  //   initialValues.questionImg,
  // );
  // const [answerImagePreview, setAnswerImagePreview] = useState(initialValues.answerImg);

  const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEvent(event);
  };

  useEffect(() => {
    console.log(loaderId);
    if (!base64String) return;
    if (loaderId === 'questionImagePicker') {
      formik.setFieldValue('questionImg', base64String, false);
    }
    if (loaderId === 'answerImagePicker') {
      formik.setFieldValue('answerImg', base64String, false);
    }
  }, [base64String]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="questionImg"
        hidden
        value={formik.values.questionImg}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="answerImg"
        hidden
        value={formik.values.answerImg}
        onChange={formik.handleChange}
      />
      <div>
        <p>
          <div className={styles.questionImage}>
            <label
              htmlFor={`${id}-questionImagePicker`}
              className={styles.questionImageLabel}
            >
              <span>
                Add image <FontAwesomeIcon icon={faArrowUpFromBracket} size="1x" />
              </span>
              <input
                id={`${id}-questionImagePicker`}
                name="questionImagePicker"
                type="file"
                onChange={onImageSelect}
                hidden
              />
            </label>
            <img src={formik.values.questionImg} alt="question" />
          </div>
          <TextArea
            placeholder="question"
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
          />
        </p>
        <p>
          <div className={styles.answerImage}>
            <label
              htmlFor={`${id}-answerImagePicker`}
              className={styles.answerImageLabel}
            >
              <span>
                Add image <FontAwesomeIcon icon={faArrowUpFromBracket} size="1x" />
              </span>
              <input
                id={`${id}-answerImagePicker`}
                name="answerImagePicker"
                type="file"
                onChange={onImageSelect}
                hidden
              />
            </label>
            <img src={formik.values.answerImg} alt="answer" />
          </div>
          <TextArea
            name="answer"
            placeholder="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
          />
        </p>
      </div>
      <div style={{ justifyContent: 'center' }}>
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
