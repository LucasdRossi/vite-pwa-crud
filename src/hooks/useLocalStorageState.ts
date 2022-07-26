import { useEffect, useState } from "react";

export default function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
