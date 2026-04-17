import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import  thunk  from 'redux-thunk';

import concerts from './concertsRedux';
import seats from './seatsRedux';

const rootReducer = combineReducers({
  concerts,
  seats,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;