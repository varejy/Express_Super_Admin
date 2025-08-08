import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import BlueButton from "../../../../components/BlueButton/BlueButton";
import EditButton from "../../../../components/EditButton/EditButton";
import SubTitle from "../../../../components/SubTitle/SubTitle";
import DescriptionCreator from "../../../../components/DescriptionCreator/DescriptionCreator";

import groupIcon from "./icons/groupIcon.svg";
import activeAccordionIcon from "../../../../assets/icons/icons_circleActive.svg";
import notActiveAccordionIcon from "../../../../assets/icons/icons_circleNotActive.svg";

import styles from "./ServicesInfo.module.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "5px",
  margin: "10px 0",
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<div className={styles.accordionIcon} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  padding: "11px ​13px",
  flexDirection: "row-reverse",

  "& .MuiAccordionSummary-expandIconWrapper": {
    background: `url(${notActiveAccordionIcon})`,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
    background: `url(${activeAccordionIcon})`,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: "17px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "11px ​13px 16px !important",
}));

function ServicesInfo(props) {
  const [state, setState] = useState({
    ...props.account.companies[props.activeCompany],
    activeCompanyLocal: props.activeCompany,
  });
  const [value, setValue] = useState("1");
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeTable = (event, newValue) => {
    setValue(newValue);
  };

  if (props.activeCompany !== state.activeCompanyLocal) {
    setState({
      ...props.account.companies[props.activeCompany],
      activeCompanyLocal: props.activeCompany,
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>Филиалы компании</div>
            <SubTitle
              values={["2 группы", `${state.taxiServices.length} филиалов`]}
            />
          </div>
          <div className={styles.displayFlex}>
            <EditButton
              icon={
                <div
                  style={{
                    background: `url(${groupIcon}) no-repeat`,
                    width: "100%",
                    height: "100%",
                  }}
                />
              }
              smallPadding
            />
            <BlueButton label="+ Добавить филиал" />
          </div>
        </div>
        <div className={styles.services}>
          {state.taxiServices.map((item, i) => (
            <Accordion
              key={item.title}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <div>
                  <div className={styles.accordionTitle}>{item.title}</div>
                  <SubTitle
                    values={[item.position, "Название диспетчерской"]}
                  />
                </div>
                <div className={styles.displayFlex}>
                  {item.serviceErrors ? (
                    <div className={styles.errors}>
                      <div className={styles.errorIcon} />
                      <div>{item.serviceErrors}</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <EditButton onClick={props.toggleDrawer(true)} />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <DescriptionCreator
                  className={styles.tableContent}
                  margin="3px 3px"
                  values={[
                    {
                      key: "Город:",
                      value: item.position,
                    },
                    {
                      key: "Группа филиалов:",
                      value: "Название группы филиалов",
                    },
                  ]}
                />
              </AccordionDetails>
              <TabContext value={value} className={styles.table}>
                <TabList onChange={handleChangeTable} aria-label="account">
                  <Tab
                    label="Контактная информация"
                    className={styles.tab}
                    value="1"
                  />
                  <Tab
                    label="Юр. информация"
                    className={styles.tab}
                    value="2"
                  />
                </TabList>
                <TabPanel value="1" className={styles.panel}>
                  {item.additionalFields.contacts ? (
                    item.additionalFields.contacts.map((item) => (
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
                    ))
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value="2" className={styles.panel}>
                  {item.additionalFields.legalInformation ? (
                    <DescriptionCreator
                      className={styles.tableContent}
                      margin="3px 3px"
                      values={[
                        {
                          key: "Юридический адрес:",
                          value: item.additionalFields.legalInformation.address,
                        },
                        {
                          key: "ИНН:",
                          value:
                            item.additionalFields.legalInformation
                              .taxIdentificationNumber,
                        },
                        {
                          key: "Банковские реквизиты:",
                          value:
                            item.additionalFields.legalInformation.bankDetails,
                        },
                        {
                          key: "Телефоны:",
                          value:
                            item.additionalFields.legalInformation.phones.join(
                              ", "
                            ),
                        },
                        {
                          key: "Emails:",
                          value:
                            item.additionalFields.legalInformation.emails.join(
                              ", "
                            ),
                        },
                      ]}
                    />
                  ) : (
                    <></>
                  )}
                </TabPanel>
              </TabContext>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesInfo;
