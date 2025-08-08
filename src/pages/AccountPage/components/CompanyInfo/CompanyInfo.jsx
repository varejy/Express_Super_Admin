import React, { useState } from "react";

import SubTitle from "../../../../components/SubTitle/SubTitle";
import DescriptionCreator from "../../../../components/DescriptionCreator/DescriptionCreator";
import EditButton from "../../../../components/EditButton/EditButton";

import findServices from "../../../../utils/findServices";

import styles from "./CompanyInfo.module.css";

function CompanyInfo(props) {
  const [state, setState] = useState({
    ...props.company,
    activeCompanyLocal: props.activeCompany,
    tariff: {
      title: "",
    },
  });

  const correctCompanyPositionCountry =
    state.position.length !== 0
      ? state.position.substring(0, state.position.search(","))
      : "";

  const correctCompanyPositionCity =
    state.position.length !== 0
      ? state.position.substring(
          state.position.search(" "),
          state.position.length
        )
      : "";

  if (props.activeCompany !== state.activeCompanyLocal) {
    setState({
      ...state,
      ...props.company,
      activeCompanyLocal: props.activeCompany,
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{state.title}</div>
            <SubTitle
              values={[
                state.position,
                `Филиалов: ${state.taxiServices.length}`,
              ]}
            />
          </div>
          <EditButton onClick={props.toggleDrawer(true)} />
        </div>

        <div className={styles.dispatcher}>
          <div>
            <div className={styles.dispatcherTitle}>
              {state.tariffPlanToCompany.tariffPlan.title}
            </div>
            <SubTitle
              values={["Диспетчерская 1 (2)", "Диспетчерская 2 (3)", "Дис..."]}
            />
          </div>
          <div className={styles.previewBtn}>
            Подробнее
            <div className={styles.previewBtnIcon} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.smallTitle}>Общая информация</div>
          <SubTitle
            values={[
              `Страна: ${correctCompanyPositionCountry}`,
              `Город: ${correctCompanyPositionCity}`,
            ]}
          />
          <div className={styles.descriptionPosition} />
          <DescriptionCreator
            className={styles.tableContent}
            margin="3px 3px"
            values={[
              {
                key: "Вид деятельности:",
                value: findServices(state.additionalFields.services)
                  .filter((i) => i !== false)
                  .join(", "),
              },
              { key: "Основной картографический сервис:", value: "Google" },
              { key: "Резервный картографический сервис:", value: "Visicom" },
            ]}
          />
          <div className={styles.divider} />
          <div className={styles.legalInfo}>
            <div className={styles.smallTitle}>Юридическая информация</div>
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
          </div>
          <div className={styles.divider} />
          {state.additionalFields.contacts && (
            <div className={styles.contactsWrapper}>
              <div className={styles.smallTitle}>Контактная информация</div>
              {state.additionalFields.contacts.map((item) => (
                <div className={styles.contact}>
                  <div className={styles.contactName}>{item.name}</div>
                  <SubTitle values={["HR Manager"]} />
                  <DescriptionCreator
                    className={styles.tableContent}
                    margin="3px 3px"
                    values={[
                      {
                        key: "Телефон:",
                        value: item.phone,
                      },
                      {
                        key: "Email:",
                        value: item.email,
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
