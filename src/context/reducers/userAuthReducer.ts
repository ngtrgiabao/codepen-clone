// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userAuthReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_NULL":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
