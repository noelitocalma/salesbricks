export enum ContractDuration {
  SixMonths = 6,
  TwelveMonths = 12,
  TwentyFourMonths = 24,
  ThirtySixMonths = 36,
  Custom = "custom"
}

export interface Contract {
  startDate: string;
  endDate: string;
  contractPeriod: ContractDuration;
  customValue?: number;
}