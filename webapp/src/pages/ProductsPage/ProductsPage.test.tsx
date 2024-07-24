import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductsPage from './ProductsPage';
import { getProducts } from '../ApiHelper';
import { Product } from '../../components/interfaces';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../ApiHelper');
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

describe('ProductsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading spinner initially', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loading-spinner-container')).toBeInTheDocument();
  });

  test('shows no products message when loaded with no products', async () => {
    mockGetProducts.mockResolvedValueOnce({ products: [], errorOccured: false });

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    
    expect(await screen.findByTestId('error-container')).toHaveTextContent('No products to list ;)');
  });

  test('shows error message on error', async () => {
    mockGetProducts.mockResolvedValueOnce({ products: [], errorOccured: true });

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    
    expect(await screen.findByTestId('error-container')).toHaveTextContent('An error occurred fetching the data!');
  });
});