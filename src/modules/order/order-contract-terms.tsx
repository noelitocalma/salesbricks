import { DatePicker } from "@/shadcn/components/ui/date-picker";
import { useAtom } from "jotai";
import { orderAtoms } from "@/atoms/order.atoms";
import { addMonths, format } from "date-fns";
import { Label } from "@/shadcn/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { ContractDuration } from "@/models/contract.model";
import { DATE_FORMAT } from "@/constants/date-format";
import { useCallback } from "react";
import { Input } from "@/shadcn/components/ui/input";

export default function OrderContractTerms() {
  const [{ contract }, updateData] = useAtom(orderAtoms.data);

  const getEndDate = useCallback((
    startDate: string,
    contractPeriod?: ContractDuration,
    customValue?: number
  ) => {
    const months = (contractPeriod ?? contract.contractPeriod) === ContractDuration.Custom
      ? customValue ?? contract.customValue
      : contractPeriod;

    return format(addMonths(new Date(startDate), +(months ?? 1)), DATE_FORMAT)
  }, [contract]);

  const handleChangeStartDate = useCallback((value: Date) => {
    const startDate = format(new Date(value), 'MM/dd/yyyy');

    updateData({
      contract: {
        ...contract,
        startDate,
        endDate: getEndDate(startDate)
      }
    })
  }, [contract, updateData, getEndDate])

  const handleChangeContractPeriod = (value: ContractDuration) => {
    updateData({
      contract: {
        ...contract,
        contractPeriod: value,
        endDate: getEndDate(contract.startDate, value),
        customValue: 1,
      }
    })
  }

  const handleCustomValueChange = (value: number) => {
    updateData({
      contract: {
        ...contract,
        customValue: value,
        endDate: getEndDate(contract.startDate, ContractDuration.Custom, value)
      }
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold text-lg">Enter terms</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="grid w-fullmax-w-lg items-center gap-1.5">
          <Label className="font-semibold" htmlFor="startDate">Start Date</Label>
          <DatePicker
            setDate={handleChangeStartDate}
            date={contract?.startDate ? new Date(contract?.startDate) : new Date()}
          />
        </div>

        <div className="grid w-fullmax-w-lg items-center gap-1.5">
          <Label className="font-semibold" htmlFor="contractPeriod">Contract period</Label>
          <Select
            value={String(contract?.contractPeriod)}
            onValueChange={value => handleChangeContractPeriod(value as ContractDuration)}
          >
            <SelectTrigger className="w-full bg-white border border-gray-200">
              <SelectValue placeholder="Terms" />
            </SelectTrigger>
            <SelectContent>
              {/** create a loop here */}
              <SelectItem value={String(ContractDuration.SixMonths)}>6 months</SelectItem>
              <SelectItem value={String(ContractDuration.TwelveMonths)}>12 months</SelectItem>
              <SelectItem value={String(ContractDuration.TwentyFourMonths)}>24 months</SelectItem>
              <SelectItem value={String(ContractDuration.ThirtySixMonths)}>36 months</SelectItem>
              <SelectItem value={String(ContractDuration.Custom)}>Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-fullmax-w-lg items-center gap-1.5">
          <Label className="font-semibold" htmlFor="endDate">End Date</Label>
          <DatePicker
            disabled={true}
            date={contract?.endDate ? new Date(contract?.endDate) : new Date()}
            setDate={() => { }}
          />
        </div>
      </div>

      {contract.contractPeriod === ContractDuration.Custom && (
        <div className="grid w-full items-center gap-1.5">
          <Label className="font-semibold" htmlFor="contractCustom">Custom Contract Period (months)</Label>
          <Input className="bg-white w-full" id="contractCustom" type="number"
            value={contract.customValue}
            onChange={e => handleCustomValueChange(+e.target.value)}
            min={1} placeholder="Custom Contract Duration" />
        </div>
      )}
    </div>
  )
} 