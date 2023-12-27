import { UserInfo } from "firebase/auth";

export const SET_USER = (user: UserInfo) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const SET_USER_NULL = () => {
  return {
    type: "SET_USER_NULL",
    user: null,
  };
};
