/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { Tab } from "semantic-ui-react";

import Company from "../Company/Company";
import SubmitAndCancelButtons from "../Drawer/components/SubmitAndCancelButtons/SubmitAndCancelButtons";

import getAllTariffPlans from "../../redux/services/TariffPlans/getAllTariffPlans";

import styles from "./EditCompanyForm.module.css";

function EditCompanyForm({ account, toggleDrawer, index }) {
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
      companies: account.companies
        ? account.companies.map((company) => ({
            companyTitle: company.title,
            companyDomain: company.domain,
            companyPosition: company.position,
            companyServices: company.additionalFields.services,
            companyLegalInformation: company.additionalFields.legalInformation,
            companyContacts: company.additionalFields.contacts,
            tariffPlanToCompanyId: 0,
            tariffAdditionalServices: [
              {
                title: "",
                active: false,
                id: 0,
              },
            ],
            taxiServices: company.taxiServices.map((service) => ({
              serviceId: service.id,
              serviceTitle: service.title,
              servicePosition: service.position,
              serviceVersion: service.version,
              serviceServices: service.additionalFields.services,
              serviceLegalInformation:
                service.additionalFields.legalInformation,
              serviceContacts: [
                {
                  name: "",
                  role: "",
                  phone: "",
                  email: "",
                },
              ],
            })),
          }))
        : [defaultCompany],
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
    console.log(form.getValues());
  };

  const companiesRender = [...companies, { title: "+" }];
  useEffect(() => {
    dispatch(getAllTariffPlans());
  }, []);

  console.log(account.companies);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Редактировать компании</div>
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
        approveText="Сохранить изменения"
      />
    </div>
  );
}

EditCompanyForm.defaultProps = {
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

export default EditCompanyForm;
