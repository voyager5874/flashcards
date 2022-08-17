import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type CheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
  slider?: boolean;
};
