import Head from 'next/head';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Layout from '../../components/layout';
import { getPostDataById } from '../../utils/posts';
import utilStyles from '../../styles/utils.module.css';

import { IPost, IStore, LangType, INextConfig } from '../../types';

const {
  publicRuntimeConfig: { defaultLocale },
}: INextConfig = getConfig();

const Post = ({ postData, store }: { postData: IPost; store: IStore }) => {
  return (
    <Layout store={store}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, locale } = context;
  const lang = locale || defaultLocale;
  const postData = await getPostDataById(
    params?.id as string,
    lang as LangType
  );
  return {
    props: {
      postData,
    },
  };
};
