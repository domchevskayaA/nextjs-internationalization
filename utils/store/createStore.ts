import { useReducer } from 'react';

import { IState, ActionType, IAction, IStore } from '../../types';

function reducer(state: IState, action: IAction): IState {
  const { type, payload }: IAction = action;
  switch (type) {
    case ActionType.update:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error('Unknown action');
  }
}

const createStore = (props: IState): IStore => {
  const [state, dispatch] = useReducer(reducer, props);

  return { state, dispatch };
};

export default createStore;
