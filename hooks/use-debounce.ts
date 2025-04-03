import { useCallback } from "react";
import debounce from "lodash.debounce";

export function useDebounce<M extends (...args: any) => any>(
  { method, delay = 500 }: { method: M; delay?: number },
  dependencyList: unknown[] = []
) {
  return useCallback(debounce(method, delay), dependencyList);
}
