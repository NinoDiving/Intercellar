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
