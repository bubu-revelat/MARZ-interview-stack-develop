import React from 'react';
import { Meta, Story } from '@storybook/react';
import ProductsPage from './ProductsPage';

export default {
  title: 'Pages/ProductsPage',
  component: ProductsPage,
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ProductsPage {...args} />;

export const Loading = Template.bind({});
Loading.parameters = {
  mockData: [
    {
      url: 'path/to/your/api',
      method: 'GET',
      status: 200,
      response: [],
      delay: 100000, // Long delay to keep it in loading state
    },
  ],
};

export const LoadedWithData = Template.bind({});
LoadedWithData.parameters = {
  mockData: [
    {
      url: 'path/to/your/api',
      method: 'GET',
      status: 200,
      response: [
        { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/200?text=Product1' },
        { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/200?text=Product2' },
        { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/200?text=Product3' },
      ],
    },
  ],
};

export const Error = Template.bind({});
Error.parameters = {
  mockData: [
    {
      url: 'path/to/your/api',
      method: 'GET',
      status: 500,
      response: { message: 'Internal Server Error' },
    },
  ],
};