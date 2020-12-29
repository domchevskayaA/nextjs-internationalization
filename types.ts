import { Dispatch } from 'react';

export enum ActionType {
  update = 'update',
}

export enum LangType {
  en = 'en',
  ru = 'ru',
  uk = 'uk',
}

export interface IState {
  selectedLang: LangType;
  langs: LangType[];
}

export interface IAction {
  type: ActionType;
  payload: Partial<IState>;
}

export interface IDispatch extends Dispatch<IAction> {}

export interface IStore {
  state: IState;
  dispatch: IDispatch;
}

export interface IPost {
  id: string;
  date: string;
  title: string;
  contentHtml: string;
}

export interface INextConfig {
  publicRuntimeConfig: {
    defaultLocale: LangType;
  };
}
