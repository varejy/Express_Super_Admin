import sessionConstants from "../constants/session.constants";

const initialState = {
  account: {
    loading: false,
    data: null,
  },
  authenticated: false,
  errorAuthenticated: false,
  token: null,
};
export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case sessionConstants.account.loading:
      return {
        ...state,
        account: {
          ...state.account,
          loading: action.payload,
        },
      };
    case sessionConstants.account.data:
      return {
        ...state,
        account: {
          ...state.account,
          data: action.payload,
        },
      };
    case sessionConstants.account.token:
      return action.payload === "error"
        ? {
            ...state,
            errorAuthenticated: true,
          }
        : {
            ...state,
            authenticated: action.payload,
            errorAuthenticated: !action.payload,
          };
    default:
      return state;
  }
}
