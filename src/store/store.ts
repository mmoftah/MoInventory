import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import reducer from '../reducers';
import { defaultInitialState } from './defaultInitialState';

export interface InventoryItem {
  image: string;
}

export interface InventoryState {
  items: {[slot: number]: InventoryItem};
}

export interface InitialState {
  inventory: InventoryState;
}

const configureStore = (initialState: InitialState) => {
  const middlewares = [ thunkMiddleware ];
  return createStore(reducer, initialState! as any, applyMiddleware(...middlewares));
}

export const store = configureStore(defaultInitialState);