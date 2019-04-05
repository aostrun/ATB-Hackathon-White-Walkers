import { toastr } from 'react-redux-toastr'

const notificationMiddleWare = store => next => action => {
  switch (action.type) {
    case 'TEST':
      toastr.info("TEST", "Delete This");
      break;
    default:
      
  }
  next(action)
}

export default notificationMiddleWare