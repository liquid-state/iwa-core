import { IApp } from '../app/app';
import { IProvider } from './data';
import { ALSData } from './als';

/* An als data provider which accesses native configuration */
const nativeConfigurationAlsProvider = (app: IApp): IProvider<ALSData> => async next => {
  const data = await app.configuration('ALS');
  return data ? data as ALSData : next();
};

export default nativeConfigurationAlsProvider;
