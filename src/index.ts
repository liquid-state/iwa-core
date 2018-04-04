import App from './app';
import * as Communicator from './communicator';
import DefinitionStore, { Definition, DefinitionParser } from './definition';

export { Communicator, DefinitionStore, Definition as WebappDefinition };

/**
 * Create a default app configuration
 */
export default function createApp(
  definition: string,
  communicatorImplementation?: Communicator.ICommunicatorImpl
) {
  const impl = communicatorImplementation
    ? communicatorImplementation
    : Communicator.createUrlCommunicator();

  return new App(new Communicator.Communicator(impl), new DefinitionParser().parse(definition));
}
