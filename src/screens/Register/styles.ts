import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
  
  flex: 1;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 8px 0 16px 0;
`;