import React from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { categories } from '../../utils/categories';
import { CategoryIcon, CategoryItem, CategoryList, CategoryName, Container, Divider, Footer } from './styles';

export interface Category {
  key: string;
  name: string;
  icon: string;
}

export interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: Props) {

  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header title="Selecione a categoria" />

      <CategoryList
        data={categories}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) =>
          <CategoryItem
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <CategoryIcon name={item.icon} />
            <CategoryName>{item.name}</CategoryName>
          </CategoryItem>
        }
      />

      <Footer>
        <Button title='Selecionar' onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
