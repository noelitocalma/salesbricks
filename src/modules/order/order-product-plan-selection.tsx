import { Product, ProductPlanTerm } from "@/models/product.model";
import { Label } from "@/shadcn/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { cn } from "@/shadcn/lib/utils";
import { useAtom } from "jotai";
import { Edit2, Info } from "lucide-react";

import { orderAtoms } from "@/atoms/order.atoms";

const products: Product[] = [
  {
    id: '1',
    name: "GreatCo's First Product",
    plans: [
      {
        id: '1',
        name: "Startup",
        price: 200.00,
        currency: '$',
        term: ProductPlanTerm.Monthly
      },
      {
        id: '2',
        name: "Traction",
        price: 350.00,
        currency: '$',
        term: ProductPlanTerm.Monthly
      },
      {
        id: '3',
        name: "Growth",
        price: 600.00,
        currency: '$',
        term: ProductPlanTerm.Monthly
      }
    ]
  },
  {
    id: '2',
    name: "Noelito Product",
    plans: [
      {
        id: '1',
        name: "Startup",
        price: 200.00,
        currency: '$',
        term: ProductPlanTerm.Monthly
      },
      {
        id: '2',
        name: "Traction",
        price: 350.00,
        currency: '$',
        term: ProductPlanTerm.Monthly
      },
      {
        id: '3',
        name: "Growth",
        price: 600.00,
        currency: '$',
        term: ProductPlanTerm.Monthly
      }
    ]
  }
]

export default function OrderProductPlanSelection() {
  const [data, updateData] = useAtom(orderAtoms.data);

  const handleSelectProduct = (value: string) => {
    const product = products.find(product => product.id === value)
    updateData({ product, selectedProductPlan: null });
  }

  const handleSelectPlan = (value: string) => {
    const plan = data?.product?.plans?.find(plan => plan.id === value);
    updateData({ selectedProductPlan: plan });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid w-full items-center gap-1.5">
        <Label className="font-semibold" htmlFor="productLine">Product line</Label>
        <Select
          value={data?.product?.id}
          onValueChange={handleSelectProduct}
        >
          <SelectTrigger className="w-full bg-white border border-gray-200">
            <SelectValue placeholder={data?.product?.name ?? "Select"} />
          </SelectTrigger>
          <SelectContent>
            {products.map(product => <SelectItem value={product.id}>{product.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="font-semibold mb-2" htmlFor="selectedProductPlan">Select Plan</Label>
        {(data.product?.plans?.length ?? 0) <= 0 && <div className="text-sm p-2 bg-gray-200 rounded-md w-full">Please select product first.</div>}

        <RadioGroup
          value={data.selectedProductPlan?.id}
          className="flex gap-3"
          onValueChange={handleSelectPlan}
        >
          {data?.product?.plans?.map((plan => (
            <div className={
              cn(
                data.selectedProductPlan?.id === plan.id ? "border-gray-500" : "border-transparent",
                "bg-white flex-1 p-3 cursor-pointer shadow border-2 rounded-md"
              )
            }>
              <div className="flex items-center">
                <RadioGroupItem value={plan.id} id={plan.id} />
                <Label className="ml-2" htmlFor={plan.id}>{plan.name}</Label>
                <sup>
                  <Info className="w-3 text-blue-500" />
                </sup>
              </div>

              <div
                className="flex items-center my-1 gap-1"
                onClick={() => handleSelectPlan(plan.id)}
              >
                <span className="font-semibold text-xl">
                  {plan.currency}{plan.price?.toFixed(2)}
                </span>
                <span className="text-xs">/</span>
                <span className="text-xs"> {plan.term}</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <Edit2 className="w-3" />
                <small className="text-xs font-semibold ">Edit price</small>
              </div>
            </div>
          )))}
        </RadioGroup>
      </div>
    </div>
  )
} 