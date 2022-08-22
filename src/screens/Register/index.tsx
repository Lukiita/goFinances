import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
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
    handleSubmit
  } = useForm();

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
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data);
  }

  return (
    <Container>
      <Header title="Nova transação" />

      <Form>
        <Fields>
          <ControlledInput
            name="name"
            control={control}
            placeholder='Nome'
          />

          <ControlledInput
            name="amount"
            control={control}
            placeholder='Valor'
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

  );
}
