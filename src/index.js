import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { store, persistedStore } from "./redux/store";

ReactDOM.render(
  // <React.StrictMode>
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SnackbarProvider maxSnack={4}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
