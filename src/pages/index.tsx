import type { NextPage } from 'next';
import { MainTitle, MainImageContainer } from '@/styles/pages';
import CreateRoomBtn from '@/components/CreateRoomBtn';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Button } from 'antd';


const Home: NextPage = () => {

    return (
        <Row align={'middle'} gutter={20}>
            <Col span={12}>
                <MainTitle>
                    Видео встречи - легко! Зайди в комнату или создай свою
                </MainTitle>
                <Row gutter={17}>
                    <Col>
                        <CreateRoomBtn />
                    </Col>
                    <Col>
                        <Link href="/rooms">
                            <a>
                                <Button size={'large'}>
                                    Посмотреть список комнат
                                </Button>
                            </a>
                        </Link>
                    </Col>
                </Row>
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
        </Row>
    )
}

export default Home
