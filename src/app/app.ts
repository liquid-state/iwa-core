import { IDefinition } from '../definition';
import { ICommunicator } from '../communicator';
import getConfiguration from '../configuration';
import { IALSProvider } from '../als/als';

export interface PluginPrototype<T> {
  key: string;
  configure(customise?: (defaultConfig: object) => object): Plugin<T>;
}

export interface Plugin<T> {
  key: string;
  use(app: IApp): T;
}

export interface IApp {
  communicator: ICommunicator;
  definition: IDefinition;
  alsProvider: IALSProvider;
  plugin(plugin: Plugin<any>): this;
  use<T>(plugin: PluginPrototype<T>): T;
  configuration(...keys: string[]): Promise<{ [key: string]: any }>;
}

export default class App implements IApp {
  private plugins = new Map<string, Plugin<any>>();

  constructor(
    public communicator: ICommunicator,
    public definition: IDefinition,
    public alsProvider: IALSProvider
  ) { }

  public configuration = getConfiguration(this.communicator);

  public plugin = (plugin: Plugin<any>): this => {
    this.plugins.set(plugin.key, plugin);
    return this;
  }

  public use = <T>(plugin: PluginPrototype<T>): T => {
    const result = this.plugins.get(plugin.key);
    if (!result) {
      // Typically trying to access a plugin which is not defined will be a fatal error
      // In the limited case where a valid fallback exists, the user can handle this exception.
      throw `Plugin with key ${plugin.key} (from ${plugin}) has not been attached to the app!`;
    }
    return result.use(this);
  }
}
