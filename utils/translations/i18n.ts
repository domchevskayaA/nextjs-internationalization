import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import getConfig from 'next/config';
import enContent from './content/en/content.json';
import ruContent from './content/ru/content.json';
import ukContent from './content/uk/content.json';

import { INextConfig } from '../../types';

const {
  publicRuntimeConfig: { defaultLocale },
}: INextConfig = getConfig();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enContent,
    },
    ru: {
      translation: ruContent,
    },
    uk: {
      translation: ukContent,
    },
  },
  lng: defaultLocale,
  fallbackLng: defaultLocale,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
