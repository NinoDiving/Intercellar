import useInteractionButton from "@/hooks/interactionButton/useInteractionButton";
import Increment from "@/services/contract/increment";
import { act, renderHook } from "@testing-library/react";

jest.mock("wagmi", () => ({
  useWriteContract: () => ({
    writeContract: jest.fn(),
    isSuccess: false,
    isError: false,
    error: null,
  }),
}));

jest.mock("@/services/contract/increment", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Increment and IncrementMore functions should add value to the contract", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockHandleIncrement = jest.fn();
    const mockHandleIncrementMore = jest.fn();
    (Increment as jest.Mock).mockReturnValue({
      handleIncrement: mockHandleIncrement,
      handleIncrementMore: mockHandleIncrementMore,
      isSuccess: false,
      isError: false,
      error: null,
    });
  });

  it("should call handleIncrement when triggered", () => {
    const mockHandleIncrement = jest.fn();
    (Increment as jest.Mock).mockReturnValue({
      handleIncrement: mockHandleIncrement,
    });

    const { result } = renderHook(() => useInteractionButton());
    act(() => {
      result.current.handleIncrement();
    });
    expect(mockHandleIncrement).toHaveBeenCalled();
  });

  it("should call handleIncrementMore when triggered", () => {
    const mockHandleIncrementMore = jest.fn();
    (Increment as jest.Mock).mockReturnValue({
      handleIncrementMore: mockHandleIncrementMore,
    });

    const { result } = renderHook(() => useInteractionButton());

    act(() => {
      result.current.setIsSendMore(true);
      result.current.setIncrementValue(BigInt(10));
    });

    act(() => {
      result.current.handleIncrementMore(result.current.incrementValue);
    });

    expect(mockHandleIncrementMore).toHaveBeenCalledWith(BigInt(10));
  });

  it("Should set isSuccess on true when increment is successful", async () => {
    (Increment as jest.Mock).mockReturnValue({
      isSuccess: true,
    });

    const { result } = renderHook(() => useInteractionButton());

    expect(result.current.isSuccess).toBe(true);
  });

  it("Should set error message when increment fails", async () => {
    const errorMessage = "Transaction failed";

    (Increment as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error(errorMessage),
    });

    const { result } = renderHook(() => useInteractionButton());

    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe(errorMessage);
  });
});
