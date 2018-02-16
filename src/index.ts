import * as Communicator from './communicator';
import DefinitionStore, { Definition, DefinitionParser, IDefinition } from './definition';

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

  return {
    communicator: new Communicator.Communicator(impl),
    definition: new DefinitionParser().parse(definition),
  };
}
