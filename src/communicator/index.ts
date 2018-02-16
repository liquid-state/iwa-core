import Communicator, { ICommunicatorImpl, INativeCommunicator } from './communicator';
import createUrlCommunicator from './urlImpl';
import createNoopCommunicator from './noopImpl';

export {
  Communicator,
  createUrlCommunicator,
  createNoopCommunicator,
  ICommunicatorImpl,
  INativeCommunicator as ICommunicator,
};
