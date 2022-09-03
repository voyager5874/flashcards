import { ReactNode } from 'react';

export type DropdownMenuPropsType = {
  expandOnHover?: boolean;
  compact?: boolean;
  width: number;
  placeholder: string;
  children: ReactNode;
};
