import React from 'react';
import { Meta, Story } from '@storybook/react';
import CardList from './CardList';
import { CardListProps } from '../interfaces';

export default {
  title: 'Components/CardList',
  component: CardList,
} as Meta;

const Template: Story<CardListProps> = (args) => <CardList {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: [
    { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/200?text=Product1' },
    { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/200?text=Product2' },
    { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/200?text=Product3' },
  ],
};

export const SingleProduct = Template.bind({});
SingleProduct.args = {
  products: [
    { id: 1, name: 'Single Product', image: 'https://via.placeholder.com/200?text=SingleProduct' },
  ],
};

export const ManyProducts = Template.bind({});
ManyProducts.args = {
  products: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: `https://via.placeholder.com/200?text=Product${i + 1}`,
  })),
};