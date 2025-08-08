/* eslint-disable prettier/prettier */
import { isEmpty } from "ramda";
import initialConstants from "../constants/initial.constants";

const initialState = {
  accounts: [],
  filteredAccounts: [],
  serviceToEdit: {},
  activeAccount: {
    dbHost: "",
    dbPort: null,
    dbName: "",
    dbUsername: "",
    dbPassword: "",
    title: "",
    position: "",
    language: "",
    prepayment: "",
    activateAt: new Date(),
    lastPaymentDay: new Date(),
    services: ["passenger"],
    legalInformation: {
      address: "",
      bankDetails: "",
      taxIdentificationNumber:
         0,
      phones: [""],
      emails: [""],
    },
    contacts: [
      {
        name: "",
        role: "",
        phone: "",
        email: "",
      },
    ],
    superClientName: "",
    superClientLogin: "",
    superClientPassword: "",
    superClientPhone: "",
  },
};
export default function initialReducer(state = initialState, action) {
  switch (action.type) {
    case initialConstants.accounts.add:
      return {
        ...state,
        filteredAccounts: [...state.accounts, action.payload],
        accounts: [...state.accounts, action.payload],
      };
    case initialConstants.accounts.delete:
      return {
        ...state,
        filteredAccounts: state.accounts.filter(
          (item) => item._id !== action.payload
        ),
        accounts: state.accounts.filter((item) => item._id !== action.payload),
      };
    case initialConstants.accounts.search:
      return {
        ...state,
        filteredAccounts: !isEmpty(state.accounts)
          ? state.accounts
            .map(
              (item) =>
                (item.title.includes(action.payload) && item) ||
                (item.number.includes(action.payload) && item) ||
                (item.email.includes(action.payload) && item)
            )
            .filter((item) => item !== false)
          : state.accounts,
      };
    case initialConstants.accounts.all:
      return {
        ...state,
        filteredAccounts: action.payload,
        accounts: action.payload,
      };
    case initialConstants.accounts.setActive:
      return {
        ...state,
        activeAccount: action.payload
      };
    case initialConstants.accounts.edit:
      return isEmpty(action.payload.service)
        ? {
          ...state,
          serviceToEdit: {},
        }
        : {
          ...state,
          serviceToEdit: action.payload.clearEditedAccount
            ? {}
            : action.payload.service,
          accounts: [
            ...state.accounts.filter(
              (item) => item._id !== action.payload.service._id
            ),
            action.payload.service,
          ],
          filteredAccounts: [
            ...state.accounts.filter(
              (item) => item._id !== action.payload.service._id
            ),
            action.payload.service,
          ],
        };
    default:
      return state;
  }
}
