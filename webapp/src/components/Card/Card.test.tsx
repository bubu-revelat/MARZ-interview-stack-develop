import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  const mockProps = {
    id: 1,
    name: 'Hat',
    image: 'https://i.ibb.co/NLF31YD/hat.png',
  };

  it('renders card with correct content', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText('#'+mockProps.id)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', mockProps.image);
  });
});