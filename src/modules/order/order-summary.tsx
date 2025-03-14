import { orderAtoms } from "@/atoms/order.atoms"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

const Header = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <div className="text-sm font-semibold">{title}</div>
        <small className="text-gray-500 font-semibold">Edit</small>
      </div>
      <hr className="my-2" />
    </div>
  )
}

const Detail = ({
  title,
  value
}: {
  title: string,
  value: string | number,
}) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <p className="text-sm text-gray-400 font-semibold">{title}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}

export default function OrderSummary() {
  const {
    customer,
    product,
    selectedProductPlan,
    contract,
    addOns
  } = useAtomValue(orderAtoms.data);

  const totalPrice = useMemo(() => {
    const addOnsPrice = addOns.map(addOn => addOn.price * addOn.quantity).reduce((a, c) => (a + c), 0);

    return (addOnsPrice + (selectedProductPlan?.price ?? 0))?.toFixed(3);
  }, [addOns, selectedProductPlan]);

  return (
    <div className="bg-white rounded-md flex-1 min-w-80 p-4">
      <Header title="Deal Parties" />
      <div className="grid gap-2">
        <Detail title="Customer" value={customer?.name ?? ''} />
        <Detail title="Account Rep" value="Jordan Davis" />
      </div>

      <div className="my-10"></div>

      <Header title="Order" />
      <div className="grid gap-2">
        <Detail title="Product" value={product?.name ?? ''} />
        <Detail title="Plan" value={selectedProductPlan?.name ?? ''} />
      </div>
      <hr className="my-2" />

      {addOns.map(addOn => (
        <>
          <div className="grid gap-2">
            <Detail title="Read/write users" value={addOn?.quantity ?? ''} />
            <Detail title="API " value={addOn?.name ?? ''} />
            <Detail title="Price" value={`${addOn.currency}${(addOn.price * addOn.quantity)?.toFixed(3)}`} />
          </div>
          <hr className="my-2" />
        </>
      ))}

      <Detail title="Total Price" value={`$${totalPrice}`} />

      <div className="my-10"></div>
      <Header title="Deal Setup" />
      <div className="grid gap-2">
        <Detail title="Contract Term" value={`${contract?.startDate} - ${contract?.endDate}`} />
        <Detail title="Payment Terms" value="Net 30 (due after 30 days)" />
        <Detail title="Billing Schedule" value="Monthly" />
      </div>
    </div>
  )
}