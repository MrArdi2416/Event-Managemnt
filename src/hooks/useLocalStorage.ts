export function useLocalStorage<T>(key: string, initialValue: T) {
  const getValue = () => {
    const saved = localStorage.getItem(key);
    if (saved !== null) return JSON.parse(saved);
    return initialValue;
  };

  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeValue = () => {
    localStorage.removeItem(key);
  };

  return { getValue, setValue, removeValue };
}
