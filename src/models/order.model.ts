import { Customer } from "@/models/customer.model";
import { Product, ProductPlan } from "@/models/product.model";
import { Contract } from "@/models/contract.model";
import { AddOn } from "@/models/addon.model";

export interface Order {
  customer: Customer;
  populateCustomerInfo?: boolean;
  product: Product;
  selectedProductPlan: ProductPlan | null;
  contract: Contract;
  addOns: AddOn[];
  totalAmount: number;
}

export enum OrderStage {
  CustomerInformation,
  ProductPlanSelection,
  ContractTerms,
  Review
}