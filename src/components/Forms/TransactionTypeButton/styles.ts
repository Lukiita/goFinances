import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface TransactionProps {
  type: 'up' | 'down';
  isActive: boolean;
}

export const Container = styled.View<TransactionProps>`
  width: 48%;

  border: 1.5px solid ${({ theme }) => theme.colors.border_color};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && type === 'up' && css`
    border: none;
    background-color: ${({ theme }) => theme.colors.success_light};
  `}

  ${({ isActive, type }) => isActive && type === 'down' && css`
    border: none;
    background-color: ${({ theme }) => theme.colors.attention_light};
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px; 
`;

export const Icon = styled(Feather) <TransactionProps>`
    font-size: ${RFValue(24)}px; 
    margin-right: 12px;

    color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px; 
`;