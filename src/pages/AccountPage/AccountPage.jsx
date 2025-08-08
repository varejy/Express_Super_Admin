import React, { useState } from "react";
import { useSelector } from "react-redux";

import AccountInfo from "./components/AccountInfo/AccountInfo";
import CompanyInfo from "./components/CompanyInfo/CompanyInfo";
import ServicesInfo from "./components/ServicesInfo/ServicesInfo";

import Drawer from "../../components/Drawer/Drawer";

import EditCompanyForm from "../../components/EditCompoanyForm/EditCompanyForm";

import styles from "./AccountPage.module.css";

function AccountPage() {
  const activeAccount = useSelector((state) => state.accounts.activeAccount);

  const [state, setState] = useState({ activeCompany: 0, activeAccount });

  const handleChangeActiveCompany = (id) => {
    setState({
      activeCompany: id,
    });
  };
  const [drawerIsActive, setDrawer] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    console.log("toggleDrawer");

    setDrawer(value);
  };
  return (
    <div className={styles.wrapper}>
      <AccountInfo
        onChangeActiveCompany={handleChangeActiveCompany}
        activeCompany={state.activeCompany}
        account={activeAccount}
      />
      <div className={styles.contentWrapper}>
        <CompanyInfo
          toggleDrawer={toggleDrawer}
          activeCompany={state.activeCompany}
          company={activeAccount.companies[state.activeCompany]}
        />
        <ServicesInfo
          toggleDrawer={toggleDrawer}
          activeCompany={state.activeCompany}
          account={activeAccount}
        />
      </div>

      <Drawer
        status={drawerIsActive}
        component={
          <EditCompanyForm
            account={activeAccount}
            toggleDrawer={toggleDrawer}
          />
        }
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}

export default AccountPage;
