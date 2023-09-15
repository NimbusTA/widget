import { Fonts } from '@lidofinance/lido-ui';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { nativeToken } from '../config';

let host = '';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    if (ctx?.req?.headers?.host) {
      host = `https://${ctx?.req?.headers?.host}`;
    }

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  get metaTitle(): string {
    return 'Stake with Nimbus | Nimbus';
  }

  get metaDescription(): string {
    return (
      'Liquid staking with Nimbus. ' +
      `Stake ${nativeToken} with Nimbus to earn daily rewards while keeping full control of your staked tokens. ` +
      'Start earning rewards in just a few clicks.'
    );
  }

  get metaPreviewImgUrl(): string {
    return `${host}/preview.png`;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.metaTitle} />
          <meta property="og:description" content={this.metaDescription} />
          <meta property="og:image" content={this.metaPreviewImgUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.metaTitle} />
          <meta name="twitter:description" content={this.metaDescription} />
          <meta name="twitter:image:src" content={this.metaPreviewImgUrl} />
          <meta name="description" content={this.metaDescription} />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/svg+xml" href="favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-1942x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <Fonts />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
