import { pick, filter, mapValues } from 'lodash';
import { get } from './messages/config';
import { ICommunicator } from './communicator';

/* A utility function for retrieving configuration from the native app
  Configuration settings should not change during runtime so we can cache them indefinitely.
*/
export default (communicator: ICommunicator) => {
  const CACHE = {};
  return async (...keys: string[]): Promise<{ [key: string]: any }> => {
    const toFetch = filter(keys, k => !(k in CACHE));
    if (toFetch.length > 0) {
      const config = await communicator.send(get(...toFetch));
      const newValues = mapValues(config, 'value');
      // Update the cache.
      Object.assign(CACHE, newValues);
    }
    // Only return the keys requested.
    return pick(CACHE, keys);
  };
};
