import { useRef, useEffect } from "react";

/**
 * This hook avoid the running of useEffect on mounting. It only runs when on variable in inputs changes
 * code from: https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
 * @param fn the callback when the variable changes
 * @param inputs array of variables that trigger the effec
 */
export function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}
