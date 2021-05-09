import { useRipple } from "../src";
import { MouseEvent } from "react";
import { act, renderHook } from "@testing-library/react-hooks";

const event: MouseEvent<HTMLButtonElement> = ({
  clientX: 50,
  clientY: 60,
  currentTarget: { offsetLeft: 5, offsetTop: 10, clientWidth: 100, clientHeight: 50 },
} as unknown) as MouseEvent<HTMLButtonElement>;

describe("useRipple hook test", () => {
  it("should add ripple styles onClick", () => {
    const { result } = renderHook(() => useRipple());

    act(() => {
      result.current.onClick(event);
    });

    const styles = result.current.styles;
    expect(styles).toHaveLength(1);
    expect(styles?.[0].height).toEqual("100px");
    expect(styles?.[0].width).toEqual("100px");
    expect(styles?.[0].left).toEqual("-5px");
    expect(styles?.[0].top).toEqual("0px");
  });

  it("should remove ripple after animation is done", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useRipple());

    act(() => {
      result.current.onClick(event);
    });

    expect(result.current.styles).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.styles).toBeUndefined();
  });
});
