import App from './app';
import { ICommunicatorImpl, createUrlCommunicator, Communicator } from '../communicator';
import { DefinitionParser } from '../definition';
import ALSProvider, { IALSProvider } from '../als/als';
import ALS from '../als';
import { DataFactory } from '../als/data';
import { Setting, resolveSettings } from './pluginHelpers';
/**
 * Create a default app configuration
 */
export default function createApp(
  definition: string,
  communicatorImpl?: ICommunicatorImpl,
  alsProvider?: IALSProvider
) {
  const impl = communicatorImpl ? communicatorImpl : createUrlCommunicator();
  const app = new App(
    new Communicator(impl),
    new DefinitionParser().parse(definition),
    new ALSProvider(new DataFactory())
  );
  if (!alsProvider) {
    alsProvider = ALS.default(app);
  }
  app.alsProvider = alsProvider;
  return app;
}

export { App, Setting, resolveSettings };
