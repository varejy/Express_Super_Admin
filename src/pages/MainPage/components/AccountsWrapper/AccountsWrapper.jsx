import React, { useState } from "react";
import { useSelector } from "react-redux";

import { isEmpty } from "ramda";

import Header from "./components/Header/Header";
import AccountSmall from "./components/AccountSmall/AccountSmall";
import ActiveAccountPreview from "./components/ActiveAccountPreview/ActiveAccountPreview";

import styles from "./AccountsWrapper.module.css";

function AccountsWrapper() {
  const [activeAccount, setActiveAccount] = useState({});
  const { accounts } = useSelector((rootReducer) => rootReducer.accounts);
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.accounts}>
          {accounts.map((item) => (
            <span key={item.id} onClick={() => setActiveAccount(item)}>
              <AccountSmall
                {...item}
                account={item}
                active={activeAccount === item}
              />
            </span>
          ))}
        </div>
        <div className={styles.accountPreview}>
          {isEmpty(activeAccount) ? (
            <div className={styles.activeAccountEmpty}>
              <div className={styles.EmptyImage} />
              Для пред просмотра выберите аккаунт
            </div>
          ) : (
            <ActiveAccountPreview
              {...activeAccount}
              account={activeAccount}
              close={() => setActiveAccount({})}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountsWrapper;
