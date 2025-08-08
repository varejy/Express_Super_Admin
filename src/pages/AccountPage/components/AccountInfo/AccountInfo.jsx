import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { map } from "ramda";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Account from "../../../../components/Account/Account";
import Drawer from "../../../../components/Drawer/Drawer";
import SubTitle from "../../../../components/SubTitle/SubTitle";
import DescriptionCreator from "../../../../components/DescriptionCreator/DescriptionCreator";
import ColoredSubTitleGenerator from "../../../../components/ColoredSubTitleGenerator/ColoredSubTitleGenerator";
import SubmitAndCancelButtons from "../../../../components/Drawer/components/SubmitAndCancelButtons/SubmitAndCancelButtons";
import findServices from "../../../../utils/findServices";

import editOneAccount from "../../../../redux/services/Accounts/editOneAccount";

import styles from "./AccountInfo.module.css";
import { correctDataForForm } from "./utils/fixPutAccountBody";
import deleteAccount from "../../../../redux/services/Accounts/deleteOneAccount";
import { redirectTo } from "../../../../utils/redirectTo";

function AccountInfo({ account, onChangeActiveCompany, activeCompany }) {
  const [value, setValue] = useState("1");
  const [state, setState] = useState({
    ...account,
    allServicesLength: 0,
    tariff: {
      title: "",
    },
    tariffPlans: [],
  });
  const [drawerIsActive, setDrawer] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      dbHost: account.dbHost || "",
      dbPort: account.dbPort || null,
      dbName: account.dbName || "",
      dbUsername: account.dbUsername || "",
      dbPassword: account.dbPassword || "",
      title: account.title || "",
      position: account.position || "",
      language: account.language || 1,
      prepayment: account.prepayment || 1,
      activateAt: account.activateAt || new Date(),
      lastPaymentDay: account.lastPaymentDay || new Date(),
      services: account.services || ["passenger"],
      legalInformation: !account.additionalFields.legalInformation
        ? {
            address: "",
            bankDetails: "",
            taxIdentificationNumber: 0,
            phones: [""],
            emails: [""],
          }
        : account.additionalFields.legalInformation,
      contacts: account.additionalFields.contacts || [
        {
          name: "",
          role: "",
          phone: "",
          email: "",
        },
      ],
      superClientName: account.superClients[0].person.name || "",
      superClientLogin: account.superClients[0].person.login || "",
      superClientPassword:
        account.superClients[0].person.superClientPassword || "",
      superClientPhone: account.superClients[0].person.phones[0] || "",
    },
  });

  const toggleDrawer = (value) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(value);
  };

  useEffect(() => {
    let localAllServicesLength = 0;
    map((item) => {
      localAllServicesLength += item.taxiServices.length;
    }, state.companies);
    setState({
      ...state,
      allServicesLength: localAllServicesLength,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeActiveCompany = (id) => {
    onChangeActiveCompany(id);
  };

  const handleDelete = () => {
    dispatch(deleteAccount(account.id));
    redirectTo("/");
  };

  const onSubmit = () => {
    const formValues = form.getValues();

    const values = correctDataForForm(formValues);

    if (formValues.title !== "") {
      dispatch(
        editOneAccount({ ...values, superAccountId: account.id }, account.id)
      ).then((result) => {
        if (result.status === 200 || result.status === 201) {
          toggleDrawer()();
        } else if (result.status !== 200) {
          const stringify = JSON.stringify(result);
          const nameErrorField =
            JSON.parse(stringify).response &&
            JSON.parse(stringify).response.body.error.details[0].context.key;
          form.setError(nameErrorField, {
            type: "manual",
            message: `Заполните поле ${nameErrorField} корректно!`,
          });
        }
      });
    } else {
      form.setError("title");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{state.title}</div>
        <SubTitle
          values={[
            "Активный",
            state.position,
            `Дата активации: ${state.activateAt}`,
          ]}
        />
      </div>
      <span className={classNames(styles.displayFlex, styles.txtBtnWrapper)}>
        <div className={styles.button}>Мониторинг работоспособности</div>
        <div
          className={styles.button}
          type="button"
          onClick={() => setDrawer(true)}
        >
          Редактировать аккаунт
        </div>
      </span>
      <div className={styles.dispatcher}>
        <div>
          <div className={styles.dispatcherTitle}>Диспетчерские</div>
          <SubTitle
            values={["Диспетчерская 1 (2)", "Диспетчерская 2 (3)", "Дис..."]}
          />
        </div>
        <div className={styles.previewBtn}>
          Подробнее
          <div className={styles.previewBtnIcon} />
        </div>
      </div>
      <div className={styles.table}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="account">
            <Tab label="Общая информация" className={styles.tab} value="1" />
            <Tab label="Юр. информация" className={styles.tab} value="2" />
          </TabList>
          <TabPanel value="1" className={styles.panel}>
            <DescriptionCreator
              className={styles.tableContent}
              margin="3px 3px"
              values={[
                { key: "Последние изменения:", value: state.activateAt },
                { key: "Тип создания:", value: "вручную" },
                {
                  key: "Вид деятельности:",
                  value: findServices(state.additionalFields.services)
                    .filter((i) => i !== false)
                    .join(", "),
                },
                {
                  key: "Владелец:",
                  value: state.superClients[0].person.name,
                },
                {
                  key: "Телефон:",
                  value: state.superClients[0].person.phones,
                },
                { key: "Email:", value: state.superClients[0].login },
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
                  value: state.additionalFields.legalInformation.address,
                },
                {
                  key: "ИНН:",
                  value:
                    state.additionalFields.legalInformation
                      .taxIdentificationNumber,
                },
                {
                  key: "Банковские реквизиты:",
                  value: state.additionalFields.legalInformation.bankDetails,
                },
                {
                  key: "Телефоны:",
                  value:
                    state.additionalFields.legalInformation.phones.join(", "),
                },
                {
                  key: "Emails:",
                  value:
                    state.additionalFields.legalInformation.emails.join(", "),
                },
              ]}
            />
          </TabPanel>
        </TabContext>
      </div>
      <div className={styles.companyHeader}>
        <div>Компании</div>
        <ColoredSubTitleGenerator
          values={[
            {
              key: "Критических ошибок:",
              value: 0,
              color: "#F83528",
            },
            { key: "Всего компаний:", value: state.companies.length },
            { key: "Всего филиалов:", value: state.allServicesLength },
          ]}
        />
      </div>
      <div className={styles.companies}>
        {state.companies.map((item, i) => (
          <div
            className={classNames(
              styles.company,
              activeCompany === i && styles.activeCompany
            )}
            onClick={() => handleChangeActiveCompany(i)}
            key={item.title}
          >
            <div className={styles.contentCompany}>
              <div className={styles.companyTxt}>
                <div className={styles.companyName}>{item.title}</div>
                <SubTitle
                  values={[
                    `Филиалов: ${item.taxiServices.length}`,
                    item.tariffPlanToCompany.tariffPlan.title,
                    `Дата создания: ${state.activateAt}`,
                  ]}
                />
              </div>
              <div className={styles.errors}>
                <div className={styles.errorIcon} />
                <div>0</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Drawer
        status={drawerIsActive}
        component={
          <div className={styles.formWrapper}>
            <div className={styles.container}>
              <div className={styles.title}>Редактировать аккаунт</div>
              <Account
                form={form}
                onSubmit={onSubmit}
                toggleDrawer={toggleDrawer}
              />
            </div>
            <SubmitAndCancelButtons
              redactAccountType
              handleSubmit={onSubmit}
              handleDelete={handleDelete}
              handleClose={toggleDrawer()}
              approveText="Сохранить изменения"
            />
          </div>
        }
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}

export default AccountInfo;
