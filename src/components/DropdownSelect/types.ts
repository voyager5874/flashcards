import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type DropdownSelectPropsType = DefaultRadioPropsType & {
  options?: string[];
  compact?: boolean;
  onChangeOption?: (option: string) => void;
  children: ReactNode;
  buttonText?: string;
  name: string;
};
