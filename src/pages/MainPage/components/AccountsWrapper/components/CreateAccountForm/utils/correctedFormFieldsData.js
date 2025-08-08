/* eslint-disable prettier/prettier */
import { format } from "date-fns";

export function correctDataForForm(formValues) {
    console.log(formValues);
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
                : format(formValues.activateAt, "yyyy-MM-dd"),
        lastPaymentDay:
            formValues.lastPaymentDay === undefined
                ? format(new Date(), "yyyy-MM-dd")
                : format(formValues.lastPaymentDay, "yyyy-MM-dd"),
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
        superClientPhone: formValues.superClientPhone === "" ? {} : formValues.superClientPhone,
        companies: formValues.companies.map((item, i) => ({
            companyTitle:
                item.companyTitle === "" ? formValues.title : item.companyTitle,
            companyDomain:
                item.companyDomain === "" ? formValues.title : item.companyDomain,
            companyPosition:
                item.companyPosition === "" ? "Украина" : item.companyPosition,
            companyServices:
                item.companyServices.length === 0
                    ? ["cargo", "tow", "passenger"]
                    : item.companyServices.filter((service) => service !== false),
            companyLegalInformation: {
                address:
                    item.companyLegalInformation.address === ""
                        ? formValues.title
                        : item.companyLegalInformation.address,
                bankDetails:
                    item.companyLegalInformation.bankDetails === ""
                        ? formValues.title
                        : item.companyLegalInformation.bankDetails,
                taxIdentificationNumber:
                    item.companyLegalInformation.taxIdentificationNumber === ""
                        ? 111111111
                        : item.companyLegalInformation.taxIdentificationNumber,
                phones:
                    item.companyLegalInformation.phones[0].length === 0
                        ? [formValues.superClientPhone]
                        : item.companyLegalInformation.phones,
                emails:
                    item.companyLegalInformation.emails[0].length === 0
                        ? [`${formValues.title.split(" ").join("")}@gmail.com`]
                        : item.companyLegalInformation.emails,
            },
            companyContacts: [
                {
                    name:
                        item.companyContacts[0].name === ""
                            ? formValues.title
                            : item.companyContacts.name,
                    role:
                        item.companyContacts[0].role === ""
                            ? formValues.title
                            : item.companyContacts.role,
                    phone:
                        item.companyContacts[0].phone === ""
                            ? formValues.superClientPhone
                            : item.companyContacts.phone,
                    email:
                        item.companyContacts[0].email === ""
                            ? `${formValues.title.split(" ").join("")}@gmail.com`
                            : item.companyContacts.email,
                },
            ],
            tariffPlanId: item.tariffPlanId === 0 ? 1 : +item.tariffPlanId,
            tariffAdditionalServices: item.tariffAdditionalServices
                .filter((service) => service)
                .map((service) => service.id),
            taxiServices: item.taxiServices.map((service, i) => ({
                serviceId: 0,
                serviceTitle:
                    service.serviceTitle === "" ? formValues.title : service.serviceTitle,
                servicePosition:
                    service.servicePosition === ""
                        ? "Украина, Киев"
                        : service.servicePosition,
                serviceLegalInformation: {
                    address:
                        service.serviceLegalInformation.address === ""
                            ? formValues.title
                            : service.serviceLegalInformation.address,
                    bankDetails:
                        service.serviceLegalInformation.bankDetails === ""
                            ? formValues.title
                            : service.serviceLegalInformation.bankDetails,
                    taxIdentificationNumber:
                        service.serviceLegalInformation.taxIdentificationNumber === ""
                            ? 111111111
                            : service.serviceLegalInformation.taxIdentificationNumber,
                    phones:
                        service.serviceLegalInformation.phones[0].length === 0
                            ? [formValues.superClientPhone]
                            : service.serviceLegalInformation.phones,
                    emails:
                        service.serviceLegalInformation.emails[0].length === 0
                            ? [`${formValues.title.split(" ").join("")}@gmail.com`]
                            : service.serviceLegalInformation.emails,
                },
                // serviceContacts: [
                //     {
                //         name:
                //             formValues.serviceContacts === undefined &&
                //             formValues.title,
                //         role:
                //             formValues.serviceContacts === undefined &&
                //             formValues.title,
                //         phone:
                //             formValues.serviceContacts === undefined &&
                //             formValues.superClientPhone,
                //         email:
                //             formValues.serviceContacts === undefined &&
                //             `${formValues.title.split(" ").join("")}@gmail.com`,
                //     },
                // ],
            })),
        })),
    };
}
