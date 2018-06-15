import App from './app';
import { ICommunicatorImpl, createUrlCommunicator, Communicator } from '../communicator';
import { DefinitionParser } from '../definition';
import { IALSProvider } from '../als/als';
import ALS from '../als';

/**
 * Create a default app configuration
 */
export default function createApp(
  definition: string,
  communicatorImpl?: ICommunicatorImpl,
  alsProvider?: IALSProvider
) {
  const impl = communicatorImpl ? communicatorImpl : createUrlCommunicator();
  if (!alsProvider) {
    alsProvider = ALS.default(() => app);
  }
  const app = new App(new Communicator(impl), new DefinitionParser().parse(definition), alsProvider);
  return app;
}

export { App };
