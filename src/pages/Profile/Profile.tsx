import { ChangeEvent, useId, useState } from 'react';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import defaultAvatar from 'assets/no-avatar.png';
import invalidAvatar from 'assets/wtf.jpg';
import { EditableText } from 'features/ui/EditableText';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from 'pages/Profile/Profile.module.scss';
import { setUpdatedProfileData, uploadAvatar } from 'store/asyncActions/profile';
import { formatDate, validateImage } from 'utils';

export const Profile = () => {
  const id = useId();
  const [avatarValid, setAvatarValid] = useState(true);
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);
  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const onImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(uploadAvatar(event));
  };

  const updateName = (name: string) => {
    dispatch(setUpdatedProfileData({ name }));
  };

  if (profile.avatar)
    validateImage(profile.avatar).then(res => {
      if (avatarValid !== res) setAvatarValid(res);
    });

  const chooseAvatar = () => {
    if (!profile.avatar || profile.avatar === ' ') return defaultAvatar;
    if (!avatarValid) return invalidAvatar;
    return profile.avatar;
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
        {/* <img src={avatarValid ? profile.avatar : defaultAvatar} alt="avatar" /> */}
        <img src={chooseAvatar()} alt="avatar" />
      </div>
    </div>
  );
};
