export type MiddlewareT<T, R> = (
  dispatch: (response: R) => void
) => (message: T, next: (message: T) => void) => void;

/**
 * A middleware runner for the communicator
 *
 * Supports dispatching multiple messages asynchronously based on a single incoming message,
 * mutating the message, and cancelling the message.
 *
 * Returns a promise which either resolves to the updated copy of the original message
 * after all middleware have completed, or rejects if the message is cancelled.
 *
 * @param middleware An array of middleware to be run.
 * @param dispatch The callback for dispatching responses
 * @param message The original message.
 *
 */
export default function middlewareRunner<T, R>(
  middleware: MiddlewareT<T, R>[],
  dispatch: (response: R) => void,
  message: T
): Promise<T> {
  //Take a copy of the middleware array so we don't mutate it.
  middleware = [...middleware];
  return new Promise((resolve, reject) => {
    let run = (updatedMessage?: T) => {
      if (updatedMessage) {
        // Support message mutation.
        message = updatedMessage;
      } else {
        // Sending a null or undefined message triggers cancellation.
        reject();
      }
      let nextMiddleware = middleware.shift();
      if (nextMiddleware) {
        nextMiddleware(dispatch)(message, run);
      } else {
        // We are done, resolve with the last version of message we have seen.
        resolve(message);
      }
    };
    run();
  });
}
