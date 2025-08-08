import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Dimmer, Loader } from "semantic-ui-react";
import { setHistory } from "./utils/redirectTo";
import { setSnackbar } from "./utils/snackbar";

import LoginPage from "./pages/Login.page";
import MainPage from "./pages/MainPage/MainPage";
import CompanyForm from "./components/CompanyForm";
import TaxiServiceForm from "./components/TaxiServiceForm";
import Header from "./components/Header/Header";
import AccountPage from "./pages/AccountPage/AccountPage";

import getAllAccounts from "./redux/services/Accounts/getAllAccounts";

import styles from "./App.module.css";
import TariffPlanPage from "./pages/TariffPlan.page";
import setAuthorizationLoading from "./redux/actions/session.setAuthorizationLoading";

function App() {
  const { token } = useSelector((state) => state.initial);
  const [activeLoginPage, setStatusLoginPage] = useState(false);
  const [activeLoading, setLoading] = useState(token === null);
  // const accountID = window.location.pathname.slice(13);
  const dispatch = useDispatch();
  setHistory(useHistory());
  setSnackbar(useSnackbar());
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    token !== null &&
      dispatch(getAllAccounts()).then((result) => {
        if (result instanceof Error) {
          dispatch(setAuthorizationLoading(null));
          setStatusLoginPage(true);
        } else {
          setLoading(false);
          setStatusLoginPage(false);
        }
      });
  });
  if (activeLoading) {
    if (token === null) {
      setStatusLoginPage(true);
    }
    setLoading(false);
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  // DispatchActions(getOneAccount(accountID))(

  return (
    <main>
      <div className={styles.page}>
        <Header />
        <div className={styles.pageContent}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route
              exact
              path="/AccountPage/:accountID"
              component={AccountPage}
            />
            <Route path="/TaxiServiceForm" component={TaxiServiceForm} />
            <Route path="/TaxiServiceForm/:id" component={TaxiServiceForm} />
            <Route path="/CompanyForm" component={CompanyForm} />
            <Route path="/CompanyForm/:id" component={CompanyForm} />
            <Route path="/TariffPlans" component={TariffPlanPage} />
          </Switch>
        </div>
      </div>
    </main>
  );
}

export default App;
