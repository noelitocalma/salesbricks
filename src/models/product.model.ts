export enum ProductPlanTerm {
  Monthly = 'mo',
  Yearly = 'yr'
}

export interface Product {
  id: string;
  name: string;
  plans?: ProductPlan[]
}

export interface ProductPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  term: ProductPlanTerm;
}