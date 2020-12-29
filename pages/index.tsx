import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../utils/posts';
import Date from '../components/date';
import i18n from '../utils/translations/i18n';

import { IStore, IPost, LangType, ActionType, INextConfig } from '../types';

const {
  publicRuntimeConfig: { defaultLocale },
}: INextConfig = getConfig();

const Home = ({
  allPostsData,
  store,
  locale,
}: {
  allPostsData: IPost[];
  store: IStore;
  locale: LangType;
}) => {
  const { state, dispatch } = store;

  useEffect(() => {
    dispatch({
      type: ActionType.update,
      payload: {
        selectedLang: locale,
      },
    });
  }, [locale]);

  return (
    <Layout home store={store}>
      <Head>
        <title>{i18n.t('site-title', { lng: state.selectedLang })}</title>
      </Head>
      <section>
        <p className={`${utilStyles.headingMd}`}>
          {i18n.t('intro', { lng: state.selectedLang })}
        </p>
        <p className={`${utilStyles.headingMd}`}>
          {i18n.t('docs', { lng: state.selectedLang })}:&nbsp;
          <Link href="https://github.com/i18next/react-i18next">
            <span className={utilStyles.link}>react-i18next</span>
          </Link>
        </p>
      </section>
      <section className={`${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          {i18n.t('blog', { lng: state.selectedLang })}
        </h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }: IPost) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <span className={utilStyles.link}>{title}</span>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date locale={state.selectedLang} dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || defaultLocale;
  const allPostsData = await getSortedPostsData(locale as LangType);
  return {
    props: {
      allPostsData,
      locale,
    },
  };
};
