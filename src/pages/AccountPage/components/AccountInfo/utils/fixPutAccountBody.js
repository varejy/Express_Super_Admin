import { format } from "date-fns";

export function correctDataForForm(formValues) {
  return {
    dbHost: formValues.dbHost === "" ? formValues.title : formValues.dbHost,
    dbPort: +formValues.dbPort,
    dbName: formValues.dbName === "" ? formValues.title : formValues.dbName,
    dbUsername:
      formValues.dbUsername === "" ? formValues.title : formValues.dbUsername,
    dbPassword:
      formValues.dbPassword === "" ? formValues.title : formValues.dbPassword,
    title: formValues.title || "",
    position: formValues.city === "" ? "Украина, Киев" : formValues.city,
    language: formValues.language || 1,
    prepayment: formValues.prepayment || 1,
    activateAt:
      formValues.activateAt === undefined
        ? format(new Date(), "yyyy-MM-dd")
        : format(new Date(formValues.activateAt), "yyyy-MM-dd"),
    lastPaymentDay:
      formValues.lastPaymentDay === undefined
        ? format(new Date(), "yyyy-MM-dd")
        : format(new Date(formValues.lastPaymentDay), "yyyy-MM-dd"),
    services: [
      formValues.passenger && "passenger",
      formValues.cargo && "cargo",
      formValues.tow && "tow",
    ].filter((item) => item !== false),
    legalInformation: {
      address:
        formValues.legalAddress === ""
          ? "Украина, Киев"
          : formValues.legalAddress,
      bankDetails:
        formValues.legalBankNumber === ""
          ? formValues.title
          : formValues.legalBankNumber,
      taxIdentificationNumber:
        formValues.INN === "" ? 111111111 : formValues.INN,
      phones: [
        formValues.legalNumber === ""
          ? formValues.superClientPhone
          : formValues.legalNumber,
      ],
      emails: [
        formValues.legalEmail === ""
          ? `${formValues.title.split(" ").join("")}@gmail.com`
          : formValues.legalEmail ||
            `${formValues.title.split(" ").join("")}@gmail.com`,
      ],
    },
    contacts: [
      {
        name:
          formValues.contactName === undefined
            ? formValues.title
            : formValues.contactName,
        role:
          formValues.contactRole === undefined
            ? "HR Manager"
            : formValues.contactRole,
        phone:
          formValues.contactNumber === undefined
            ? formValues.superClientPhone
            : formValues.contactNumber,
        email:
          formValues.contactEmail === undefined
            ? `${formValues.title.split(" ").join("")}@gmail.com`
            : formValues.contactEmail,
      },
    ],
    superClientName:
      formValues.superClientName === ""
        ? formValues.title
        : formValues.superClientName,
    superClientLogin:
      formValues.superClientLogin === ""
        ? `${formValues.title.split(" ").join("")}@gmail.com`
        : formValues.superClientLogin,
    superClientPassword:
      formValues.superClientPassword === ""
        ? formValues.superClientPhone
        : formValues.superClientPassword,
    superClientPhone: formValues.superClientPhone || "",
  };
}
