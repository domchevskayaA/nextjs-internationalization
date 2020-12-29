#  i18next POC

This is a POC app (`Typescript/React.JS/Next.JS`) for [i18next internationalization package](https://www.i18next.com/).
Supported languages: English, Russian, Ukrainian.

**Implemented features:**
1. Internationalized routing
2. Language (locale) selection
3. Content translation without page reload
4. Static posts generation, depending on locale
5. Date localization

## Internationalized routing

Is implemented via Next.JS router own feature and might be adjusted inside `next-config.js` file.
Docs: [i18n-routing](https://nextjs.org/docs/advanced-features/i18n-routing).

**Example:**
```js
module.exports = {
  i18n: {
    locales: ['en', 'ru', 'uk'],
    defaultLocale: 'en',
  },
}
```

Also multiple domains feature may be implemented:
```js
module.exports = {
  i18n: {
    locales: ['en', 'ru', 'uk'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
      },
      {
        domain: 'example.ru',
        defaultLocale: 'ru',
      },
      {
        domain: 'example.uk',
        defaultLocale: 'uk',
      },
    ]
  }
}
```

Automatic locale detection might be turned on specifying `localeDetection: true` config. In this case browser locale will be used as default.

The right locale (from current route) may be detected both in `getStaticProps` and `getServerSideProps` as a prop of `context` param.

**Example:**
```jsx
export const getStaticProps = async (context) => {
  const locale = context.locale || defaultLocale;
  const allPostsData = await getSortedPostsData(locale);
  return {
    props: {
      allPostsData,
      locale,
    },
  };
};
```
Subsequently it should be preserved to store (and/or any client storage —— e.g. browser `Cookies` —— if preferred language must be shared between sessions).

## Language (locale) selection

Is implemented, passing all supported languages to `Select` component of `@material-ui/core`.
Docs: [material-ui Select](https://material-ui.com/ru/api/select/#select-api).

Supported languages (and a selected one) are stored in application store and are equal to `Object.values(LangType)` where `LangType` is TS `enum`.
On select value change —— new `selectedLang` value is set to store.

## Content translation without page reload

Is implemented via [i18next](https://www.i18next.com/).
All UI content (titles, links, buttons) are stored in `utils/translations/content/[lang]/content.json` file, where `[lang]` is current language (`en` is default).
`i18next` config is placed in `utils/translations/i18n.ts`.

**Example:**
```jsx
import i18n from '../utils/translations/i18n';

const Component = ({ store: { state }}) => {
  return (
    <p>
      {i18n.t('intro', { lng: state.selectedLang })}
    </p>
  )
};

export default Component;
```
Where `state.selectedLang` is current language from store. Thus on new language select —— all content will be translated accordingly.

## Static posts generation, depending on locale

Configuring `i18n` setting inside `next.config.js` allows us to get `locale`, `locales` and `defaultLocale` from `context` param of `getStaticProps` and `getServerSideProps`.

**Example:**
```jsx
export const getServerSideProps = async (context) => {
  const { params, locale } = context;
  const lang = locale || defaultLocale;
  const postData = await getPostDataById(params?.id, lang);
  return {
    props: {
      postData,
    },
  };
};
```
Thus post content is pre-rendered respectively to current locale.

## Date localization

Is implemented by `moment.locale()` method of [Moment package](https://momentjs.com/).

**Example:**
```tsx
import moment from 'moment-timezone';

export default function Date({
  dateString,
  locale,
}: {
  dateString: string;
  locale: string;
}) {
  moment.locale(locale);
  return <time dateTime={dateString}>{moment(dateString).format('lll')}</time>;
}
```
Where `locale` prop is `selectedLang` from store. Mapping of languages to locales may be implemented if needed.