import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Filters from "./components/Filters/Filters";
import AccountsWrapper from "./components/AccountsWrapper/AccountsWrapper";

import getAllAccounts from "../../redux/services/Accounts/getAllAccounts";

import styles from "./MainPage.module.css";

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
  });
  return (
    <section className={styles.wrapper}>
      <Filters />
      <AccountsWrapper />
    </section>
  );
}

export default MainPage;
