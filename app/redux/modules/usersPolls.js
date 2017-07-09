import { fetchUsersPolls } from '~/api/usersPolls'
import { addMultiplePolls } from '~/redux/modules/polls'

const FETCHING_USERS_POLLS = 'FETCHING_USERS_POLLS'
const FETCHING_USERS_POLLS_ERROR = 'FETCHING_USERS_POLLS_ERROR'
const FETCHING_USERS_POLLS_SUCCESS = 'FETCHING_USERS_POLLS_SUCCESS'
const ADD_SINGLE_USERS_POLL = 'ADD_SINGLE_USERS_POLL'

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

function fetchingUsersPollsSuccess (uid, pollIds, lastUpdated) {
  return {
    type: FETCHING_USERS_POLLS_SUCCESS,
    uid,
    pollIds,
    lastUpdated,
  }
}

export function addSingleUsersPoll (uid, pollId) {
  return {
    type: ADD_SINGLE_USERS_POLL,
    uid,
    pollId,
  }
}

const initialUsersPollState = {
  lastUpdated: 0,
  pollIds: [],
}

function usersPoll (state = initialUsersPollState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_POLL:
      return {
        ...state,
        pollIds: state.pollIds.concat([action.pollId]),
      }

    default:
      return state
  }
}

export function fetchAndHandleUsersPolls (uid) {
  return function (dispatch, getState) {
    dispatch(fetchingUsersPolls())
    fetchUsersPolls(uid)
      .then((polls) => dispatch(addMultiplePolls(polls)))
      .then(({polls}) => dispatch(
        fetchingUsersPollsSuccess(
          uid,
          Object.keys(polls).sort((a, b) => polls[b].timestamp - polls[a].timestamp),
          Date.now()
        )
      ))
      .catch((error) => dispatch(fetchingUsersPollsError(error)))
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
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          pollIds: action.pollIds,
        },
      }

    case ADD_SINGLE_USERS_POLL:
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersPoll(state[action.uid], action),
        }

    default:
      return state
  }
}
