/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { Tab } from "semantic-ui-react";

import Company from "../../../../../../components/Company/Company";
import Account from "../../../../../../components/Account/Account";
import SubmitAndCancelButtons from "../../../../../../components/Drawer/components/SubmitAndCancelButtons/SubmitAndCancelButtons";

import addNewAccount from "../../../../../../redux/services/Accounts/addNewAccount";
import getAllTariffPlans from "../../../../../../redux/services/TariffPlans/getAllTariffPlans";

import { correctDataForForm } from "./utils/correctedFormFieldsData";

import styles from "./CreateAccountForm.module.css";

function CreateAccountForm({ account, toggleDrawer, index }) {
  const defaultCompany = {
    companyTitle: "",
    companyDomain: "",
    companyPosition: "Ukraine",
    companyServices: ["passenger"],
    companyLegalInformation: {
      address: "",
      bankDetails: "",
      taxIdentificationNumber: 0,
      phones: [""],
      emails: [""],
    },
    companyContacts: [
      {
        name: "",
        role: "",
        phone: "",
        email: "",
      },
    ],
    tariffPlanId: 0,
    tariffAdditionalServices: [
      {
        title: "",
        active: false,
        id: 0,
      },
    ],
    taxiServices: [
      {
        serviceId: 0,
        serviceTitle: "",
        servicePosition: "",
        serviceVersion: "",
        serviceServices: ["passenger"],
        serviceLegalInformation: {
          address: "",
          bankDetails: "",
          taxIdentificationNumber: 0,
          phones: [""],
          emails: [""],
        },
        serviceContacts: [
          {
            name: "",
            role: "",
            phone: "",
            email: "",
          },
        ],
      },
    ],
  };
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
      legalInformation: {
        address: account.legalInformation.address || "",
        bankDetails: account.legalInformation.bankDetails || "",
        taxIdentificationNumber:
          account.legalInformation.taxIdentificationNumber || 0,
        phones: account.legalInformation.phones || [""],
        emails: account.legalInformation.emails || [""],
      },
      contacts: account.contacts || [
        {
          name: "",
          role: "",
          phone: "",
          email: "",
        },
      ],
      superClientName: account.superClientName || "",
      superClientLogin: account.superClientLogin || "",
      superClientPassword: account.superClientPassword || "",
      superClientPhone: account.superClientPhone || "",
      companies: account.companies || [defaultCompany],
    },
  });

  const dispatch = useDispatch();
  const [companies, setCompanies] = useState(form.getValues("companies"));
  const [activeCompany, setActiveCompany] = useState(0);

  const handleAddCompany = (key) => {
    setCompanies([...companies, defaultCompany]);
    form.setValue("companies", [...companies, defaultCompany]);
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter((item, i) => i !== id));
    setActiveCompany(companies.length - 2);
  };

  const handleTabChange = (e, { activeIndex }) => {
    setActiveCompany(activeIndex);
  };

  const AddCompanyButton = (props) => (
    <div
      onClick={() => handleAddCompany(index)}
      className={styles.addCompanyBtn}
    />
  );

  const onSubmit = () => {
    const formValues = form.getValues();
    const values = correctDataForForm(formValues);

    if (formValues.title !== "" || formValues.superClientPhone !== "") {
      dispatch(addNewAccount(values)).then((result) => {
        if (result.status === 200 || result.status === 201) {
          toggleDrawer()();
        } else if (result.status !== 200) {
          const stringify = JSON.stringify(result);
          if (
            JSON.parse(stringify).response.body.error.message ===
            "Super account wasn't created"
          ) {
            console.log("Не заполнено поле");
          } else {
            const nameErrorField =
              JSON.parse(stringify).response &&
              JSON.parse(stringify).response.body.error.details[0].context.key;
            console.log(nameErrorField, "nameErrorField");
            form.setError(nameErrorField, {
              type: "manual",
              message: `Заполните поле ${nameErrorField} корректно!`,
            });
          }
        }
      });
    } else {
      if (formValues.title === "") {
        form.setError("title");
      }
      if (formValues.superClientPhone === "") {
        form.setError("superClientPhone");
      }
    }
  };

  const companiesRender = [...companies, { title: "+" }];

  useEffect(() => {
    dispatch(getAllTariffPlans());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Создать аккаунт</div>
        <Account form={form} onSubmit={onSubmit} />
        <Tab
          className={styles.tabs}
          activeIndex={activeCompany}
          onTabChange={handleTabChange}
          panes={companiesRender.map((item, i) =>
            !item.title
              ? {
                  menuItem: `Компания ${i + 1}`,
                  render: () => (
                    <Company
                      {...item}
                      form={form}
                      onSubmit={onSubmit}
                      key={Math.random() * 1000}
                      company={item}
                      handleDeleteCompany={handleDeleteCompany}
                      servicesTypes={
                        form.getValues("passenger") === undefined
                          ? ["cargo", "tow", "passenger"]
                          : form.watch(["cargo", "tow", "passenger"])
                      }
                      companyNumber={i + 1}
                    />
                  ),
                }
              : {
                  menuItem: (
                    <AddCompanyButton
                      key={Math.random() * 1000}
                      index={companies.length + 1}
                    />
                  ),
                }
          )}
        />
      </div>
      <SubmitAndCancelButtons
        handleSubmit={onSubmit}
        handleClose={toggleDrawer()}
        approveText="Создать аккаунт"
      />
    </div>
  );
}

CreateAccountForm.defaultProps = {
  account: {
    legalInformation: {},
    contacts: [{}],
    companies: [
      {
        companyTitle: "",
        companyDomain: "",
        companyPosition: "",
        companyServices: ["passenger"],
        companyLegalInformation: {
          address: "",
          bankDetails: "",
          taxIdentificationNumber: 0,
          phones: [""],
          emails: [""],
        },
        companyContacts: [
          {
            name: "",
            role: "",
            phone: "",
            email: "",
          },
        ],
        tariffPlanId: 0,
        taxiServices: [
          {
            serviceId: 0,
            serviceTitle: "",
            servicePosition: "",
            serviceVersion: "",
            serviceServices: ["passenger"],
            serviceLegalInformation: {
              address: "",
              bankDetails: "",
              taxIdentificationNumber: 0,
              phones: [""],
              emails: [""],
            },
            serviceContacts: [
              {
                name: "",
                role: "",
                phone: "",
                email: "",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default CreateAccountForm;
