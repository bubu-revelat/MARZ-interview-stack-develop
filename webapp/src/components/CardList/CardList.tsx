import React from 'react';
import Card from '../Card/Card';
import { CardListProps } from '../interfaces';

const CardList= (props: CardListProps)=> {
  return (
    <div>
      {props.products.map((product, i) => (
        <Card
          key={i}
          id={product.id}
          name={product.name}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default CardList;