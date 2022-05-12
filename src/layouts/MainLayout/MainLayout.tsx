import React, { FC, PropsWithChildren } from "react";
import Head from 'next/head';
import { Layout } from 'antd';
import AppProvider from '@/providers/AppProvider';
import MainHeader from "@/components/Main/MainHeader";
import MainFooter from "@/components/Main/MainFooter";
import MainSider from "@/components/Main/MainSider";
import { ContentMainLayout, RootLayout } from './styles';

const MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => {

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <RootLayout>

                <AppProvider>

                    <MainSider />

                    <Layout>

                        <MainHeader />

                        <ContentMainLayout className="site-layout-background">

                            { children }

                        </ContentMainLayout>

                        <MainFooter />

                    </Layout>

                </AppProvider>

            </RootLayout>
        </>
    )
}

export default MainLayout;