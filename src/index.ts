/**
 * Defines the type of event listeners for a set of events.
 * The keys of the type represent event names, and the values are the corresponding listener functions.
 */
export type ServiceObserverListeners<TEvents extends Record<string, any>> = {
  [K in keyof TEvents]: (value: TEvents[K]) => void;
};

/**
 * Defines the callback function type for the ServiceObserver.
 * It takes in arguments of type TArgs and returns a result of type TResult or Promise<TResult>.
 */
export interface ServiceObserverCallback<
  TEvents extends Record<string, any>,
  TArgs extends any[],
  TResult extends unknown | Promise<unknown>
> {
  (...args: TArgs): TResult;
  observe(listeners: Partial<ServiceObserverListeners<TEvents>>): (...args: TArgs) => TResult;
}

/**
 * ServiceObserver provides event observation functionality for services or applications.
 * It allows registering event listeners and emitting events.
 * @template TEvents - Type representing the events and their values.
 */
export class ServiceObserver<TEvents extends Record<string, any>> {
  /**
   * Creates an instance of ServiceObserver.
   * @param listeners - Initial set of event listeners.
   */
  constructor(private listeners: Partial<ServiceObserverListeners<TEvents>> = {}) {}

  /**
   * Creates a bound callback function that can be observed.
   * @template TArgs - Type of the callback function arguments.
   * @template TResult - Type of the callback function result.
   * @param callback - Callback function to bind.
   * @returns A bound callback function that can be observed.
   */
  static bind<TEvents extends Record<string, any>, TArgs extends any[], TResult extends unknown | Promise<unknown>>(
    callback: (observer: ServiceObserver<TEvents>, ...args: TArgs) => TResult
  ): ServiceObserverCallback<TEvents, TArgs, TResult> {
    const serviceCallback = function (...args: TArgs): TResult {
      return callback(new ServiceObserver<TEvents>(), ...args);
    } as ServiceObserverCallback<TEvents, TArgs, TResult>;

    /**
     * Observe events by providing listeners.
     * @param listeners - Set of event listeners.
     * @returns A function that invokes the callback function.
     */
    serviceCallback.observe = function (listeners: Partial<ServiceObserverListeners<TEvents>>) {
      return (...args: TArgs) => callback(new ServiceObserver<TEvents>(listeners), ...args);
    };

    return serviceCallback;
  }

  /**
   * Emits an event with a specified value.
   * @template TType - Type of the event.
   * @param type - Type of the event to emit.
   * @param value - Value associated with the event.
   * @returns Current instance of ServiceObserver.
   */
  public emit<TType extends keyof TEvents>(type: TType, value: TEvents[TType]): this {
    this.listeners[type]?.(value);
    return this;
  }
}
