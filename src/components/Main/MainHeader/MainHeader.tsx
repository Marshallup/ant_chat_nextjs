import React, { useMemo, useContext, FC } from "react";
import AppContext from "@/contexts/AppContext";
import Link from "next/link";
import { Row, Col, Button } from "antd";
import { v4 } from 'uuid';
import { useRouter } from "next/router";
import {
    MainHeaderEl,
    ShowSiderIcon,
    HideSiderIcon,
    HeaderBtnCol,
    HeaderMainPageLinkCol,
    HeaderBtnRoom,
} from "./styles";
import { ROUTES } from "@/utils/ROUTES";

const MainHeader: FC = () => {
    const router = useRouter();
    const isRoomPage = useMemo(() => router.pathname === ROUTES.roomPage, [ router ]);
    const { siderCollapsed, setSiderCollapsed } = useContext(AppContext);

    function handleClickBtnRoom() {

        switch(isRoomPage) {
            case false:
                router.push(`/rooms/${v4()}`)
                break;
            default:
                router.replace('/');
                break;
        }
    }
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
                    <HeaderBtnRoom
                        onClick={handleClickBtnRoom}
                    >
                        { isRoomPage ? 'Покинуть' : 'Создать' } комнату
                    </HeaderBtnRoom>
                </HeaderBtnCol>
            </Row>
        </MainHeaderEl>
    )
}

export default MainHeader;