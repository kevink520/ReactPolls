import { fetchUsersPolls } from '~/api/usersPolls'

const FETCHING_USERS_POLLS = 'FETCHING_USERS_POLLS'
const FETCHING_USERS_POLLS_ERROR = 'FETCHING_USERS_POLLS_ERROR'
const FETCHING_USERS_POLLS_SUCCESS = 'FETCHING_USERS_POLLS_SUCCESS'

function fetchingUsersPolls (uid) {
  return {
    type: FETCHING_USERS_POLLS,
    uid,
  }
}

function fetchingUsersPollsError (error) {
  return {
    type: FETCHING_USERS_POLLS_ERROR,
    error: 'Error fetching Users Poll ids',
  }
}

function fetchingUsersPollsSuccess (uid, pollIds) {
  return {
    type: FETCHING_USERS_POLLS_SUCCESS,
    uid,
    pollIds,
  }
}

export function fetchAndHandleUsersPolls (uid) {
  return function (dispatch) {
    dispatch(fetchingUsersPolls())
    fetchUsersPolls(uid)
      .then(pollIds => dispatch(fetchingUsersPollsSuccess(uid, pollIds)))
      .catch(error => dispatch(fetchingUsersPollsError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function usersPolls (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_POLLS:
      return {
        ...state,
        isFetching: true,
      }

    case FETCHING_USERS_POLLS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case FETCHING_USERS_POLLS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: action.pollIds,
      }

    default:
      return state
  }
}
