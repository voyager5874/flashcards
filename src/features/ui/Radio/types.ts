import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type RadioPropsType = DefaultRadioPropsType & {
  options?: string[];
  onChangeOption?: (option: string) => void;
  // children?: ReactNode;
  buttonText?: string;
};
