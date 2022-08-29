import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { ControlledInput } from '../../components/Forms/ControlledInput';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Header } from '../../components/Header';
import { STORAGE_KEYS } from '../../helpers/storage-keys.helper';
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
    reset,
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

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Atenção', 'Selecione o tipo da transação');

    if (category.key === CATEGORY.key)
      return Alert.alert('Atenção', 'Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.transactions);
      const currentData: any[] = data ? JSON.parse(data) : [];
      currentData.push(newTransaction);
      await AsyncStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(currentData));
      
      reset();
      setTransactionType('');
      setCategory(CATEGORY);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao cadastrar transação. Por favor tente novamente.');
    }
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
