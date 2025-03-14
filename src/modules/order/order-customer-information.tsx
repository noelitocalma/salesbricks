import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useAtom } from "jotai";
import { Search, Share2 } from "lucide-react";

import { orderAtoms } from "@/atoms/order.atoms";
import { Customer } from "@/models/customer.model";

enum Tab {
  Customer = 'customer',
  Sales = 'sales-info'
}

const CRMWrapper = () => (
  <small className="bg-gray-200 px-2 font-bold rounded-lg flex items-center gap-1">
    CRM
    <Share2 className="w-3 text-orange-600" />
  </small>
)

export default function OrderCustomerInformation() {
  const [data, updateData] = useAtom(orderAtoms.data);
  const { customer } = data;

  const updateCustomerData = (field: keyof Customer, value: string) => {
    updateData({
      customer: {
        ...customer,
        [field]: value
      }
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold text-lg">Enter deal parties</p>

      <Tabs defaultValue={Tab.Customer}>
        <TabsList className="flex gap-3 mb-2">
          <TabsTrigger className="text-left font-semibold bg-gray-100 rounded-sm p-2" value={Tab.Customer}>Customer</TabsTrigger>
          <TabsTrigger className="text-left py-2" value={Tab.Sales}>Sales info</TabsTrigger>
        </TabsList>

        <TabsContent value={Tab.Customer}>
          <div className="border rounded-md p-5 grid gap-5">
            <div className="grid w-full max-w-md items-center gap-1.5">
              <div className="flex justify-between items-center">
                <Label className="font-semibold" htmlFor="name">Customer account</Label>
                <CRMWrapper />
              </div>

              <div className="relative">
                <Search className="absolute top-2 left-2 w-4" />
                <Input className="bg-white pl-8"
                  value={customer.name}
                  onChange={(e) => updateCustomerData('name', e.target.value)}
                  id="name"
                  type="text"
                  placeholder="Enter or search for your customer's name"
                />
              </div>
            </div>

            <div className="grid w-full max-w-md items-center gap-1.5">
              <div className="flex justify-between items-center">
                <Label className="font-semibold" htmlFor="name">Opportunity</Label>
                <CRMWrapper />
              </div>

              <div className="relative">
                <Select disabled>
                  <SelectTrigger className="w-full bg-gray-100 border border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid w-full max-w-md items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-sm p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Checkbox id="populate-customer-information"
                  onCheckedChange={checked => updateData({ populateCustomerInfo: checked as boolean })}
                  checked={data.populateCustomerInfo} />
                <label
                  htmlFor="populate-customer-information"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pre-populate customer information
                </label>
              </div>

              <small className="text-xs text-gray-500">Pre-fill checkout details on behalf of your customer</small>

              {data.populateCustomerInfo && (
                <div className="grid mt-5 gap-4">
                  <div className="grid w-full max-w-md items-center gap-1.5">
                    <Label className="font-semibold" htmlFor="address_line_1">Address Line 1</Label>
                    <Input
                      className="bg-white"
                      id="addressLine1"
                      type="text"
                      placeholder="Address Line 1"
                      value={customer.addressLine1}
                      onChange={(e) => updateCustomerData('addressLine1', e.target.value)}
                    />
                  </div>

                  <div className="grid w-full max-w-md items-center gap-1.5">
                    <Label className="font-semibold" htmlFor="address_line_2">
                      Address Line 2 <small className="font-normal">(optional)</small>
                    </Label>
                    <Input
                      className="bg-white"
                      id="addressLine2" type="text"
                      value={customer.addressLine2}
                      onChange={(e) => updateCustomerData('addressLine2', e.target.value)}
                      placeholder="Address Line 2"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="grid w-full max-w-md items-center gap-1.5 col-span-2">
                      <Label className="font-semibold" htmlFor="city">
                        City
                      </Label>
                      <Input
                        value={customer.city}
                        onChange={(e) => updateCustomerData('city', e.target.value)}
                        className="bg-white" id="city" type="text" placeholder="City" />
                    </div>

                    <div className="grid w-full max-w-md items-center gap-1.5">
                      <Label className="font-semibold" htmlFor="state">State</Label>
                      {/** we should use comboxbox here */}
                      <Select
                        value={customer.state}
                        onValueChange={(value) => updateCustomerData('state', value)}
                      >
                        <SelectTrigger className="w-full bg-white border border-gray-200">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">NY</SelectItem>
                          <SelectItem value="tx">TX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid w-full max-w-md items-center gap-1.5">
                      <Label className="font-semibold" htmlFor="zipCode">Zip Code</Label>
                      <Input
                        value={customer.zipCode}
                        onChange={(e) => updateCustomerData('zipCode', e.target.value)}
                        className="bg-white"
                        id="zipCode"
                        type="text"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value={Tab.Sales}>
          <div>
            coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}