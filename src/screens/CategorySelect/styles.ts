import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Category } from '.';
import theme from '../../global/styles/theme';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CategoryList = styled(
  FlatList as new (props: FlatListProps<Category>) => FlatList<Category>
)``;

export const CategoryItem = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive }) => isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const CategoryIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;

  color: ${({ theme }) => theme.colors.title};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border_color};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;