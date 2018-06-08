/*
This module contains a generic system for retrieving application data using plugable data sources.
*/
export type IProvider<T> = (next: () => Promise<T>) => Promise<T>;

export interface IDataFactory<T> {
  withProvider: (provider: IProvider<T>) => this,
  result: () => Promise<T>
}

/* Utility type used to trigger and handle invalidation of cached objects. */
export interface Invalidator {
  onInvalidation: (callback: () => void) => void,
  invalidate: () => void
}


/*
Provider which access data from localstorage
*/
export const localStorageProvider = <T>(key: string): IProvider<T> => async next => {
  try {
    /// Throws in the case where the browser does not have permission for localStorage
    let conf = localStorage.getItem(key);
    return conf ? JSON.parse(conf) : next();
  } catch (e) {
    return next();
  }
}

/*
Provider which accesses data from a specific dom element

This expects that the dom element is a script tag with type application/json
So that the browser innerHTML property returns the unparsed json text.
*/
export const domProvider = <T>(id: string): IProvider<T> => async next => {
  let elem = document.getElementById(id);
  return elem ? JSON.parse(elem.innerHTML) : next();
}

/*
Provides data from a static object
*/
export const staticProvider = <T>(data: any): IProvider<T> => async _ => data;


/*
Provider which handles caching of other data returned from other providers.
Also supports optional invalidation through the Invalidator protocol
*/
export const cacheProvider = <T>(cacheTime = 600, invalidator?: Invalidator): IProvider<T> => {
  let data: T | null = null;
  let expires: number | null = null;

  if (invalidator) {
    invalidator.onInvalidation(() => data = null);
  }

  return async next => {
    if (data && expires && expires >= Date.now()) {
      return data;
    }
    data = await next();
    expires = Date.now() + (cacheTime * 1000);
    return data;
  }
}


/*
Factory for using providers
Handles configuring multiple providers and running all of their provide methods.

Example usage

let factory = new DataFactory<T>()
    .withProvider(cacheProvider())
    .withProvider(localStorageProvider('test'))
    .withProvider(domProvider('myData'))
*/
export class DataFactory<T> implements IDataFactory<T> {
  private providers: IProvider<T>[] = [];

  withProvider(provider: IProvider<T>) {
    this.providers.push(provider);
    return this;
  }

  result(): Promise<T> {
    // Take a copy of the array so that shift does not break the factory.
    let innerProviders = [...this.providers];
    let next = (): Promise<T> => {
      let prov = innerProviders.shift();
      if (!prov) {
        return Promise.reject('Cannot load config.');
      }
      return prov(next);
    }
    return next();
  }
}

export default DataFactory;
