import { listenToUsers } from '~/api/users'

const SETTING_USERS_LISTENER = 'SETTING_USERS_LISTENER'
const SETTING_USERS_LISTENER_FAILURE = 'SETTING_USERS_LISTENER_FAILURE'
const SETTING_USERS_LISTENER_SUCCESS = 'SETTING_USERS_LISTENER_SUCCESS'
const ADD_USERS_LISTENER = 'ADD_USERS_LISTENER'

function settingUsersListener () {
  return {
    type: SETTING_USERS_LISTENER,
  }
}

function settingUsersListenerFailure (error) {
  return {
    type: SETTING_USERS_LISTENER_FAILURE,
    error: error.message,
  }
}

function settingUsersListenerSuccess (users) {
  return {
    type: SETTING_USERS_LISTENER_SUCCESS,
    users,
  }
}

function addUsersListener () {
  return {
    type: ADD_USERS_LISTENER,
  }
}

export function fetchAndSetUsersListener () {
  return function (dispatch) {
    let usersListenerSet = false
    dispatch(settingUsersListener())
    listenToUsers(
      users => dispatch(settingUsersListenerSuccess(users)),
      error => dispatch(settingUsersListenerFailure(error))
    )

    if (!usersListenerSet) {
      dispatch(addUsersListener())
      usersListenerSet = true
    }
  }
}

const initialState = {
  isFetching: true,
  error: '',
  users: {},
  usersListenerSet: false,
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case SETTING_USERS_LISTENER :
      return {
        ...state,
        isFetching: true,
      }

    case SETTING_USERS_LISTENER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case SETTING_USERS_LISTENER_SUCCESS :
      return action.users === null 
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          users: action.users,
        }

      case ADD_USERS_LISTENER :
        return {
          ...state,
          isFetching: false,
          usersListenerSet: true,
        }
    default:
      return state;
  }
}
