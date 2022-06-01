import type { NextPage } from 'next';
import {
    MainTitle,
    MainImageContainer,
    MainRow,
    MainRowBtns,
    MainBtnWrap,
} from '@/styles/pages';
import CreateRoomBtn from '@/components/CreateRoomBtn';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Button } from 'antd';


const Home: NextPage = () => {

    return (
        <MainRow align={'middle'} gutter={20}>
            <Col span={12}>

                <MainTitle>
                    Видео встречи - легко! Зайди в комнату или создай свою
                </MainTitle>

                <MainRowBtns gutter={17}>

                    <Col>
                        <MainBtnWrap>
                            <CreateRoomBtn />
                        </MainBtnWrap>
                    </Col>

                    <Col>
                        <MainBtnWrap>
                            <Link href="/rooms">
                                <a>
                                    <Button size={'large'}>
                                        Посмотреть список комнат
                                    </Button>
                                </a>
                            </Link>
                        </MainBtnWrap>
                    </Col>

                </MainRowBtns>
            </Col>

            <Col span={12}>
                <MainImageContainer>
                    <Image
                        src={require('@/images/main-image.svg')}
                        priority
                        layout={'responsive'}
                        width={800}
                        height={785}
                        alt="main-image"
                    />
                </MainImageContainer>
            </Col>
        </MainRow>
    )
}

export default Home
