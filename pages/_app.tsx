import React from 'react';
import '../styles/global.css';
import { NextPage } from 'next';
import getConfig from 'next/config';
import createStore from '../utils/store/createStore';

import { LangType, IState, INextConfig } from '../types';

const {
  publicRuntimeConfig: { defaultLocale },
}: INextConfig = getConfig();

function App({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  const initialState: IState = {
    selectedLang: defaultLocale,
    langs: Object.values(LangType),
  };
  const store = createStore(initialState);

  return <Component {...pageProps} store={store} />;
}

export default App;
