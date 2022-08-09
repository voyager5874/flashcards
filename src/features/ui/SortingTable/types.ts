import { ReactNode } from 'react';

export type TableCellType<T> = {
  [Property in keyof T]?: {
    headerName: string;
    cellDataModifier?: (param: string | number) => string | ReactNode;
  };
};
