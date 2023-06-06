# Service Observer

[![npm version](https://img.shields.io/npm/v/@lilbunnyrabbit/service-observer.svg)](https://www.npmjs.com/package/@lilbunnyrabbit/service-observer)
[![npm downloads](https://img.shields.io/npm/dt/@lilbunnyrabbit/service-observer.svg)](https://www.npmjs.com/package/@lilbunnyrabbit/service-observer)

Service Observer is an npm library that provides a convenient way to observe and react to events within a service or application. It allows you to define and listen for custom events, making it easier to manage communication and coordination between different components of your codebase.

## Installation

```sh
npm i @lilbunnyrabbit/service-observer
```

## Usage

### Creating a ServiceObserver

To create a new instance of the `ServiceObserver` class, you can use the `ServiceObserver.bind` method. This method takes a callback function as its parameter, which will be invoked when the `ServiceObserverCallback` is invoked. The callback function receives an instance of the `ServiceObserver` and any additional arguments passed to it.

Here's an example of creating a `ServiceObserver`:

```ts
const serviceMethod = ServiceObserver.bind((observer: ServiceObserver<{ status: string }>, arg1, arg2, arg3) => {
  // Your logic here
});
```

### Emitting Events

To emit an event and notify the listeners, you can use the `emit` method on the `ServiceObserver` instance. The `emit` method takes two parameters: the event type and the value associated with the event.

Here's an example of emitting an event:

```ts
observer.emit("status", "success");
```

### Observing Events

To listen for events and perform actions when they are emitted, you can use the `observe` method on the `ServiceObserverCallback` instance. The `observe` method takes an object that defines event listeners for specific event types.

Here's an example of observing events:

```ts
const listeners = {
  status: (value) => {
    // Handle status event
  },
};

serviceMethod.observe(listeners)(1, 2, 3);
```

## Function Example

```ts
const sumArray = ServiceObserver.bind((
  observer: ServiceObserver<{ progress: number }>,
  values: number[]
) => {
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    observer.emit("progress", (i + 1) / values.length);
  }

  return sum;
});
```

```ts
// Without observer
const sum1 = sumArray([1, 2, 3]);

// With observer
const sum2 = sumArray.observe({
  progress: (value) => console.log("Progress:", value),
})([4, 5, 6]);
```

## Service Class Example

```ts
class ExampleService {
  readonly sumArray = ServiceObserver.bind(this._sumArray.bind(this));
  private _sumArray(
    observer: ServiceObserver<{ progress: number }>,
    values: number[],
    initialSum = 0
  ): number {
    for (let i = 0; i < values.length; i++) {
      initialSum += values[i];
      observer.emit("progress", (i + 1) / values.length);
    }
  
    return initialSum;
  }
}
```

```ts
const service = new ExampleService();

// Without observer
const sum1 = service.sumArray([1, 2, 3]);

// With observer
const sum2 = service.sumArray.observe({
  progress: (value) => console.log("Progress:", value),
})([4, 5, 6]);
```

## Conclusion

The Service Observer library provides a flexible and straightforward way to implement event-based communication within your services or applications. By allowing you to define and observe custom events, it simplifies the coordination and interaction between different parts of your codebase.

## License

MIT © Andraž Mesarič-Sirec

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/lilBunnyRabbit)
