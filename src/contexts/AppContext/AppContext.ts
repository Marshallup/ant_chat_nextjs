import { createContext } from "react";
import { AppContextInterface } from "./interfaces";

const AppContext = createContext<AppContextInterface>({
    siderCollapsed: false,
    setSiderCollapsed: () => {},
});

export default AppContext;