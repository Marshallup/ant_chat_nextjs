import React, { FC } from "react";
import { Row, Col } from "antd";
import { useRouter } from "next/router";
import { MainHeaderEl, BackBtn, BackBtnIcon } from "./styles";
import CreateRoomBtn from "@/components/CreateRoomBtn";

const MainHeader: FC = () => {
    const router = useRouter();

    function goToMainPage() {
        router.push('/');
    }
    
    return (
        <MainHeaderEl>
            <Row gutter={2} justify={'space-between'}>
                <Col>
                    <BackBtn onClick={goToMainPage}>
                        <BackBtnIcon />
                        Вернуться
                    </BackBtn>
                </Col>
                <Col>
                    <CreateRoomBtn />
                </Col>
            </Row>
        </MainHeaderEl>
    )
}

export default MainHeader;