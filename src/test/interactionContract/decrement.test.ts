import Decrement from "@/services/contract/decrement";
import useInteractionButton from "@/hooks/interactionButton/useInteractionButton";
import { act, renderHook } from "@testing-library/react";

jest.mock("wagmi", () => ({
  useWriteContract: () => ({
    writeContract: jest.fn(),
    isSuccess: false,
    isError: false,
    error: null,
  }),
}));

jest.mock("@/services/contract/Decrement", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Decrement and DecrementMore functions should remove value from the contract", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockHandleDecrement = jest.fn();
    const mockHandleDecrementMore = jest.fn();
    (Decrement as jest.Mock).mockReturnValue({
      handleDecrement: mockHandleDecrement,
      handleDecrementMore: mockHandleDecrementMore,
      isSuccess: false,
      isError: false,
      error: null,
    });
  });

  it("should call handleDecrement when triggered", () => {
    const mockHandleDecrement = jest.fn();
    (Decrement as jest.Mock).mockReturnValue({
      handleDecrement: mockHandleDecrement,
    });

    const { result } = renderHook(() => useInteractionButton());
    act(() => {
      result.current.handleDecrement();
    });
    expect(mockHandleDecrement).toHaveBeenCalled();
  });

  it("should call handleDecrementMore when triggered", () => {
    const mockHandleDecrementMore = jest.fn();
    (Decrement as jest.Mock).mockReturnValue({
      handleDecrementMore: mockHandleDecrementMore,
    });

    const { result } = renderHook(() => useInteractionButton());

    act(() => {
      result.current.setIsSendMore(true);
      result.current.setDecrementValue(BigInt(10));
    });

    act(() => {
      result.current.handleDecrementMore(result.current.decrementValue);
    });

    expect(mockHandleDecrementMore).toHaveBeenCalledWith(BigInt(10));
  });

  it("Should set isSuccess on true when Decrement is successful", async () => {
    (Decrement as jest.Mock).mockReturnValue({
      isSuccess: true,
    });

    const { result } = renderHook(() => useInteractionButton());

    expect(result.current.isSuccess).toBe(true);
  });

  it("Should set isError on true when Decrement is failed", async () => {
    (Decrement as jest.Mock).mockReturnValue({
      isError: true,
    });

    const { result } = renderHook(() => useInteractionButton());

    expect(result.current.isError).toBe(true);
  });
});
