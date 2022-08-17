import { FC, ReactElement, useState, KeyboardEvent, ChangeEvent } from 'react';

import styles from 'components/EditableText/EditableText.module.scss';

type EditableTextPropsType = {
  text: string;
  onFinishEdit: (updatedText: string) => void;
  disabled?: boolean;
  textStyle?: string;
};

export const EditableText: FC<EditableTextPropsType> = ({
  text,
  onFinishEdit,
  disabled = false,
  textStyle = '',
}): ReactElement => {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(text);

  const enterEditMode = () => {
    if (disabled) return;
    setNewText(text);
    setEditMode(true);
  };
  const handleUpdatingText = () => {
    setEditMode(false);
    if (newText && newText !== text) {
      onFinishEdit(newText);
    }
  };

  const handleEditText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewText(event.currentTarget.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleUpdatingText();
    }
  };

  return (
    <div className={styles.wrapper}>
      {editMode ? (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          value={newText}
          onChange={handleEditText}
          onBlur={handleUpdatingText}
          onKeyPress={handleEnterPress}
          className={textStyle}
        />
      ) : (
        <span className={textStyle} onDoubleClick={enterEditMode}>
          {text}
        </span>
      )}
    </div>
  );
};
