// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SET_SEARCH_TERM = (searchTerm: any) => {
  return {
    type: "SET_SEARCH_TERM",
    searchTerm: searchTerm,
  };
};

export const SET_SEARCH_TERM_EMPTY = () => {
  return {
    type: "SET_SEARCH_TERM_EMPTY",
    searchTerm: null,
  };
};
