import Reset from "@/services/contract/reset";
import { act, renderHook } from "@testing-library/react";

jest.mock("wagmi", () => ({
  useWriteContract: () => ({
    writeContract: jest.fn(),
    isSuccess: false,
    isError: false,
    error: null,
  }),
}));

jest.mock("@/services/contract/reset", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Reset function should reset the value of the contract", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockHandleReset = jest.fn();
    (Reset as jest.Mock).mockReturnValue({
      handleReset: mockHandleReset,
      isSuccess: false,
      isError: false,
    });
  });

  it("Should call handleReset when triggered", () => {
    const mockhandleReset = jest.fn();
    (Reset as jest.Mock).mockReturnValue({
      handleReset: mockhandleReset,
      isSuccess: true,
    });

    const { result } = renderHook(() => Reset());

    act(() => {
      result.current.handleReset();
    });

    expect(mockhandleReset).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
  });

  it("Should handle reset failure", () => {
    const errorMessage = "Failed to reset contract";
    (Reset as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error(errorMessage),
    });

    const { result } = renderHook(() => Reset());

    expect(result.current.isError).toBe(true);
    expect(result.current.error?.message).toBe(errorMessage);
  });
});
