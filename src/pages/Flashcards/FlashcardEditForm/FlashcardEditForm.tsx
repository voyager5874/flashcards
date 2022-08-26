import { ChangeEvent, PropsWithChildren, useEffect, useId, useState } from 'react';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';

import styles from './FlashcardEditForm.module.scss';

import { CreateFlashcardParameterType, PutFlashcardDataType } from 'api/types';
import defaultImage from 'assets/image-not-yet-choosen.png';
import { ButtonFlatDesign } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { TextArea } from 'components/TextArea/TextArea';
import { useBase64Picture } from 'hooks';
import { ControlledPromiseType } from 'hooks/useControlledPromise';

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
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      submitCallback(values);
      if (promiseToControl.resolve) promiseToControl.resolve(true);
    },
  });
  const id = useId();

  const { base64String, setInputEvent, loaderId } = useBase64Picture();

  const [questionWithImage, setQuestionWithImage] = useState(
    Boolean(formik.values.questionImg),
  );

  const [answerWithImage, setAnswerWithImage] = useState(
    Boolean(formik.values.answerImg),
  );

  const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEvent(event);
  };

  const toggleQuestionWithImage = () => {
    if (formik.initialValues.questionImg) return;
    formik.setFieldValue('questionImg', '', false);
    setQuestionWithImage(prev => !prev);
  };

  const toggleAnswerWithImage = () => {
    if (formik.initialValues.answerImg) return;
    formik.setFieldValue('answerImg', '', false);
    setAnswerWithImage(prev => !prev);
  };

  useEffect(() => {
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
      <div className={styles.cardContent}>
        <div className={styles.cardHalf}>
          <div className={styles.cardText}>
            <Checkbox checked={questionWithImage} onChange={toggleQuestionWithImage}>
              add image
            </Checkbox>
            <TextArea
              placeholder="question"
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
            />
          </div>

          {questionWithImage && (
            <div className={styles.cardImage}>
              <label
                htmlFor={`${id}-questionImagePicker`}
                className={styles.chooseCardImagePopup}
              >
                <span>
                  choose image <FontAwesomeIcon icon={faArrowUpFromBracket} size="1x" />
                </span>
                <input
                  id={`${id}-questionImagePicker`}
                  name="questionImagePicker"
                  type="file"
                  onChange={onImageSelect}
                  hidden
                  accept="image/*"
                />
              </label>
              <img src={formik.values.questionImg || defaultImage} alt="question" />
            </div>
          )}
        </div>

        <div className={styles.cardHalf}>
          <div className={styles.cardText}>
            <Checkbox checked={answerWithImage} onChange={toggleAnswerWithImage}>
              add image
            </Checkbox>
            <TextArea
              placeholder="answer"
              name="answer"
              value={formik.values.answer}
              onChange={formik.handleChange}
            />
          </div>

          {answerWithImage && (
            <div className={styles.cardImage}>
              <label
                htmlFor={`${id}-answerImagePicker`}
                className={styles.chooseCardImagePopup}
              >
                <span>
                  choose image <FontAwesomeIcon icon={faArrowUpFromBracket} size="1x" />
                </span>
                <input
                  id={`${id}-answerImagePicker`}
                  name="answerImagePicker"
                  type="file"
                  onChange={onImageSelect}
                  hidden
                  accept="image/*"
                />
              </label>
              <img src={formik.values.answerImg || defaultImage} alt="answer" />
            </div>
          )}
        </div>
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
