import initialConstants from "../../constants/initial.constants";

const setActiveAccount = (payload) => ({
    type: initialConstants.accounts.setActive,
    payload,
});

export default setActiveAccount;
