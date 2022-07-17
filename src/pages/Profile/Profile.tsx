import { ChangeEvent, useId } from 'react';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import defaultAvatar from 'assets/no-avatar.png';
import { FIRST_ITEM_INDEX } from 'const';
import { EditableText } from 'features/ui/EditableText';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from 'pages/Profile/Profile.module.scss';
import { setUpdatedProfileData } from 'store/asyncActions/profile';
import { formatDate } from 'utils';

export const Profile = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);
  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // eslint-disable-next-line no-debugger
      debugger;
      const formData = new FormData();
      const reader = new FileReader();
      let base64String = '';
      const avatar = event.target.files[FIRST_ITEM_INDEX];
      formData.append('avatar', avatar);
      reader.readAsDataURL(avatar);
      reader.onloadend = () => {
        if (reader.result) {
          base64String = reader.result as string;
          dispatch(setUpdatedProfileData({ avatar: base64String }));
        }
      };
    }
  };

  const updateName = (name: string) => {
    dispatch(setUpdatedProfileData({ name }));
  };

  return (
    <div className={styles.wrapper}>
      <h1>
        <EditableText
          text={profile.name || ''}
          onFinishEdit={updateName}
          disabled={appIsBusy}
          textStyle={styles.userName}
        />
      </h1>
      <p>
        <span>Registered: </span>
        {profile.created && formatDate(profile.created).date}
      </p>
      <p>
        <span>Signed in till: </span>
        {profile.tokenDeathTime && formatDate(profile.tokenDeathTime).date}
      </p>
      <p>
        <span>Public packs: </span>
        {profile.publicCardPacksCount}
      </p>
      <div className={styles.avatar}>
        <label htmlFor={id} className={styles.avatarChangePopup}>
          <span>
            Change avatar <FontAwesomeIcon icon={faArrowUpFromBracket} size="1x" />
          </span>
          <input id={id} type="file" onChange={onImageSelect} hidden />
        </label>
        <img src={profile.avatar || defaultAvatar} alt="avatar" />
      </div>
    </div>
  );
};
