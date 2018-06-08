import Communicator, { ICommunicatorImpl, INativeCommunicator } from './communicator';
import createUrlCommunicator from './urlImpl';

export {
  Communicator,
  createUrlCommunicator,
  ICommunicatorImpl,
  INativeCommunicator as ICommunicator,
};
