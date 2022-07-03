import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type RadioPropsType = DefaultRadioPropsType & {
  options?: string[];
  onChangeOption?: (option: any) => void;
  // children?: ReactElement[];
  buttonText?: string;
};
