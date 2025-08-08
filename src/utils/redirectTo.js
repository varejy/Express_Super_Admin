import { createBrowserHistory } from "history";

let historyS = createBrowserHistory();

export function history() {
  return historyS;
}

export function setHistory(history) {
  historyS = history;
}

// eslint-disable-next-line import/prefer-default-export
export function redirectTo(url) {
  history().push(url);
}
