import OrderAddOns from "./order-add-ons";
import OrderProductPlanSelection from "./order-product-plan-selection";

export default function OrderReview() {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold text-lg">Edit Order</p>
      <OrderProductPlanSelection />

      <OrderAddOns />
    </div>
  )
} 