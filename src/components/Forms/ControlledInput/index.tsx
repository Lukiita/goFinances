import * as React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import { Container, ErrorText } from './styles';

interface Props extends TextInputProps {
  control: Control<any>;
  name: string;
  error?: FieldError;
}

export function ControlledInput(
  {
    control,
    name,
    error,
    ...rest
  }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest} />
        )}
      />

      {error && <ErrorText>{ error.message }</ErrorText>}
    </Container>

  );
}
