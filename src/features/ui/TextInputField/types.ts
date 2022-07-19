import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextInputPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  type?: 'text' | 'password';
  controlElementIcon?: ReactElement;
  controlElementAction?: Function;
};
