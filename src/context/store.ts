import { legacy_createStore as createStore } from "redux";
import myReducer from "./reducers";

const Store = createStore(
  myReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default Store;
