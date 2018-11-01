import { IApp } from '../app/app';
import { IProvider } from './data';
import { ALSData } from './als';

/* An als data provider which accesses native configuration */
const nativeConfigurationAlsProvider = (app: IApp): IProvider<ALSData> => async next => {
  let { ALS: data } = await app.configuration('ALS');
  if (data && typeof data === 'string') {
    data = JSON.parse(data);
  }
  return data ? (data as ALSData) : next();
};

export default nativeConfigurationAlsProvider;
