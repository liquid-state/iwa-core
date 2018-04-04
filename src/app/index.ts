import App from './app';
import { ICommunicatorImpl, createUrlCommunicator, Communicator } from '../communicator';
import { DefinitionParser } from '../definition';

/**
 * Create a default app configuration
 */
export default function createApp(definition: string, communicatorImpl?: ICommunicatorImpl) {
  const impl = communicatorImpl ? communicatorImpl : createUrlCommunicator();
  return new App(new Communicator(impl), new DefinitionParser().parse(definition));
}

export { App };
