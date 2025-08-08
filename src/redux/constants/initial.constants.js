/* eslint-disable prettier/prettier */
const set = {
    taxiServices: {
        delete: "taxiServices.delete",
        add: "taxiServices.add",
        edit: "taxiServices.edit",
        search: 'taxiServices.search',
        allIDs: "taxiServices.allIDs",
        addFakeID: "taxiServices.addFakeID"
    },
    companies: {
        delete: "companies.delete",
        add: "companies.add",
        edit: "companies.edit",
        search: 'companies.search'
    },
    accounts: {
        delete: "accounts.delete",
        add: "accounts.add",
        edit: "accounts.edit",
        all: "accounts.all",
        search: 'accounts.search',
        setActive: "accounts.setActive"
    },
    tariffPlans: {
        delete: "tariffPlans.delete",
        add: "tariffPlans.add",
        edit: "tariffPlans.edit",
        all: "tariffPlans.all",
        search: 'tariffPlans.search',
    },
    tariffPlanServices: {
        delete: "tariffPlanServices.delete",
        add: "tariffPlanServices.add",
        edit: "tariffPlanServices.edit",
        all: "tariffPlanServices.all",
        search: 'tariffPlanServices.search'
    }
};
const initialConstants = Object.seal(set);
export default initialConstants;
