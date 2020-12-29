import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './layout.module.css';

import { LangType, IStore, ActionType } from '../types';

const LangSelect = ({ store: { state, dispatch } }: { store: IStore }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const selectLang = (value: LangType) => {
    router.push({ pathname, query }, undefined, { locale: value });

    dispatch({
      type: ActionType.update,
      payload: {
        selectedLang: value,
      },
    });
  };

  return (
    <Select
      variant="outlined"
      className={styles.select}
      id="lang-select"
      value={state.selectedLang}
      onChange={(event) => selectLang(event.target.value as LangType)}
    >
      {state.langs.map((lang) => {
        return (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default LangSelect;
