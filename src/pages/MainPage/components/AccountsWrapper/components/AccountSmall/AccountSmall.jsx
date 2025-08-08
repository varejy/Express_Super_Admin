import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";

import SubTitle from "../../../../../../components/SubTitle/SubTitle";
import DescriptionCreator from "../../../../../../components/DescriptionCreator/DescriptionCreator";

import setActiveAccount from "../../../../../../redux/actions/Accounts/setActiveAccount";

import styles from "./AccountSmall.module.css";

function AccountSmall(props) {
  const [services, setServices] = useState(0);
  const dispatch = useDispatch();

  const handleSetActiveAccount = () => {
    dispatch(setActiveAccount(props.account));
  };

  useEffect(() => {
    let servicesLength = 0;
    props.companies.forEach((item) => {
      servicesLength += item.taxiServices.length;
    });
    setServices(servicesLength);
  });
  return (
    <div
      className={classNames(
        styles.wrapper,
        props.active && styles.activeAccount
      )}
    >
      <Link
        to={`/AccountPage/${props.id}`}
        onClick={handleSetActiveAccount}
        className={styles.title}
      >
        {props.title}
      </Link>
      <SubTitle
        values={[
          "Активный",
          props.position,
          `Дата создания: ${props.activateAt}`,
        ]}
      />
      <div className={styles.descriptionWrapper}>
        <DescriptionCreator
          values={[
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
        <Divider
          orientation="vertical"
          variant="middle"
          style={{ width: "1px", height: "59px" }}
        />
        <div className={styles.stats}>
          <div className={styles.stat}>
            Всего компаний:
            <span className={styles.statValue}>{props.companies.length}</span>
          </div>
          <div className={styles.stat}>
            Всего филиалов:
            <span className={styles.statValue}>{services}</span>
          </div>
          <div className={styles.stat}>
            Крит. ошибок:
            <span className={styles.statValue} style={{ color: "#f83528" }}>
              0
            </span>
          </div>
        </div>
      </div>
      <div className={styles.chipsWrapper}>
        <div className={styles.chip}>Киев</div>
        <div className={styles.chip}>Львов</div>
      </div>
    </div>
  );
}

export default AccountSmall;
