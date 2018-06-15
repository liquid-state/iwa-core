import { IApp } from '../app/app';
import { default as ALSProvider, ALSData } from './als';
import { default as DataFactory } from './data';
import { default as configurationProvider } from './configurationProvider';

const defaultAls = (app: IApp) => (
  new ALSProvider(
    new DataFactory<ALSData>()
      .withProvider(configurationProvider(app))
    )
);

const ALS = {
  default: defaultAls,
  ALSProvider,
  DataFactory,
  configurationProvider,
};

export default ALS;
