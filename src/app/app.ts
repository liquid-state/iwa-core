import { IDefinition } from '../definition';
import { ICommunicator } from '../communicator';

export interface Plugin<T> {
  key: string;
  configure(configure?: (defaultConfig: object) => object): this;
  build(app: IApp): T;
}

export interface IApp {
  communicator: ICommunicator;
  definition: IDefinition;
  plugin(plugin: Plugin<any>): void;
  getPlugin<T>(plugin: Plugin<T>): T;
}

export default class App implements IApp {
  private plugins = new Map<string, Plugin<any>>();

  constructor(public communicator: ICommunicator, public definition: IDefinition) {}

  plugin(plugin: Plugin<any>): void {
    this.plugins.set(plugin.key, plugin);
  }

  getPlugin<T>(plugin: Plugin<T>): T {
    const result = this.plugins.get(plugin.key);
    if (!result) {
      // Typically trying to access a plugin which is not defined will be a fatal error
      // In the limited case where a valid fallback exists, the user can handle this exception.
      throw `Plugin with key ${plugin.key} (from ${plugin}) has not been attached to the app!`;
    }
    return result.build(this);
  }
}
