import {Brand} from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LocalStorageKey<T> = Brand<'LocalStorageKey', string>;
export const lskey = <T>(key: string): LocalStorageKey<T> => key as LocalStorageKey<T>;

export const lsGet = <T>(key: LocalStorageKey<T>): null | T => {
  const data = localStorage.getItem(key);
  return data && JSON.parse(data);
};
export const lsSet = <T>(key: LocalStorageKey<T>, item: T): void =>
  localStorage.setItem(key, JSON.stringify(item));
export const lsRemove = <T>(key: LocalStorageKey<T>): void => localStorage.removeItem(key);
export const lsUpdate = <T>(key: LocalStorageKey<T>, fn: (storedValue: null | T) => T): void =>
  lsSet(key, fn(lsGet(key)));
