import { ChangeEvent, useId } from 'react';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import defaultAvatar from 'assets/no-avatar.png';
import { EditableText } from 'features/ui/EditableText';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from 'pages/Profile/Profile.module.scss';
import { setUpdatedProfileData } from 'store/asyncActions/profile';
import { appErrorOccurred } from 'store/reducers/app';
import { formatDate, toBase64 } from 'utils';

export const Profile = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);
  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const onImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await toBase64(event);
      if (response) dispatch(setUpdatedProfileData({ avatar: response }));
    } catch {
      appErrorOccurred('conversion to base 64 failed');
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
