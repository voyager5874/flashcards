import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type RadioPropsType = DefaultRadioPropsType & {
  options?: string[];
  onChangeOption?: (option: any) => void;
};
