import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { ControlledInput } from '../../components/Forms/ControlledInput';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Header } from '../../components/Header';
import { Category, CategorySelect } from '../CategorySelect';
import { Container, Fields, Form, TransactionTypes } from './styles';
interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório')
});

const CATEGORY: Category = {
  key: 'category',
  name: 'Categoria',
  icon: 'any'
}

export function Register() {
  const [category, setCategory] = useState(CATEGORY);
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Atenção', 'Selecione o tipo da transação');

    if (category.key === CATEGORY.key)
      return Alert.alert('Atenção', 'Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(form);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>

        <Header title="Nova transação" />

        <Form>
          <Fields>
            <ControlledInput
              name="name"
              control={control}
              placeholder='Nome'
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name}
            />

            <ControlledInput
              name="amount"
              control={control}
              placeholder='Valor'
              keyboardType="numeric"
              error={errors.amount}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type="down"
                title="Saída"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}
