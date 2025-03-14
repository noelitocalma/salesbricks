import { ReactNode } from "react"

export interface WizardStage {
  id: string | number
  title: string
  nextButtonText?: string
  nextButtonLight?: boolean
  nextButtonDisabled?: boolean
  prevButtonDisabled?: boolean
  component: ReactNode
}

export interface WizardStageComponentProps {
  stages: WizardStage[]
  stageIndex: number
  isNextOrSubmitDisabled?: boolean
  isPreviousDisabled?: boolean
  isSubmitLoading?: boolean
  nextButtonText?: string
  previousButtonText?: string
  submitButtonText?: string
  onSubmitForm?: (e: React.FormEvent<HTMLFormElement>) => void
  onPrevious?: (index?: number) => void
  onNext?: (index?: number) => void
  isLastStep?: boolean,
  hideNextButton?: boolean
}