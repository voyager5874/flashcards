import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type DefaultTextAreaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type TextAreaPropsType = DefaultTextAreaPropsType & {
  onChangeText?: (value: string) => void;
  error?: string;
  onEnter?: () => void;
  autoHeight?: boolean;
  resizeable?: 'none' | 'vertical' | 'horizontal' | 'both';
};
