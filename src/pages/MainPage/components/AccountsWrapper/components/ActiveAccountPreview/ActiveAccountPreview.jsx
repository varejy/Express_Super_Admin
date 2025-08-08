import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import SubTitle from "../../../../../../components/SubTitle/SubTitle";
import DescriptionCreator from "../../../../../../components/DescriptionCreator/DescriptionCreator";

import findServices from "../../../../../../utils/findServices";
import setActiveAccount from "../../../../../../redux/actions/Accounts/setActiveAccount";

import styles from "./ActiveAccountPreview.module.css";

function ActiveAccountPreview(props) {
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();

  const handleSetActiveAccount = () => {
    dispatch(setActiveAccount(props.account));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <div
          onClick={() => props.close()}
          className={classNames(styles.close, styles.button)}
        />
        <span className={classNames(styles.displayFlex, styles.txtBtnWrapper)}>
          <div className={styles.button}>Мониторинг работоспособности</div>
          <Link
            className={styles.button}
            onClick={handleSetActiveAccount}
            to={`/AccountPage/${props.id}`}
          >
            Перейти в аккаунт
          </Link>
        </span>
      </div>
      <div className={styles.accountInfo}>
        <div className={styles.title}>{props.title}</div>
        <SubTitle
          values={[
            "Активный",
            props.position,
            `Дата активации: ${props.activateAt}`,
          ]}
        />
        <div className={styles.table}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="account">
              <Tab label="Общая информация" value="1" />
              <Tab label="Юридическая информация" value="2" />
            </TabList>
            <TabPanel value="1" className={styles.panel}>
              <DescriptionCreator
                className={styles.tableContent}
                margin="3px 3px"
                values={[
                  { key: "Последние изменения:", value: props.activateAt },
                  { key: "Тип создания:", value: "вручную" },
                  {
                    key: "Вид деятельности:",
                    value: findServices(props.additionalFields.services)
                      .filter((i) => i !== false)
                      .join(", "),
                  },
                  {
                    key: "Владелец:",
                    value: props.superClients[0].person.name,
                  },
                  {
                    key: "Телефон:",
                    value: props.superClients[0].person.phones,
                  },
                  { key: "Email:", value: props.superClients[0].login },
                ]}
              />
            </TabPanel>
            <TabPanel value="2" className={styles.panel}>
              <DescriptionCreator
                className={styles.tableContent}
                margin="3px 3px"
                values={[
                  {
                    key: "Юридический адрес:",
                    value: props.additionalFields.legalInformation.address,
                  },
                  {
                    key: "ИНН:",
                    value:
                      props.additionalFields.legalInformation
                        .taxIdentificationNumber,
                  },
                  {
                    key: "Банковские реквизиты:",
                    value: props.additionalFields.legalInformation.bankDetails,
                  },
                  {
                    key: "Телефоны:",
                    value:
                      props.additionalFields.legalInformation.phones.join(", "),
                  },
                  {
                    key: "Emails:",
                    value:
                      props.additionalFields.legalInformation.emails.join(", "),
                  },
                ]}
              />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
}

export default ActiveAccountPreview;
