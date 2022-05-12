import AppContext from "@/contexts/AppContext";
import Link from "next/link";
import React, { useContext, FC } from "react";
import { Row, Col, Button } from "antd";
import {
    MainHeaderEl,
    ShowSiderIcon,
    HideSiderIcon,
    HeaderBtnCol,
    HeaderMainPageLinkCol,
} from "./styles";

const MainHeader: FC = () => {
    const { siderCollapsed, setSiderCollapsed } = useContext(AppContext);

    function hideSiderCollapsed() {
        setSiderCollapsed(true)
    }
    function showSiderCollapsed() {
        setSiderCollapsed(false);
    }

    return (
        <MainHeaderEl>
            <Row gutter={2}>
                <Col span={1}>
                    {
                        siderCollapsed ? (
                            <ShowSiderIcon
                                title="Показать меню"
                                onClick={showSiderCollapsed}
                            />
                        ) : (
                            <HideSiderIcon
                                title="Закрыть меню"
                                onClick={hideSiderCollapsed}
                            />
                        )
                    }
                </Col>
                
                <HeaderMainPageLinkCol span={2} offset={10}>
                    <Link href={'/'}>
                        <a>
                            Главная
                        </a>
                    </Link>
                </HeaderMainPageLinkCol>

                <HeaderBtnCol span={3} offset={8}>
                    <Button style={{ marginLeft: 'auto' }}>
                        Создать комнату
                    </Button>
                </HeaderBtnCol>
            </Row>
        </MainHeaderEl>
    )
}

export default MainHeader;