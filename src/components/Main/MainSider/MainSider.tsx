import React, { useContext, FC, useMemo } from "react";
import { Layout, Menu } from "antd";
import { useWindowSize } from 'usehooks-ts';
import {
    VideoCameraOutlined
} from '@ant-design/icons';
import AppContext from "@/contexts/AppContext";

const { Sider } = Layout;

const MainSider: FC = () => {
    const { siderCollapsed } = useContext(AppContext);
    const windowSize = useWindowSize();
    const collapseWidth = useMemo(() => {
        const { width } = windowSize;

        switch(true) {
            case width < 767:
                return 0;
            default:
                return 80;
        }

    }, [ windowSize ]);


    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={siderCollapsed}
            collapsedWidth={collapseWidth}
        >
            <Menu
                theme="dark"
                mode="inline"
                items={[
                    {
                        key: '1',
                        icon: <VideoCameraOutlined />,
                        label: 'Доступные комнаты',
                        children: []
                    }
                ]}
            >
            </Menu>
        </Sider>
    )
}

export default MainSider;