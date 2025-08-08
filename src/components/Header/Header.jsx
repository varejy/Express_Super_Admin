import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import Toolbar from "@mui/material/Toolbar";

import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.header}>
      <Toolbar className={styles.displayFlex}>
        <span className={styles.displayFlex}>
          <NavLink to="/">
            <div
              className={styles.logo}
              style={{
                width: "200px",
              }}
            />
          </NavLink>
        </span>
        <span className={styles.displayFlex}>
          <NavLink
            to="/"
            exact
            activeClassName={styles.linkActive}
            className={classNames(styles.link)}
          >
            Аккаунты
          </NavLink>
          <NavLink
            exact
            to="/Reports"
            activeClassName={styles.linkActive}
            className={styles.link}
          >
            Отчеты
          </NavLink>
          <NavLink
            exact
            to="/TariffPlans"
            activeClassName={styles.linkActive}
            className={styles.link}
          >
            Тарифные планы
          </NavLink>
          <NavLink
            exact
            to="/Monitoring"
            activeClassName={styles.linkActive}
            className={styles.link}
          >
            Мониторинг
          </NavLink>
          <NavLink
            exact
            to="/ServicesID"
            activeClassName={styles.linkActive}
            className={styles.link}
          >
            ID филиалов
          </NavLink>
        </span>
        <span className={styles.displayFlex}>
          <div
            className={classNames(styles.notifications, styles.imageButton)}
          />
          <div className={classNames(styles.account, styles.imageButton)} />
        </span>
      </Toolbar>
    </div>
  );
}

export default Header;
