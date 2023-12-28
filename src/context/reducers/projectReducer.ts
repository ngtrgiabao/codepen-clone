// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const projectReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.projects,
      };
    case "SET_PROJECTS_NULL":
      return {
        ...state,
        projects: null,
      };
    default:
      return state;
  }
};
