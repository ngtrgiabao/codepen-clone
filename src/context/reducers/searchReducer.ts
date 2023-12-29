// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    case "SET_SEARCH_TERM_EMPTY":
      return {
        ...state,
        searchTerm: null,
      };
    default:
      return state;
  }
};
