import { atom } from 'jotai';
import { Order } from '@/models/order.model';
import { ContractDuration } from '@/models/contract.model';
import { ProductPlanTerm } from '@/models/product.model';
import { addMonths, format } from 'date-fns';
import { DATE_FORMAT } from '../constants/date-format';

const initialOrderData = {
  populateCustomerInfo: false,
  customer: {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  product: {
    id: '',
    name: ''
  },
  selectedProductPlan: {
    id: '',
    name: '',
    price: 0,
    currency: '',
    term: ProductPlanTerm.Monthly
  },
  contract: {
    startDate: format(new Date(), DATE_FORMAT),
    endDate: format(addMonths(new Date(), ContractDuration.TwelveMonths), DATE_FORMAT),
    contractPeriod: ContractDuration.TwelveMonths,
    customValue: 1
  },
  addOns: [],
  totalAmount: 0
};

const data = atom<Order>(initialOrderData);

export const orderAtoms = {
  stageIndex: atom<number>(0),
  data: atom(
    (get) => get(data),
    (get, set, values: Partial<Order>) => {
      const _updated = { ...get(data), ...values }
      set(data, _updated);
    },
  ),
  resetOrderForm: atom(null, (_, set) => {
    set(data, initialOrderData);
  })
}
