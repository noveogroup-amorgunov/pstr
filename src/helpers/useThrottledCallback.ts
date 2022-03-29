import { throttle } from 'lodash';
import { useCallback, DependencyList } from 'react';

export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  wait: number = 500,
) {
  return useCallback(throttle(callback, wait, { trailing: false }), [
    ...deps,
    callback,
  ]);
}
