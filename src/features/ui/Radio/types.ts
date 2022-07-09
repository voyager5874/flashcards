import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type RadioPropsType = DefaultRadioPropsType & {
  options?: string[] | number[];
  onChangeOption?: (option: any) => void;
  // children?: ReactElement[];
  buttonText?: string;
};
