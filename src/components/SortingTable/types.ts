import { FC, ReactNode } from 'react';

export type TableColumnModifierType<T extends {}> = {
  [Property in keyof T]?: {
    headerName: string;
    // cellDataModifier?: ((param: T[Property]) => string | ReactNode) | FC<any>;
    // cellDataModifier?: FC<{ param: T[Property] }>;
    cellDataModifier?: FC<{ [Key in Property]: T[Property] }>;
  };
};
