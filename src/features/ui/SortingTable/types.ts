import { ReactNode } from 'react';

export type TableColumnModifierType<T extends {}> = {
  [Property in keyof T]?: {
    headerName: string;
    cellDataModifier?: (param: T[keyof T]) => string | ReactNode;
  };
};
