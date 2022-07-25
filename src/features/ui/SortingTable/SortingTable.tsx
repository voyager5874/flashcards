import { PropsWithChildren, ReactElement } from 'react';

import styles from './SortingTable.module.scss';

type TableItemActionsPropsType = {
  itemId: string;
  // itemName: string;
  itemActionsNames: string[];
  // itemActionsHandlers: { [key: string]: Function };
  itemActionsHandlers?: Function[];
};

const TableItemActions = ({
  itemId,
  // itemName,
  itemActionsNames,
  itemActionsHandlers,
}: TableItemActionsPropsType) => (
  <>
    {itemActionsNames.map((action, index) => (
      <button
        type="button"
        key={action}
        // @ts-ignore
        // onClick={() => itemActionsHandlers[index](itemId, itemName)}
        onClick={() => itemActionsHandlers[index](itemId)}
      >
        {action}
      </button>
    ))}
  </>
);

type TableHeadPropsType<T> = {
  headers: Array<keyof T>;
};

const TableHead = <T,>({
  headers,
}: PropsWithChildren<TableHeadPropsType<T>>): ReactElement => (
  <>
    {headers.map(header => (
      <th key={header as string}>{header as string}</th>
    ))}
    <th>Actions</th>
  </>
);

type TableRowPropsType<T> = {
  tableHeaders: Array<keyof T>;
  data: T;
  itemActionNames: string[];
  // itemActionsHandlers?: { [key: string]: Function };
  itemActionsHandlers?: Function[];
};

const TableRow = <T extends { _id: string }>({
  tableHeaders,
  data,
  itemActionNames,
  itemActionsHandlers,
}: // ...restProps
PropsWithChildren<TableRowPropsType<T>>): ReactElement => (
  <>
    {tableHeaders.map(header => (
      <td key={header as string}>
        <span className={styles.tdSizeLimiter}>
          {JSON.stringify(data[header as keyof T])}
        </span>
      </td>
    ))}
    <td>
      <TableItemActions
        itemActionsNames={itemActionNames}
        itemActionsHandlers={itemActionsHandlers}
        // eslint-disable-next-line no-underscore-dangle
        itemId={data._id}
        // itemName={data.name ? data.name : ''}
      />
    </td>
  </>
);

type TableBodyPropsType<T> = {
  data: T[];
  tableHeaders: Array<keyof T>;
  itemActionNames: string[];
  // itemActionsHandlers?: { [key: string]: Function };
  itemActionsHandlers?: Function[];
};

const TableBody = <T extends { _id: string }>({
  data,
  tableHeaders,
  itemActionNames,
  itemActionsHandlers,
  ...restProps
}: PropsWithChildren<TableBodyPropsType<T>>): ReactElement => (
  <>
    {data.map(item => (
      // eslint-disable-next-line no-underscore-dangle
      <tr key={item._id}>
        <TableRow
          tableHeaders={tableHeaders}
          data={item}
          itemActionNames={itemActionNames}
          itemActionsHandlers={itemActionsHandlers}
        />
      </tr>
    ))}
  </>
);

type SortingTablePropsType<T> = {
  caption: string;
  tableHeaders: Array<keyof T>;
  itemActionsNames: string[];
  // itemActionsHandlers?: { [key: string]: Function };
  itemActionsHandlers?: Function[];
  items: T[];
};

export const SortingTable = <T extends { _id: string }>({
  items,
  caption,
  tableHeaders,
  itemActionsNames,
  itemActionsHandlers,
  ...restProps
}: PropsWithChildren<SortingTablePropsType<T>>): ReactElement => (
  <table className={styles.table}>
    <caption>{caption}</caption>
    <thead>
      <tr>
        <TableHead headers={tableHeaders} />
      </tr>
    </thead>
    <tbody>
      <TableBody
        data={items}
        tableHeaders={tableHeaders}
        itemActionNames={itemActionsNames}
        itemActionsHandlers={itemActionsHandlers}
      />
    </tbody>
  </table>
);
