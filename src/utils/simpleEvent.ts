import { uuid4 } from './uuid';

export type Handler<T> = (event: T) => void;

class SimpleEvent<T> {
  private handlers: Map<string, Handler<T>> = new Map();

  constructor() {
    this.on = this.on.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  public on(handler: Handler<T>): () => void {
    const uuid = uuid4();
    this.handlers.set(uuid, handler);
    return () => {
      this.handlers.delete(uuid);
    };
  }

  public trigger(event: T) {
    Array.from(this.handlers.values()).forEach(handler => handler(event));
  }
}

export default SimpleEvent;
