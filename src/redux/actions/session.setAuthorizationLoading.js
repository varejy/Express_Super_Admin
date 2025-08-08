import sessionConstants from "../constants/session.constants";

const setAuthorizationLoading = (payload) => ({
  type: sessionConstants.account.token,
  payload,
});

export default setAuthorizationLoading;
