import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import notificationMiddleWare from './middleware/notifications';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
  rootReducer, {},
  composeEnhancers(
    applyMiddleware(thunk, notificationMiddleWare)
  )
)

export default store