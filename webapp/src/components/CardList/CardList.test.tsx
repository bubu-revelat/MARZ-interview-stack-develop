import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';

// Mock the Card component
jest.mock('../Card/Card', () => {
  return function MockCard({ id, name }: { id: string; name: string }) {
    return <div data-testid="mock-card">{id} - {name}</div>;
  };
});

describe('CardList', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', image: 'image1.jpg' },
    { id: 2, name: 'Product 2', image: 'image2.jpg' },
    { id: 3, name: 'Product 3', image: 'image3.jpg' },
  ];

  it('renders correct number of Card components', () => {
    render(<CardList products={mockProducts} />);
    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(mockProducts.length);
  });

  it('passes correct props to Card components', () => {
    render(<CardList products={mockProducts} />);
    mockProducts.forEach(product => {
      const cardContent = screen.getByText(`${product.id} - ${product.name}`);
      expect(cardContent).toBeInTheDocument();
    });
  });
});