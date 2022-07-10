import defaultAvatar from 'assets/no-avatar.png';
import { useAppSelector } from 'hooks';
import styles from 'pages/Profile/Profile.module.scss';
import { formatDateString } from 'utils';

export const Profile = () => {
  const profile = useAppSelector(state => state.profile);
  return (
    <div className={styles.wrapper}>
      <h1>Profile</h1>
      <div>{profile.name}</div>
      <div>
        <span>Registered </span>
        {profile.created && formatDateString(profile.created).date}
      </div>
      <div>
        <span>Public packs </span>
        {profile.publicCardPacksCount}
      </div>
      <img src={profile.avatar || defaultAvatar} alt="avatar" />
    </div>
  );
};
