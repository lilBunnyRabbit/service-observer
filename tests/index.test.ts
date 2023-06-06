import { ServiceObserver } from "../src/index";

test("can create empty ServiceObserver", () => {
  const observer = new ServiceObserver();
  expect(observer).toBeDefined();
  expect(observer).toBeInstanceOf(ServiceObserver);
});

test("can create ServiceObserver with listeners", () => {
  const observer = new ServiceObserver<{ progress: number }>({ progress: () => {} });
  expect(observer).toBeDefined();
  expect(observer).toBeInstanceOf(ServiceObserver);
});

test("can create ServiceObserverCallback", () => {
  const callback = ServiceObserver.bind(() => {});

  expect(callback).toBeDefined();
  expect(callback).toBeInstanceOf(Function);
});

test("can access ServiceObserver in bind callback", async () => {
  const observer = await new Promise((resolve) => {
    ServiceObserver.bind((observer) => {
      resolve(observer);
    })();
  });

  expect(observer).toBeDefined();
  expect(observer).toBeInstanceOf(ServiceObserver);
});

test("can get ServiceObserverCallback result", () => {
  const callback = ServiceObserver.bind((_, value) => value);

  const value = 123;
  expect(callback(value)).toBe(value);
});

test("can get ServiceObserverCallback with observer result", () => {
  const callback = ServiceObserver.bind((_, value) => value);

  const value = 123;
  expect(callback.observe({ progress: () => {} })(value)).toBe(value);
});

test("can emit events with ServiceObserver", async () => {
  const emitValue = 123;

  const callback = ServiceObserver.bind((observer: ServiceObserver<{ progress: number }>) => {
    observer.emit("progress", emitValue);
  });

  const value = await new Promise((resolve) => {
    callback.observe({
      progress: (value) => resolve(value),
    })();
  });

  expect(value).toBe(emitValue);
});
