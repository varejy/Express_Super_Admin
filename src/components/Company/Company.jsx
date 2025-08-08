/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWatch, Controller } from "react-hook-form";

import classNames from "classnames";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Tab } from "semantic-ui-react";

import { type } from "ramda";
import FormFieldGenerator from "../FormFieldGenerator/FormFieldGenerator";
import CountriesSelectField from "../CountriesSelectField/CountriesSelectField";
import CreateBtnGenerator from "../CreateBtnGenerator/CreateBtnGenerator";
import SubTitle from "../SubTitle/SubTitle";
import ContactFaceField from "../../pages/MainPage/components/AccountsWrapper/components/CreateAccountForm/components/ContactFaceField/ContactFaceField";
import ServiceField from "./components/ServiceField/ServiceField";

import findServices from "../../utils/findServices";

import accordionIcon from "./icons/dashicons_arrow.svg";
import activeAccordionIcon from "../../assets/icons/icons_circleActive.svg";
import notActiveAccordionIcon from "../../assets/icons/icons_circleNotActive.svg";

import getAllFakeIDs from "../../redux/services/TaxiService/getAllFakeIDs";

import { tariffIntervalOptions } from "../../redux/constants/intervalOptions";

import styles from "../Account/Account.module.css";
import localStyles from "./Company.module.css";
import AddonService from "./components/AddonService/AddonService";
import RadioButton from "../RadioButton/RadioButton";

const AccordionTariff = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  transitionDuration: "1s",
}));

const AccordionSummaryTariff = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<div className={styles.accordionIcon} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#FFFFFF",
  transitionDuration: "1s",

  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper": {
    background: `url(${accordionIcon}) no-repeat`,
    transform: "rotate(180deg)",
    margin: "0 10px",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
    background: `url(${accordionIcon}) no-repeat`,
    margin: "0 10px",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const AccordionCompany = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummaryCompany = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<div className={styles.accordionIcon} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#FFFFFF",

  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    background: `url(${notActiveAccordionIcon})`,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
    background: `url(${activeAccordionIcon})`,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

function Company({
  form: { register, control, setValue, getValues, handleSubmit },
  form,
  onSubmit,
  companyNumber,
  handleDeleteCompany,
  servicesTypes,
}) {
  useWatch({
    control,
    name: [
      `companies[${companyNumber - 1}].tariffAdditionalServices`,
      `companies[${companyNumber - 1}].taxiServices.length`,
    ],
  });
  const {
    taxiServices: {
      fakeIDs: {
        status,
        data: { items = [] },
      },
    },
    tariffPlans: { tariffPlans },
  } = useSelector((rootReducer) => rootReducer);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState();
  const [expandedTariffPlans, setExpandedTariffPlans] = useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeT = (panel) => (event, newExpanded) => {
    setExpandedTariffPlans(newExpanded ? panel : false);
  };
  const [activeService, setActiveService] = useState(0);

  const handleTabChange = (e, { activeIndex }) => {
    setActiveService(activeIndex);
  };

  const { taxiServices } = form.getValues().companies[companyNumber - 1];

  const handleDeleteService = (id) => {
    setValue(
      `companies[${companyNumber - 1}].taxiServices`,
      taxiServices.filter((service, i) => id !== i)
    );
    setActiveService(taxiServices.length - 2);
  };

  useEffect(() => {
    !status && dispatch(getAllFakeIDs());
  }, []);

  const handleAddService = (key) => {
    setValue(`companies[${companyNumber - 1}].taxiServices`, [
      ...taxiServices,
      {
        serviceTitle: "",
        servicePosition: "",
      },
    ]);
  };

  const AddServiceButton = (index) => (
    <div
      onClick={() => handleAddService(index)}
      className={localStyles.addServiceBtn}
    />
  );

  const findOption = (service, options) =>
    options.find((item) => item.key === +service.interval);

  const addonServices =
    getValues().companies[companyNumber - 1].tariffAdditionalServices;
  const multiCity =
    addonServices !== undefined &&
    addonServices
      .filter((e) => e)
      .find((elem) => elem.title === "Мультигород" && elem);

  return (
    <div className={styles.contentWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.subTitle}>
          {`Компания ${companyNumber}`}
          <div className={localStyles.buttons}>
            <div className={localStyles.cloneBtn}>
              <div className={localStyles.cloneBtnIcon} />
              Продублировать с аккаунта
            </div>
            {companyNumber !== 1 && (
              <div
                className={localStyles.deleteBtn}
                onClick={() => handleDeleteCompany(companyNumber - 1)}
              >
                <div className={localStyles.deleteBtnIcon} />
                Удалить компанию
              </div>
            )}
          </div>
        </div>
        <FormFieldGenerator
          text="Название компании"
          value={
            <TextField
              className={styles.fieldValue}
              hiddenLabel
              {...register(`companies[${companyNumber - 1}].companyTitle`)}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="Домен компании"
          value={
            <TextField
              className={styles.fieldValue}
              hiddenLabel
              {...register(`companies[${companyNumber - 1}].companyDomain`)}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="Вид деятельности"
          value={
            <div
              className={classNames(styles.valueContainer, styles.fieldValue)}
            >
              {servicesTypes
                .filter((item) => item !== false)
                .map((item, i) => (
                  <FormControlLabel
                    key={Math.random() * 10000}
                    className={styles.formCheckBox}
                    value={item}
                    control={
                      <Checkbox
                        defaultChecked
                        checkedIcon={<div className={styles.checkedImage} />}
                        className={styles.checkbox}
                        {...register(
                          `companies[${
                            companyNumber - 1
                          }].companyServices[${i}]`
                        )}
                      />
                    }
                    label={findServices([item])}
                  />
                ))}
            </div>
          }
        />
        <CountriesSelectField
          control={control}
          name={`companies[${companyNumber - 1}].companyPosition`}
        />
        <FormFieldGenerator
          text="Город"
          value={
            <TextField
              className={styles.fieldValue}
              hiddenLabel
              {...register(`companies[${companyNumber - 1}].companyCity`, {
                required: true,
              })}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <AccordionCompany
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummaryCompany
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={localStyles.accordionTitle}>
              Юридическая информация
            </div>
          </AccordionSummaryCompany>
          <AccordionDetails>
            <div style={{ width: "98%", margin: "0 0 0 7%" }}>
              <FormFieldGenerator
                text="Юридический адрес"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    {...register(
                      `companies[${
                        companyNumber - 1
                      }].companyLegalInformation.address`
                    )}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="Банковские реквизиты"
                value={
                  <TextField
                    className={styles.fieldValue}
                    type="number"
                    hiddenLabel
                    {...register(
                      `companies[${
                        companyNumber - 1
                      }].companyLegalInformation.bankDetails`
                    )}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="ИНН"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    type="number"
                    {...register(
                      `companies[${
                        companyNumber - 1
                      }].companyLegalInformation.taxIdentificationNumber`
                    )}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="Контактный телефон"
                alignStart
                value={
                  <div
                    className={classNames(
                      styles.valueContainer,
                      styles.fieldValue
                    )}
                  >
                    <TextField
                      className={styles.fieldValue}
                      hiddenLabel
                      {...register(
                        `companies[${
                          companyNumber - 1
                        }].companyLegalInformation.phones[0]`
                      )}
                      type="number"
                      placeholder="Ввести..."
                      size="small"
                    />
                    <CreateBtnGenerator text="Добавить телефон" />
                  </div>
                }
              />
              <FormFieldGenerator
                text="Email"
                alignStart
                value={
                  <div
                    className={classNames(
                      styles.valueContainer,
                      styles.fieldValue
                    )}
                  >
                    <TextField
                      className={styles.fieldValue}
                      type="email"
                      hiddenLabel
                      {...register(
                        `companies[${
                          companyNumber - 1
                        }].companyLegalInformation.emails[0]`
                      )}
                      placeholder="Ввести..."
                      size="small"
                    />
                    <CreateBtnGenerator text="Добавить email" />
                  </div>
                }
              />
            </div>
          </AccordionDetails>
        </AccordionCompany>
        <AccordionCompany
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummaryCompany
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <div className={localStyles.accordionTitle}>Контактные лица</div>
            <CreateBtnGenerator text="Добавить контактное лицо" />
          </AccordionSummaryCompany>
          <AccordionDetails>
            <ContactFaceField
              companyNumber={companyNumber - 1}
              control={control}
              index={1}
            />
          </AccordionDetails>
        </AccordionCompany>
        <AccordionCompany
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummaryCompany
            aria-controls="panel3d-contentTariffs"
            id="panel3d-header-contentTariffs"
          >
            <div className={localStyles.accordionTitle}>Тарифный план</div>
          </AccordionSummaryCompany>
          <AccordionDetails>
            <div className={localStyles.tariffContainer}>
              <Controller
                name={`companies[${companyNumber - 1}].tariffPlanId`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    className={localStyles.tariffContainer}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    {tariffPlans
                      .filter((item) => item.status === 0)
                      .map((item, i) => {
                        const cutString = (str) =>
                          str.substr(0, str.length - 2);
                        const tariffPrice =
                          multiCity === (false || undefined)
                            ? item.price
                            : multiCity.tariffId === item.id
                            ? getValues().companies[companyNumber - 1]
                                .taxiServices.length === 1
                              ? item.price
                              : +item.price +
                                multiCity.price *
                                  getValues().companies[companyNumber - 1]
                                    .taxiServices.length -
                                1
                            : item.price;
                        return (
                          <AccordionTariff
                            key={Math.random() * 1000}
                            expanded={expandedTariffPlans === `Tpanel${i}`}
                            onChange={handleChangeT(`Tpanel${i}`)}
                          >
                            <AccordionSummaryTariff
                              aria-controls="panel1d-contentTariffs"
                              id="panel1d-header-contentTariffs"
                            >
                              <span style={{ display: "flex" }}>
                                <FormControlLabel
                                  className={localStyles.formRadioBTN}
                                  value={item.id}
                                  control={
                                    <RadioButton value={item.id} ref={null} />
                                  }
                                  label=""
                                />

                                <div className={localStyles.accordionTitle}>
                                  {item.title}
                                  <SubTitle
                                    smallTxt
                                    values={[
                                      `${item.price}
                                ${cutString(
                                  findOption(item, tariffIntervalOptions).text
                                )}`,
                                      `${item.configuration.drivers} водителей вкл.`,
                                    ]}
                                  />
                                </div>
                              </span>
                              <div className={localStyles.priceWrapper}>
                                {`${tariffPrice} ${cutString(
                                  findOption(item, tariffIntervalOptions).text
                                )}`}
                              </div>
                            </AccordionSummaryTariff>
                            <AccordionDetails>
                              <div className={localStyles.description}>
                                <div className={localStyles.descriptionTitle}>
                                  Включено в тариф:
                                </div>
                                <div className={localStyles.tariffDescription}>
                                  {item.tariffPlanServices.map(
                                    (service) =>
                                      service.addonToTariffPlan.isIncluded ===
                                        false && <div>{service.title}</div>
                                  )}
                                </div>
                                <div className={localStyles.descriptionTitle}>
                                  Дополнительные услуги
                                </div>
                                <div className={localStyles.addonServices}>
                                  {item.tariffPlanServices.map(
                                    (service, i) =>
                                      !service.addonToTariffPlan.isIncluded && (
                                        <AddonService
                                          {...service}
                                          servicesLength={
                                            getValues().companies[
                                              companyNumber - 1
                                            ].taxiServices.length
                                          }
                                          tariffId={item.id}
                                          form={form}
                                          companyIndex={companyNumber - 1}
                                          control={control}
                                          addonService={service}
                                          index={i}
                                        />
                                      )
                                  )}
                                </div>
                              </div>
                            </AccordionDetails>
                          </AccordionTariff>
                        );
                      })}
                  </RadioGroup>
                )}
              />
            </div>
          </AccordionDetails>
        </AccordionCompany>
        <Tab
          className={localStyles.tabs}
          activeIndex={activeService}
          onTabChange={handleTabChange}
          panes={[...taxiServices, { title: "+" }].map((item, i) =>
            !item.title
              ? {
                  menuItem: `Филиал ${i + 1}`,
                  render: () => (
                    <ServiceField
                      form={form}
                      onSubmit={onSubmit}
                      companyIndex={companyNumber - 1}
                      fakeIds={items}
                      key={Math.random() * 1000}
                      service={item}
                      handleDelete={handleDeleteService}
                      indexFake={i + 1}
                      indexR={i}
                    />
                  ),
                }
              : type(multiCity) === "Object" && {
                  menuItem: (
                    <AddServiceButton
                      key={Math.random() * 1000}
                      index={taxiServices.length + 1}
                    />
                  ),
                }
          )}
        />
      </form>
    </div>
  );
}

export default Company;
