export type ErrorsContract = {
  isError: boolean;
  isSuccess: boolean;
};

export type DecrementContract = ErrorsContract & {
  handleDecrement: () => Promise<void>;
  handleDecrementMore: (value: bigint) => Promise<void>;
};

export type IncrementContract = ErrorsContract & {
  handleIncrement: () => Promise<void>;
  handleIncrementMore: (value: bigint) => Promise<void>;
};

export type ContractEvent = {
  type: string;
  value: bigint;
  timestamp: number;
  transactionHash: `0x${string}`;
  address: `0x${string}`;
  sender: `0x${string}`;
  gasPrice: bigint;
  valueTransaction: bigint;
  blockNumber: bigint;
  id: string;
};
