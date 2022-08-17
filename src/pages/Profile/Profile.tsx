import { ChangeEvent, useEffect, useId, useState } from 'react';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import defaultAvatar from 'assets/no-avatar.png';
import invalidAvatar from 'assets/wtf.jpg';
import { EditableText } from 'components/EditableText';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from 'pages/Profile/Profile.module.scss';
import { setUpdatedProfileData, uploadAvatar } from 'store/asyncActions/profile';
import { appErrorOccurred } from 'store/reducers/app';
import { formatDate } from 'utils';

export const Profile = () => {
  const id = useId();

  const dispatch = useAppDispatch();

  const profile = useAppSelector(state => state.profile);
  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const [avatar, setAvatar] = useState(profile.avatar || defaultAvatar);

  const onImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(uploadAvatar(event));
  };

  const updateName = (name: string) => {
    dispatch(setUpdatedProfileData({ name }));
  };

  // useEffect(() => {
  //   if (profile.avatar) {
  //     validateImage(profile.avatar).then(res => {
  //       if (!res) {
  //         dispatch(
  //           appErrorOccurred(
  //             'Trying to break it? Huh? You have something other than image in place of your avatar',
  //           ),
  //         );
  //         setAvatar(invalidAvatar);
  //       } else {
  //         setAvatar(profile.avatar!);
  //       }
  //     });
  //   }
  // }, [profile.avatar]);

  useEffect(() => {
    if (!profile.avatar) return;
    setAvatar(profile.avatar);
  }, [profile.avatar]);

  const handleInvalidAvatar = () => {
    dispatch(
      appErrorOccurred('You have something other than image in place of your avatar'),
    );
    setAvatar(invalidAvatar);
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
        <img src={avatar} alt="avatar" onError={handleInvalidAvatar} />
      </div>
    </div>
  );
};
