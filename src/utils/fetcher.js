export default async function fetcher(to, method = "GET", props) {
  class HTTPError extends Error {
    // eslint-disable-next-line no-useless-constructor
    constructor(message, status, to) {
      super(message);
      this.status = status;
      this.to = to;
    }
  }

  const res = await fetch(to, {
    method,
    ...props,
  });

  if (!res.ok) {
    let errorMessage;
    try {
      const response = await res.json();
      if (Array.isArray(response.error.message)) {
        errorMessage = response.error.message
          .map((item) => `${item.param}: ${item.msg}`)
          .join("; ");
      } else {
        errorMessage = response.error.message;
      }
    } catch (e) {
      errorMessage = e;
    }
    throw new HTTPError(errorMessage, res.status || 500, to);
  }

  let parsed;

  try {
    parsed = await res.json();
  } catch (e) {
    parsed = res;
  }
  return parsed;
}
