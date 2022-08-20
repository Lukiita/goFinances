import React from 'react';
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

interface Category {
  name: string;
  icon: string;
}

export interface Transaction {
  type: 'positive' | 'negative',
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: Props) {
  return (
    <Container>
      <Title>
        {transaction.title}
      </Title>

      <Amount type={transaction.type}>
        { transaction.type === 'negative' && '- ' }
        { transaction.amount }
      </Amount>

      <Footer>
        <Category>
          <Icon name={transaction.category.icon} />
          <CategoryName>{transaction.category.name}</CategoryName>
        </Category>
        <Date>{transaction.date}</Date>
      </Footer>
    </Container>
  );
}