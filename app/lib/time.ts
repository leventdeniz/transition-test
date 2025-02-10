/**
 * Sets a random timeout in seconds between min (inclusive) and max (inclusive)
 * If error is set the Promise will be rejected and an error thrown
 */
export const wait = (min: number, max: number, error: boolean = false) => {
  const ms = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return new Promise((resolve, reject) => setTimeout(error ? reject : resolve, ms));
};

export const waitForFetch = async <T>(input: RequestInfo | URL, init?: RequestInit, min: number = 1, max: number = 2) => {
  const ms = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      fetch(input, init)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    }, ms);
  });
}

export const waitFor = async <T>(input: T, minMs: number = 1, maxMs: number = 2) => {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(input);
    }, ms);
  });
}
