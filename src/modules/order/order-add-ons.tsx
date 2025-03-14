import { orderAtoms } from "@/atoms/order.atoms"
import { AddOn } from "@/models/addon.model"
import { Checkbox } from "@/shadcn/components/ui/checkbox"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useAtom } from "jotai"
import { Edit2, Info } from "lucide-react"

const addOnsList: AddOn[] = [
  {
    id: '1',
    name: 'API Call 1',
    price: 0.001,
    currency: '$',
    description: 'per api call',
    quantity: 1
  },
  {
    id: '2',
    name: 'API Call 2',
    price: 0.001,
    currency: '$',
    description: 'per api call',
    quantity: 1
  }
]

export default function OrderAddOns() {
  const [data, updateData] = useAtom(orderAtoms.data);
  const { addOns } = data;

  const handleSelectAddOn = (addOn: AddOn) => {
    const _addOns = [...addOns];
    const index = addOns?.findIndex(a => a.id === addOn.id);

    if (index > -1) {
      _addOns.splice(index, 1);
    } else {
      _addOns.push({ ...addOn, quantity: 1 });
    }

    updateData({ addOns: _addOns })
  }

  const handleChangeQty = (addOn: AddOn, qty: number) => {
    const _addOns = [...addOns];
    const index = addOns?.findIndex(a => a.id === addOn.id);

    _addOns[index].quantity = qty;

    updateData({ addOns: _addOns })
  }


  return (
    <div className="grid gap-3">
      {addOnsList.map(addOn => {
        const _addOn = addOns?.find(a => a.id === addOn.id);

        return (
          <div className="flex bg-white items-center rounded-md p-3">
            <div className="flex flex-1">
              <div className="flex items-center flex-1 gap-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Checkbox
                    checked={!!_addOn}
                    onCheckedChange={_ => handleSelectAddOn(addOn)}
                  />
                  <label
                    htmlFor="populate-customer-information"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {addOn.name}
                  </label>
                </div>

                <sup>
                  <Info className="w-3 text-blue-500" />
                </sup>
              </div>

              <div className="grid text-right gap-1">
                <span className="font-semibold text-xl">
                  {addOn.currency}{addOn.price?.toFixed(3)}
                </span>
                <span className="text-xs"> {addOn.description}</span>
                <div className="flex justify-end items-center gap-1 text-gray-500">
                  <Edit2 className="w-3" />
                  <small className="text-xs font-semibold ">Edit price</small>
                </div>
              </div>
            </div>

            <div className="border-l ml-3 pl-3">
              <div className="grid w-full items-center gap-1.5">
                <Label className="font-semibold text-xs">Qty</Label>
                <Input className="bg-white w-20"
                  type="number"
                  disabled={!_addOn}
                  value={_addOn?.quantity ?? 0}
                  onChange={e => handleChangeQty(addOn, +e.target.value)}
                  min={0}
                  placeholder="Qty" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}