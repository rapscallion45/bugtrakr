import { FC } from 'react';
import Head from 'next/head';

const Meta: FC = function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#FFC900" />
      <link rel="icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#FFC900" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="apple-mobile-web-app-title" content={process.env.APP_NAME} />
      <meta name="application-name" content={process.env.APP_NAME} />
      <meta name="theme-color" content="#FFC900" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};
export default Meta;
