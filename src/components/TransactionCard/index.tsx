import React from 'react';
import { categories } from '../../utils/categories';
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title
} from './style';

export interface Transaction {
  transactionType: 'up' | 'down',
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: Props) {
  const category = categories.find(category => category.key === transaction.category);

  return (
    <Container>
      <Title>
        {transaction.name}
      </Title>

      <Amount type={transaction.transactionType}>
        { transaction.transactionType === 'down' && '- ' }
        { transaction.amount }
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
}