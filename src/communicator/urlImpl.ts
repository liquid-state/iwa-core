import SimpleEvent from '../utils/simpleEvent';
import { ICommunicatorImpl, ReceivedMessage } from './communicator';

type handlerT = (message: ReceivedMessage) => void;

const buildCommunicator: () => ICommunicatorImpl = () => {
  let communicator = new UrlCommunicator();
  (<any>window).communicate = communicator.messageReceived.trigger;
  return communicator;
};

export class UrlCommunicator implements ICommunicatorImpl {
  private buffer: any[] = [];

  public messageReceived = new SimpleEvent<ReceivedMessage>();

  constructor() {
    this.startSending();
  }

  send(domain: string, type: string, data: object) {
    const urlBase = `liquidstate://${domain}/${type}`;
    const serialised = encodeURIComponent(JSON.stringify(data));
    const url = `${urlBase}?request=${serialised}`;
    this.buffer.push(url);
  }

  private startSending() {
    setInterval(() => {
      if (this.buffer.length) {
        let message = this.buffer.shift();
        this.doSend(message);
      }
    }, 100);
  }

  private doSend(url: string) {
    console.log('URL communicator, setting url: ' + url);
    document.location.href = url;
  }
}

export default buildCommunicator;
