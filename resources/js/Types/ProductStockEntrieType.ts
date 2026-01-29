export default interface ProductStockEntrieType {
  id: number;
  productVariation: {
    color: string;
    size: string;
    product: {
      id: number;
      name: string;
    };
  };
  quantity: number;
  unitCost: number;
  createdAt: string;
}
