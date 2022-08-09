import { MouseEvent, PropsWithChildren, ReactElement, useCallback } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SortingTable.module.scss';

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
  tableCells: {
    [Property in keyof T]?: { headerName: string; cellDataModifier?: Function };
  };
};

const TableHead = <T,>({
  sorting,
  changeSorting,
  tableCells,
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
  // <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />;
  const headers = Object.keys(tableCells);
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
            {tableCells[header as keyof T]?.headerName}
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
  tableCells: {
    [Property in keyof T]?: { headerName: string; cellDataModifier?: Function };
  };
};

const TableRow = <T extends { _id: string }>({
  data,
  itemActionNames,
  itemActionsHandlers,
  tableCells,
}: PropsWithChildren<TableRowPropsType<T>>): ReactElement => {
  const headers = Object.keys(tableCells);

  return (
    <>
      {headers.length
        ? headers.map(header => (
            <td key={header as string}>
              <span className={styles.tdSizeLimiter}>
                {tableCells[header as keyof T]?.cellDataModifier?.(
                  data[header as keyof T],
                ) || String(data[header as keyof T])}
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
  tableCells: {
    [Property in keyof T]?: { headerName: string; cellDataModifier?: Function };
  };
};

const TableBody = <T extends { _id: string }>({
  data,
  itemActionNames,
  itemActionsHandlers,
  tableCells,
}: PropsWithChildren<TableBodyPropsType<T>>): ReactElement => (
  <>
    {data.map(item => (
      <tr key={item._id}>
        <TableRow
          tableCells={tableCells}
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
  tableCells: {
    [Property in keyof T]?: { headerName: string; cellDataModifier?: Function };
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
  tableCells,
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
          tableCells={tableCells}
          changeSorting={changeSorting}
          sorting={sorting}
        />
      </tr>
    </thead>
    <tbody>
      <TableBody
        tableCells={tableCells}
        data={items}
        itemActionNames={itemActionsNames}
        itemActionsHandlers={itemActionsHandlers}
      />
    </tbody>
  </table>
);
