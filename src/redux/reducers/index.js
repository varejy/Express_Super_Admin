import { combineReducers } from "redux";
import sessionReducer from "./session.reducer";
import accountsReducer from "./accounts.reducer";
import companyReducer from "./company.reducer";
import taxiServicesReducer from "./taxiServices.reducer";
import tariffPlansReducer from "./tariffPlans.reducer";
import initialReducer from "./initialReducer.reducer";

const rootReducer = combineReducers({
  accounts: accountsReducer,
  companies: companyReducer,
  taxiServices: taxiServicesReducer,
  session: sessionReducer,
  tariffPlans: tariffPlansReducer,
  initial: initialReducer,
});

export default rootReducer;
