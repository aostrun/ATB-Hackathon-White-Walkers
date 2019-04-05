import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import UserReducer from './user_reducer'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  user: UserReducer,
})

export default rootReducer
