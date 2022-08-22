import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Header } from '../../components/Header';
import { Category, CategorySelect } from '../CategorySelect';
import { Container, Fields, Form, TransactionTypes } from './styles';

const CATEGORY: Category = {
  key: 'category',
  name: 'Categoria',
  icon: 'any'
}

export function Register() {
  const [category, setCategory] = useState(CATEGORY);
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  return (
    <Container>
      <Header title="Nova transação" />
      
      <Form>
        <Fields>
          <Input
            placeholder='Nome'
          />

          <Input
            placeholder='Preço'
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

        <Button title="Enviar"></Button>
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
