import { alertConstants } from '../constants';
import { INotification } from '../types/types';

function alert(state: any = { notifications: [] }, action: any) {
  switch (action.type) {
    case alertConstants.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case alertConstants.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification: INotification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case alertConstants.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: INotification) => notification.key !== action.key
        ),
      };

    default:
      return state;
  }
}
export default alert;
