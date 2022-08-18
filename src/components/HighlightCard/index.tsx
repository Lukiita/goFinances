import React from 'react';

import {
  Amount,
  Container,
  Content,
  Header,
  Icon,
  LastTransaction,
  Title
} from './style';

export interface Props {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighLightCard(
  {
    type,
    title,
    amount,
    lastTransaction
  }: Props
) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type}></Icon>
      </Header>

      <Content>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Content>

    </Container>
  );
}