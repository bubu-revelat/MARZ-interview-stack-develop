import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import CardList from "../../components/CardList/CardList";
import { getProducts } from "../ApiHelper";
import { Product } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  empty: 'EMPTY',
  error: 'ERROR'
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, errorOccured } = await getProducts();
      if(!errorOccured){
        if(products.length > 0 ){
            setProducts(products);
            setLoadingState(DATA_STATES.loaded);
        }else{
          setLoadingState(DATA_STATES.empty);
        }
      }else{
        setLoadingState(DATA_STATES.error);
      }
    };
    
    setLoadingState(DATA_STATES.waiting);
    fetchProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting) {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  } else if (loadingState === DATA_STATES.loaded) {
    content = (
      <div>
        <CardList products={products} />
      </div>
    );
  } else if(loadingState === DATA_STATES.empty){
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        No products to list ;)
      </div>
    );
  }else {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occurred fetching the data!
      </div>
    );
  }

  return (
    <PageWrapper>
      {content}
    </PageWrapper>
  );
};

export default ProductsPage;