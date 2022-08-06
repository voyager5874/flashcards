import { MouseEvent, PropsWithChildren, ReactElement, useCallback } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SortingTable.module.scss';

import { FIRST_ITEM_INDEX, SECOND_ITEM_INDEX } from 'const';

type TableItemActionsPropsType<T> = {
  // itemId: string;
  itemData: T;
  itemActionsNames: string[];
  // itemActionsHandlers?: Function[];
  itemActionsHandlers?: Array<(data: T) => void>;
};

const TableItemActions = <T,>({
  // itemId,
  itemData,
  itemActionsNames,
  itemActionsHandlers,
}: PropsWithChildren<TableItemActionsPropsType<T>>) => (
  <>
    {itemActionsNames.map((action, index) => (
      <button
        type="button"
        key={action}
        // @ts-ignore
        // onClick={() => itemActionsHandlers[index](itemId)}
        onClick={() => itemActionsHandlers[index](itemData)}
      >
        {action}
      </button>
    ))}
  </>
);

type TableHeadPropsType<T> = {
  headers: Array<keyof T>; // Extract<keyof T, string>
  sorting: `0${keyof T & string}` | `1${keyof T & string}`;
  changeSorting: Function;
};

const TableHead = <T,>({
  headers,
  sorting,
  changeSorting,
}: PropsWithChildren<TableHeadPropsType<T>>): ReactElement => {
  const reportNewSorting = (event: MouseEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.textContent) return;
    const requiredSortingField = event.currentTarget.textContent;
    let newSortingOption: typeof sorting;
    if (sorting.slice(SECOND_ITEM_INDEX) === requiredSortingField) {
      newSortingOption =
        sorting[FIRST_ITEM_INDEX] === '0'
          ? (`1${requiredSortingField}` as typeof sorting)
          : (`0${requiredSortingField}` as typeof sorting);
    } else {
      newSortingOption = `0${requiredSortingField}` as typeof sorting;
    }
    changeSorting(newSortingOption);
  };

  const determineSortingSign = useCallback(
    (header: string) => {
      if (sorting.slice(SECOND_ITEM_INDEX) === (header as string)) {
        if (sorting[FIRST_ITEM_INDEX] === '0')
          return <FontAwesomeIcon icon={faChevronDown} />;
        if (sorting[FIRST_ITEM_INDEX] === '1')
          return <FontAwesomeIcon icon={faChevronUp} />;
      }
      return <span />;
    },
    [sorting],
  );
  // <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />;

  return (
    <>
      {headers.map(header => (
        <th key={header as string}>
          <button
            type="button"
            onClick={reportNewSorting}
            className={`${styles.filterButton} ${
              sorting.slice(SECOND_ITEM_INDEX) === (header as string)
                ? styles.activeFilterButton
                : ''
            }`}
          >
            {header as string}
            {determineSortingSign(header as string)}
          </button>
        </th>
      ))}
      <th>Actions</th>
    </>
  );
};

type TableRowPropsType<T> = {
  tableHeaders: Array<keyof T>;
  data: T;
  itemActionNames: string[];
  // itemActionsHandlers?: { [key: string]: Function };
  // itemActionsHandlers?: Function[];
  itemActionsHandlers?: Array<(data: T) => void>;
};

const TableRow = <T extends { _id: string }>({
  tableHeaders,
  data,
  itemActionNames,
  itemActionsHandlers,
}: PropsWithChildren<TableRowPropsType<T>>): ReactElement => (
  <>
    {tableHeaders.map(header => (
      <td key={header as string}>
        <span className={styles.tdSizeLimiter}>
          {/* {JSON.stringify(data[header as keyof T])} */}
          {String(data[header as keyof T])}
        </span>
      </td>
    ))}
    <td>
      <TableItemActions
        itemActionsNames={itemActionNames}
        itemActionsHandlers={itemActionsHandlers}
        // itemId={data._id}
        itemData={data}
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
  // itemActionsHandlers?: Function[];
  itemActionsHandlers?: Array<(data: T) => void>;
};

const TableBody = <T extends { _id: string }>({
  data,
  tableHeaders,
  itemActionNames,
  itemActionsHandlers,
}: PropsWithChildren<TableBodyPropsType<T>>): ReactElement => (
  <>
    {data.map(item => (
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
  tableHeaders: Array<keyof T>; // Extract<keyof T, string>
  sorting: `0${keyof T & string}` | `1${keyof T & string}`;
  changeSorting: (
    sortingFieldName: `0${keyof T & string}` | `1${keyof T & string}`,
  ) => void;
  itemActionsNames: string[];
  // itemActionsHandlers?: { [key: string]: Function };
  // itemActionsHandlers?: Function[];
  itemActionsHandlers?: Array<(data: T) => void>;
  items: T[];
};

export const SortingTable = <T extends { _id: string }>({
  items,
  caption,
  tableHeaders,
  sorting,
  changeSorting,
  itemActionsNames,
  itemActionsHandlers,
}: PropsWithChildren<SortingTablePropsType<T>>): ReactElement => (
  <table className={styles.table}>
    <caption>{caption}</caption>
    <thead>
      <tr>
        <TableHead
          headers={tableHeaders}
          changeSorting={changeSorting}
          sorting={sorting}
        />
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
