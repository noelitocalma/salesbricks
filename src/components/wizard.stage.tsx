import { WizardStageComponentProps } from "@/models/wizard.step.model";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/shadcn/components/ui/breadcrumb";
import { Button } from "@/shadcn/components/ui/button";
import { useMemo } from "react";

export default function WizardStageComponent(props: WizardStageComponentProps) {
  const { stageIndex, stages, nextButtonText } = props
  const _nextButtonText = useMemo(
    () => props.stages[props.stageIndex]?.nextButtonText || props.nextButtonText,
    [stageIndex, nextButtonText, stages]
  )

  const _nextButtonDisabled = useMemo(
    () => props.stages[props.stageIndex]?.nextButtonDisabled || false,
    [stageIndex, nextButtonText, stages]
  )

  const _prevButtonDisabled = useMemo(
    () => props.stages[props.stageIndex]?.prevButtonDisabled || false,
    [stageIndex, nextButtonText, stages]
  )

  return (
    <div className="flex flex-col gap-5" style={{ minHeight: 500 }}>
      <Breadcrumb>
        <BreadcrumbList>
          {stages.map((stage, index) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink className={`${index === stageIndex ? 'font-semibold' : ''}`}>{stage.title}</BreadcrumbLink>
              </BreadcrumbItem>
              {(index !== stages.length - 1) && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex-1">
        {props.stages[props.stageIndex]?.component ?? <></>}
      </div>

      <div className="flex justify-between">
        <Button
          disabled={props.isPreviousDisabled || _prevButtonDisabled}
          variant="outline"
          onClick={() => props.onPrevious && props.onPrevious()}
        >
          {props?.previousButtonText ?? 'Previous'}
        </Button>

        {!props?.hideNextButton && <Button
          disabled={props?.isNextOrSubmitDisabled || _nextButtonDisabled}
          onClick={() => props.onNext && props.onNext()}
        >
          {_nextButtonText ?? 'Next'}
        </Button>}
      </div>
    </div>
  )
}