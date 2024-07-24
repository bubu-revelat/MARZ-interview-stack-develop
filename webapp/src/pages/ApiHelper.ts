import axios from "axios";
import { Order, OrderData, Product } from "../components/interfaces";

const INPIPELINE_URL = '/api/orders/inpipeline';

const getInPipelineData = async () => {
    const orderData: OrderData = {
      Queued: [],
      InProgress: [],
      QA: [],
    };
    let errorOccured = false;
    try {
      const response = await axios.get(INPIPELINE_URL);
      if (response?.status === 200) {
        const { data } = response.data;
        data.forEach((order: Order) => {
          orderData[order.OrderStatus as keyof OrderData].push(order);
        });
      } else {
        const { message } = response.data;
        throw message;
      }
    } catch(err) {
      console.error(err);
      errorOccured = true;
    }
    return { orderData, errorOccured };
};

const UPDATE_STATUS_URL = '/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
    const updatedOrder = { ...order, OrderStatus: newOrderStatus };
    let orderStatusUpdated = false;
    try {
        const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
        if (response?.status === 200) orderStatusUpdated = true;
        else {
            const { message } = response.data;
            throw message;
        }
    } catch(err) {
        console.error(err);
    }
    return orderStatusUpdated;
};

const PRODUCTS_LIST_URL = '/api/products';

const getProducts = async (): Promise<{ products: Product[], errorOccured: boolean }> => {
  let products: Product[] = [];
  let errorOccured = false;
  
  try {
    const response = await axios.get(PRODUCTS_LIST_URL);
    if (response?.status === 200) {
      const { products: apiProducts } = response.data;
      const activeProducts = apiProducts.filter((product: any) => product.ProductStatus === 'Active');
      products = activeProducts.map((product: any) => ({
        id: product.ProductID,
        image: product.ProductPhotoURL,
        name: product.ProductName,
      }));
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch(err) {
    console.error(err);
    errorOccured = true;
  }

  return { products, errorOccured };
};

export { getInPipelineData, INPIPELINE_URL, updateOrderStatus, UPDATE_STATUS_URL, getProducts, PRODUCTS_LIST_URL };