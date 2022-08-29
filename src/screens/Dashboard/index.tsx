import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { format, max, min } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { HighLightCard } from '../../components/HighlightCard';
import { Transaction, TransactionCard } from '../../components/TransactionCard';
import { STORAGE_KEYS } from '../../helpers/storage-keys.helper';
import { Container, Header, HighLightCards, Icon, Loader, LoaderContainer, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';

export interface TransactionListProps extends Transaction {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastDate: string;
}

interface HighLightData {
  entries: HighLightProps;
  costs: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  function getLastTransactionFormattedDate(transactions: TransactionListProps[], type: 'up' | 'down'): string {
    const transactionsDates = transactions
      .filter(transaction => transaction.transactionType === type)
      .map(transaction => new Date(transaction.date));

    return format(max(transactionsDates), "dd 'de' MMMM");
  }

  async function loadTransactions() {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.transactions);
    const transactions: TransactionListProps[] = data ? JSON.parse(data) : [];

    let entriesTotal = 0;
    let costsTotal = 0;

    const formattedTransactions: TransactionListProps[] = transactions
      .map(transaction => {
        const amount = Number(transaction.amount);

        if (transaction.transactionType === 'up') {
          entriesTotal += amount;
        } else {
          costsTotal += amount;
        }

        const formattedAmount = amount
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          amount: formattedAmount,
          date
        }
      });

    setTransactions(formattedTransactions);
    
    const lastEntryTransactionDate = getLastTransactionFormattedDate(transactions, 'up');
    const lastConstTransactionDate =  getLastTransactionFormattedDate(transactions, 'down');

    const allTransactionsDates = transactions.map(transaction => new Date(transaction.date));
    const [firstDate, lastDate] = [min(allTransactionsDates), max(allTransactionsDates)];

    const total = entriesTotal - costsTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
        lastDate: `Última entrada dia ${lastEntryTransactionDate}`
      },
      costs: {
        amount: costsTotal
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
        lastDate: `Última saída dia ${lastConstTransactionDate}`
      },
      total: {
        amount: total
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
        lastDate: `${format(firstDate, "dd 'de' MMMM")} à ${format(lastDate, "dd 'de' MMMM")}`
      }
    });
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>
      {
        isLoading ?
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{ uri: 'https://avatars.githubusercontent.com/u/11157950?v=4' }}
                  />
                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Lucas</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={() => { }}>

                  <Icon name='power' />
                </LogoutButton>
              </UserWrapper>

            </Header>

            <HighLightCards>
              <HighLightCard
                type="up"
                title="Entradas"
                amount={highLightData.entries.amount}
                lastTransaction={highLightData.entries.lastDate}
              />
              <HighLightCard
                type="down"
                title="Saídas"
                amount={highLightData.costs.amount}
                lastTransaction={highLightData.costs.lastDate}
              />
              <HighLightCard
                type="total"
                title="Total"
                amount={highLightData.total.amount}
                lastTransaction={highLightData.total.lastDate}
              />

            </HighLightCards>

            <Transactions>
              <Title>Últimas Transações</Title>

              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
              />
            </Transactions>
          </>
      }

    </Container>


  )
}