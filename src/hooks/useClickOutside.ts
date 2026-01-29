import { useEffect, useRef } from "react";

interface UseClickOutsideOptions {
  onClose: () => void;
  enabled?: boolean;
}

export function useClickOutside<T extends HTMLElement>({
  onClose,
  enabled = true,
}: UseClickOutsideOptions) {
  const ref = useRef<T>(null);

  // 1. Optimization: Store the latest callback in a ref.
  // This prevents the useEffect below from re-running every time the
  // parent component re-renders or creates a new 'onClose' function.
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      // Safety check
      if (!ref.current) return;

      // Check if clicking inside the dropdown
      if (ref.current.contains(event.target as Node)) {
        return;
      }

      // If outside, call the latest version of the function
      onCloseRef.current();
    };

    // 2. THE FIX: Change 'mousedown' to 'click'
    // This aligns the timing with your button's onClick event.
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [enabled]); // Dependencies are now minimal

  return ref;
}
