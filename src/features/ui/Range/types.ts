import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type SuperRangePropsType = DefaultInputPropsType & {
  onChangeRange?: (value: number) => void;
  max: number;
  min?: number;
};
