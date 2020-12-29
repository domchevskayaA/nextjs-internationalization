import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import i18n from '../utils/translations/i18n';
import LangSelect from './langSelect';
import { IStore } from '../types';

const name = 'i18next POC';

export default function Layout({
  children,
  home,
  store,
}: {
  children: ReactNode;
  home?: boolean;
  store: IStore;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/i18next-logo.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <img
                src="/images/i18next-logo.png"
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <span className={utilStyles.colorInherit}>{name}</span>
              </Link>
            </h2>
          </>
        )}
      </header>
      <div className={utilStyles.rowContainer}>
        <p className={utilStyles.headingMd}>
          {i18n.t('change-lang', { lng: store.state.selectedLang })}:
        </p>
        <LangSelect store={store} />
      </div>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <span>
              ← {i18n.t('back-button-title', { lng: store.state.selectedLang })}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
