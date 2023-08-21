import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, time: number) {
  const [debouncedValue, setValue] = useState<T>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(value);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return debouncedValue;
}
