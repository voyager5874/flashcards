import { useState } from 'react';

type PromiseObjectType = {
  promise: null | Promise<any>;
  resolve: null | Function;
  reject: null | Function;
  onSuccess: Function;
  onError: Function;
};

const handlePromise: PromiseObjectType = {
  promise: null,
  resolve: null,
  reject: null,
  onError: () => {},
  onSuccess: () => {},
};

export const useControlledPromise = (
  onSuccessCallback: Function = () => {},
  onErrorCallback: Function = () => {},
) => {
  const [controlledPromise, setControlledPromise] = useState(handlePromise);

  const resetControlledPromise = () => {
    handlePromise.promise = new Promise((resolve, reject) => {
      handlePromise.resolve = resolve;
      handlePromise.reject = reject;
    });
    handlePromise.onSuccess = onSuccessCallback;
    handlePromise.onError = onErrorCallback;

    handlePromise.promise
      .then(() => handlePromise.onSuccess())
      .catch(() => handlePromise.onError());
    setControlledPromise(handlePromise);
  };

  return { controlledPromise, resetControlledPromise };
};
