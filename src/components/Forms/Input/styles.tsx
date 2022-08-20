import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.text
}))`
  width: 100%;
  padding: 16px 18px;
  margin-bottom: 8px;
  border-radius: 5px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.shape};
`;