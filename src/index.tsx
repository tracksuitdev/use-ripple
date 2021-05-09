import { CSSProperties, MouseEventHandler, useCallback, useEffect, useState } from "react";

type RippleStyles = Pick<CSSProperties, "width" | "height" | "left" | "top">;

interface UseRippleProps<C> {
  /**
   * Duration of ripple animation, default is 600ms
   */
  duration?: number;
  /**
   * Click handler of parent component which generates ripples
   */
  handleClick?: MouseEventHandler<C>;
  /**
   * Maximum number of ripples to render
   */
  limit?: number;
}

/**
 * Custom hook that calculates positions and sizes of ripple elements.
 */
export function useRipple<C extends HTMLElement = HTMLButtonElement>(
  { duration, handleClick, limit }: UseRippleProps<C> = { duration: 600, limit: 100 }
) {
  const [styles, setStyles] = useState<RippleStyles[]>();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (styles) {
      timeout = setTimeout(() => {
        if (styles.length > 1) {
          setStyles(styles.slice(0, -1));
        } else {
          setStyles(undefined);
        }
      }, duration);
    }
    return () => clearTimeout(timeout);
  }, [styles, duration]);

  const onClick = useCallback<MouseEventHandler<C>>(
    e => {
      handleClick?.(e);
      if (styles?.length === limit) {
        return;
      }
      const diameter = Math.max(e.currentTarget.clientWidth ?? 0, e.currentTarget.clientHeight ?? 0);
      const radius = diameter / 2;
      const width = `${diameter}px`;
      const height = `${diameter}px`;
      const left = `${e.clientX - ((e.currentTarget.offsetLeft ?? 0) + radius)}px`;
      const top = `${e.clientY - ((e.currentTarget.offsetTop ?? 0) + radius)}px`;
      setStyles([...(styles ? styles : []), { width, height, left, top }]);
    },
    [styles, handleClick, limit]
  );

  return { styles, onClick };
}
