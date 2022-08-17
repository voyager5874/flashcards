import { FC, MouseEvent, PropsWithChildren, ReactElement, useCallback } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from 'components/SortingTable/SortingTable.module.scss';
import { FIRST_ITEM_INDEX, SECOND_ITEM_INDEX } from 'const';

type TableItemActionsPropsType<T> = {
  itemData: T;
  itemActionsNames: string[];
  itemActionsHandlers: Array<(data: T) => void>;
};

const TableItemActions = <T,>({
  itemData,
  itemActionsNames,
  itemActionsHandlers,
}: PropsWithChildren<TableItemActionsPropsType<T>>) => (
  <>
    {itemActionsNames.map((action, index) => (
      <button
        type="button"
        key={action}
        onClick={() => itemActionsHandlers[index](itemData)}
      >
        {action}
      </button>
    ))}
  </>
);

type TableHeadPropsType<T> = {
  sorting: `0${keyof T & string}` | `1${keyof T & string}`;
  changeSorting: Function;
  tableColumns: {
    [Property in keyof T]?: {
      headerName: string;
      // cellDataModifier?: FC<any>;
      cellDataModifier?: FC<{ [Key in Property]: T[Property] }>;
    };
  };
};

const TableHead = <T,>({
  sorting,
  changeSorting,
  tableColumns,
}: PropsWithChildren<TableHeadPropsType<T>>): ReactElement => {
  const reportNewSorting = (event: MouseEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.name) return;
    const requiredSortingField = event.currentTarget.name;
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
  const headers = Object.keys(tableColumns);
  return (
    <>
      {headers.map(header => (
        <th key={header as string}>
          <button
            name={header as string}
            type="button"
            onClick={reportNewSorting}
            className={`${styles.filterButton} ${
              sorting.slice(SECOND_ITEM_INDEX) === (header as string)
                ? styles.activeFilterButton
                : ''
            }`}
          >
            {tableColumns[header as keyof T]?.headerName}
            {determineSortingSign(header as string)}
          </button>
        </th>
      ))}
      <th>Actions</th>
    </>
  );
};

type TableRowPropsType<T> = {
  data: T;
  itemActionNames: string[];
  itemActionsHandlers: Array<(data: T) => void>;
  tableColumns: {
    [Property in keyof T]?: {
      headerName: string;
      // cellDataModifier?: FC<any>;
      cellDataModifier?: FC<{ [Key in Property]: T[Property] }>;
    };
  };
};

const TableRow = <T extends { _id: string }>({
  data,
  itemActionNames,
  itemActionsHandlers,
  tableColumns,
}: PropsWithChildren<TableRowPropsType<T>>): ReactElement => {
  const headers = Object.keys(tableColumns) as Array<keyof T>;

  return (
    <>
      {headers.length
        ? headers.map(header => (
            <td key={header as string}>
              <span className={styles.tdSizeLimiter}>
                {
                  // @ts-ignore
                  tableColumns[header]?.cellDataModifier?.({ [header]: data[header] }) ||
                    String(data[header])
                }
              </span>
            </td>
          ))
        : []}
      <td>
        <TableItemActions
          itemActionsNames={itemActionNames}
          itemActionsHandlers={itemActionsHandlers}
          itemData={data}
        />
      </td>
    </>
  );
};

type TableBodyPropsType<T> = {
  data: T[];
  itemActionNames: string[];
  itemActionsHandlers: Array<(data: T) => void>;
  tableColumns: {
    [Property in keyof T]?: {
      headerName: string;
      // cellDataModifier?: FC<any>;
      cellDataModifier?: FC<{ [Key in Property]: T[Property] }>;
    };
  };
};

const TableBody = <T extends { _id: string }>({
  data,
  itemActionNames,
  itemActionsHandlers,
  tableColumns,
}: PropsWithChildren<TableBodyPropsType<T>>): ReactElement => (
  <>
    {data.map(item => (
      <tr key={item._id}>
        <TableRow
          tableColumns={tableColumns}
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
  tableColumns: {
    [Property in keyof T]?: {
      headerName: string;
      cellDataModifier?: FC<{ [Key in Property]: T[Property] }>;
    };
  };
  sorting: `0${keyof T & string}` | `1${keyof T & string}`;
  changeSorting: (
    sortingFieldName: `0${keyof T & string}` | `1${keyof T & string}`,
  ) => void;
  itemActionsNames: string[];
  itemActionsHandlers: Array<(data: T) => void>;
  items: T[];
};

export const SortingTable = <T extends { _id: string }>({
  items,
  caption,
  tableColumns,
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
          tableColumns={tableColumns}
          changeSorting={changeSorting}
          sorting={sorting}
        />
      </tr>
    </thead>
    <tbody>
      <TableBody
        tableColumns={tableColumns}
        data={items}
        itemActionNames={itemActionsNames}
        itemActionsHandlers={itemActionsHandlers}
      />
    </tbody>
  </table>
);
