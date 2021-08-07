const runPromiseInSequence = (array, value) =>
  array.reduce(
    (promiseChain, nowPromise) =>
      promiseChain.then(nowPromise, (value) => console.log(value)),
    Promise.resolve(value)
  );
