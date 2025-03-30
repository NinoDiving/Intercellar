export type IncrementButtonProps = {
  handleIncrement: () => void;
  handleIncrementMore: (value: bigint) => void;
  value: bigint;
  setValue: (value: bigint) => void;
  isSendMore: boolean;
  setIsSendMore: (value: boolean) => void;
};

export type DecrementButtonProps = {
  handleDecrement: () => void;
  handleDecrementMore: (value: bigint) => void;
  value: bigint;
  setValue: (value: bigint) => void;
  isRemoveMore: boolean;
  setIsRemoveMore: (value: boolean) => void;
};
