import { FC, ReactElement } from 'react';

import styles from './SortingTable.module.scss';

import { PackInAppType } from 'features/Pack/types';

type TableItemActionsPropsType = {
  itemActions: string[];
};

const TableItemActions = ({ itemActions }: TableItemActionsPropsType) => (
  <>
    {itemActions.map((action, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <button type="button" key={index}>
        {action}
      </button>
    ))}
  </>
);

type TableHeaderPropsType = {
  headers: string[];
};

const TableHead = ({ headers }: TableHeaderPropsType): ReactElement => (
  <>
    {headers.map(header => (
      <th key={header}>{header}</th>
    ))}
  </>
);

type TableBodyPropsType = {
  data: string[];
};

const TableBody = ({ data }: TableBodyPropsType): ReactElement => (
  <>
    {data.map(prop => (
      <th key={prop}>{prop}</th>
    ))}
  </>
);

type PropsType = {
  caption: string;
  tableHeaders: string[];
  itemActions: string[];
  items: PackInAppType[];
};

export const SortingTable: FC<PropsType> = ({
  items,
  caption,
  tableHeaders,
  itemActions,
}): ReactElement => (
  <table className={styles.table}>
    <caption>{caption}</caption>
    <thead>
      <tr>
        <TableHead headers={tableHeaders} />
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        // eslint-disable-next-line no-underscore-dangle
        <tr key={item._id}>
          <td>
            <span className={styles.tdSizeLimiter}>{item.name}</span>
          </td>
          <td>{item.cardsCount}</td>
          <td>{item.updated}</td>
          <td>
            <span className={styles.tdSizeLimiter}>{item.user_name}</span>
          </td>
          <td>
            <TableItemActions itemActions={itemActions} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
