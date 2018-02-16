/**
 * A communicator implementation which does nothing, usually used when there is no native app and middleware are supposed to handle all messages.
 *
 */

import SimpleEvent from '../utils/simpleEvent';
import { ICommunicatorImpl, ReceivedMessage } from './communicator';

export class NoopCommunicator implements ICommunicatorImpl {
  public messageReceived = new SimpleEvent<ReceivedMessage>();

  async send(domain: string, type: string, data: object) {
    // If we get here, the communicator middleware has not handled this message correctly.
    // Therefore we should fail loudly.
    throw `Desktop communicator tried to send message: ${domain}, ${type}, ${data}`;
  }
}

const createCommunicator = () => new NoopCommunicator();

export default createCommunicator;
