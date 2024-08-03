import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import {Metadata} from "next";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="Remitano Renec Dev Coding Test" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
                <StyleProvider cache={cache}>
                    <App {...props} />
                </StyleProvider>
            ),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);
    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </>
        ),
    };
};

export default MyDocument;