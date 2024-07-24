import type { DraggableProvided } from 'react-beautiful-dnd';

export interface Order {
    OrderID: number;
    CustomerID: number;
    ProductID: number;
    OrderStatus: string;
}

export interface OrderData {
  Queued: Order[],
  InProgress: Order[],
  QA: Order[],
}

export interface DraggableItemProps extends Order{
    draggableProvided: DraggableProvided;
    removeOrder: (order: Order) => void;
}

export interface DraggableListProps {
    ID: string;
    listTitle: string;
    removeOrder: (order: Order) => void;
    items: Order[];
};

export interface HeaderLink {
    label: string;
    url: string;
}

export interface HeaderProps {
    links: HeaderLink[];
}

// Define the type for a product
export interface Product {
    id: number;
    name: string;
    image: string;
}
  
// Define the props type for the CardList component
export interface CardListProps {
    products: Product[];
}

// Define the props type for the Card component
export interface CardProps  {
    id: number;
    name: string;
    image: string;
  };