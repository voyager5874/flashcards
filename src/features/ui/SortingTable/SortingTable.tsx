import { FC, ReactElement } from 'react';

import styles from './SortingTable.module.scss';

import { PackInAppType } from 'features/Pack/types';

type PropsType = {
  caption: string;
  itemActions: string[];
  items: PackInAppType[];
};

export const SortingTable: FC<PropsType> = ({
  items,
  caption,
  itemActions,
}): ReactElement => {
  const actions = () => (
    <>
      {itemActions.map((action, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <button type="button" key={index}>
          {action}
        </button>
      ))}
    </>
  );
  return (
    <table className={styles.table}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cards</th>
          <th>Last updated</th>
          <th>Created by</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          // eslint-disable-next-line no-underscore-dangle
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.cardsCount}</td>
            <td>{item.updated}</td>
            <td>{item.user_name}</td>
            <td>{actions()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
