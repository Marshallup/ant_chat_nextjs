import React, { useState, FC, PropsWithChildren } from "react";
import AppContext from "@/contexts/AppContext";

const AppProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [ siderCollapsed, setSiderCollapsed ] = useState(false);

    return (
        <AppContext.Provider
            value={{ siderCollapsed, setSiderCollapsed }}
        >
            { children }
        </AppContext.Provider>
    )
}

export default AppProvider;