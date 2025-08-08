import sessionConstants from "../constants/session.constants";

const initialState = {
  token: null,
};
export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case sessionConstants.account.token:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
