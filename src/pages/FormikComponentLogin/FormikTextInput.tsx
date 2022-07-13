import { FieldHookConfig, useField } from 'formik';

import { TextInput } from 'features/ui/flat-design';
import { TextInputPropsType } from 'features/ui/TextInputField/types';

export const FormikTextInput = ({
  ...props
}: FieldHookConfig<string> & TextInputPropsType) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const fieldError = meta.touched && meta.error ? meta.error : '';
  return <TextInput {...field} {...props} error={fieldError} />;
};
