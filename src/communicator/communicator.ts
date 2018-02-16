import { uuid4 } from '../utils/uuid';
import SimpleEvent from '../utils/simpleEvent';

import middlewareRunner, { MiddlewareT } from './middleware';

export interface ICommunicatorImpl {
  send: (domain: string, type: string, data: object) => void;
  messageReceived: SimpleEvent<ReceivedMessage>;
}

export interface Response {
  purpose: 'response';
  request_id: string;
  event_type: string;
  response_data: object;
}

export interface SendingMessage {
  domain: string;
  eventType: string;
  data: object;
}

export interface SendingMessageData {
  data: object;
  request_id: string;
}

export interface WrappedSendingMessage {
  domain: string;
  eventType: string;
  data: SendingMessageData;
}

export interface ReceivedMessage {
  purpose: string;
  [key: string]: any;
}

export type MessageReceivedCallback = (purpose: string, data: object) => void;

export interface INativeCommunicator {
  send: (message: SendingMessage) => Promise<any>;
  messageReceived: SimpleEvent<ReceivedMessage>;
  addOnSendMiddleware: (middleware: MiddlewareT<WrappedSendingMessage, any>) => void;
  addOnReceiveMiddleware: (middleware: MiddlewareT<ReceivedMessage, any>) => void;
}

export default class NativeAppCommunicator implements INativeCommunicator {
  private responseWaiters = new Map<string, (result: any) => void>();
  private onSendMiddleware: MiddlewareT<WrappedSendingMessage, ReceivedMessage>[] = [];
  private onReceiveMiddleware: MiddlewareT<ReceivedMessage, SendingMessage>[] = [];

  constructor(
    public impl: ICommunicatorImpl,
    onSendMiddleware?: MiddlewareT<WrappedSendingMessage, any>[],
    onReceiveMiddleware?: MiddlewareT<ReceivedMessage, any>[]
  ) {
    // Bind ourselves to listen for incoming messages
    this.impl.messageReceived.on(this.processReceivedMessage.bind(this));
    if (onSendMiddleware) {
      this.onSendMiddleware = onSendMiddleware;
    }
    if (onReceiveMiddleware) {
      this.onReceiveMiddleware = onReceiveMiddleware;
    }
  }

  public messageReceived = new SimpleEvent<ReceivedMessage>();

  send(message: SendingMessage): Promise<any> {
    let wrapped = this.createDataEnvelope(message);
    return this.doSend(wrapped);
  }

  addOnReceiveMiddleware(middleware: MiddlewareT<ReceivedMessage, any>) {
    this.onReceiveMiddleware.push(middleware);
  }

  addOnSendMiddleware(middleware: MiddlewareT<WrappedSendingMessage, any>) {
    this.onSendMiddleware.push(middleware);
  }

  private async processReceivedMessage(message: ReceivedMessage) {
    console.log('Communicator received: ', message);
    try {
      let result = await this.runMessageReceivedMiddleware(message);
      if (result.purpose === 'response') {
        this.handleResponse(result);
      } else {
        // Pass this message to registered handlers.
        this.messageReceived.trigger(result);
      }
    } catch {
      // Message was cancelled.
    }
  }

  private handleResponse(message: ReceivedMessage) {
    let response = message as Response;
    let waiter = this.responseWaiters.get(response.request_id);
    if (waiter) {
      waiter(response.response_data);
      this.responseWaiters.delete(response.request_id);
    }
  }

  private createDataEnvelope(message: SendingMessage): WrappedSendingMessage {
    return {
      domain: message.domain,
      eventType: message.eventType,
      data: {
        request_id: uuid4(),
        data: message.data,
      },
    };
  }

  private async doSend(message: WrappedSendingMessage): Promise<any> {
    let { domain, eventType, data } = message;
    // Create a promise which will be resolved if this message gets a response.
    let p = new Promise(resolve => this.responseWaiters.set(message.data.request_id, resolve));
    console.log('Communicator sending: ', domain, eventType, data);
    // Run all configured middleware and let them return a response.
    try {
      let result = await this.runSendingMiddleware(message);
      this.impl.send(result.domain, result.eventType, result.data);
    } catch {
      // Message is cancelled.
      return;
    }
  }

  private runSendingMiddleware(message: WrappedSendingMessage) {
    const callback = this.processReceivedMessage.bind(this);
    return middlewareRunner(this.onSendMiddleware, callback, message);
  }

  private runMessageReceivedMiddleware(message: ReceivedMessage) {
    return middlewareRunner(this.onReceiveMiddleware, this.send.bind(this), message);
  }
}
