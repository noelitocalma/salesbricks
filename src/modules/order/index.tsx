import { OrderStage } from "@/models/order.model";
import { WizardStage } from "@/models/wizard.step.model";
import { useCallback, useMemo } from "react";

import OrderCustomerInformation from "./order-customer-information";
import OrderProductPlanSelection from "./order-product-plan-selection";
import OrderContractTerms from "./order-contract-terms";
import OrderReview from "./order-review";
import WizardStageComponent from "@/components/wizard.stage";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { orderAtoms } from "../../atoms/order.atoms";
import { toast } from "sonner";
import OrderSummary from "./order-summary";
import { Button } from "@/shadcn/components/ui/button";

const stages: WizardStage[] = [
  {
    id: OrderStage.CustomerInformation,
    title: 'Deal Parties',
    component: <OrderCustomerInformation />
  },
  {
    id: OrderStage.ProductPlanSelection,
    title: 'Product & plan',
    component: <OrderProductPlanSelection />
  },
  {
    id: OrderStage.ContractTerms,
    title: 'Terms',
    component: <OrderContractTerms />
  },
  {
    id: OrderStage.Review,
    title: 'Review & fine tune',
    component: <OrderReview />,
    nextButtonText: "Finalize Order"
  }
];

export default function OrderModule() {
  const [stageIndex, setStageIndex] = useAtom(orderAtoms.stageIndex);
  const data = useAtomValue(orderAtoms.data);
  const resetOrderForm = useSetAtom(orderAtoms.resetOrderForm);

  const handleClickNext = useCallback(() => {
    if (stageIndex === OrderStage.CustomerInformation && !data.customer.name?.trim()) {
      return toast.error("Customer Name is required.");
    }

    if (stageIndex === OrderStage.ProductPlanSelection) {
      if (!data?.product?.id) {
        return toast.error("Product is required.");
      }

      if (!data?.selectedProductPlan?.id) {
        return toast.error("Plan is required.");
      }
    }

    setStageIndex(stageIndex + 1);
  }, [setStageIndex, stageIndex, stages, data]);

  const handleFinalizeOrder = () => {
    toast("Order has been placed successfully.");
    // redirect somewhere?
    resetOrderForm();
    setStageIndex(OrderStage.CustomerInformation);
    return;
  }

  const handleClickPrevious = () => {
    if (stageIndex === OrderStage.CustomerInformation) return;

    setStageIndex(stageIndex - 1);
  }

  return (
    <div className="bg-main-color p-3 rounded">
      <div className="grid sm:grid-cols-3 ">
        <div className="col-span-2 p-4 sm:border-r">
          <WizardStageComponent
            stages={stages}
            isPreviousDisabled={stageIndex === OrderStage.CustomerInformation}
            stageIndex={stageIndex}
            hideNextButton={stageIndex === OrderStage.Review}
            onNext={handleClickNext}
            onPrevious={handleClickPrevious}
          />
        </div>

        <div className="p-4 flex flex-col gap-3">
          <OrderSummary />

          {stageIndex === OrderStage.Review && (
            <Button onClick={handleFinalizeOrder}>
              Finalize Order
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}