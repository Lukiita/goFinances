import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title } from './styles';

export function Dashboard() {
  return (
    <Container style={styles.container}>
      <Title>Dashboard</Title>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});