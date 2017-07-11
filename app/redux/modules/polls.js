import { listenToPolls, savePoll, fetchPoll } from '~/api/polls'
import { fetchAndHandleUsersPolls, addSingleUsersPoll } from './usersPolls'
import { addAndHandleMultipleOptions } from './options'

const SETTING_POLLS_LISTENER = 'SETTING_POLLS_LISTENER'
const SETTING_POLLS_LISTENER_ERROR = 'SETTING_POLLS_LISTENER_ERROR'
const SETTING_POLLS_LISTENER_SUCCESS = 'SETTING_POLLS_LISTENER_SUCCESS'
const ADD_POLLS_LISTENER = 'ADD_POLLS_LISTENER'

function settingPollsListener () {
  return {
    type: SETTING_POLLS_LISTENER,
  }
}

function settingPollsListenerError (error) {
  return {
    type: SETTING_POLLS_LISTENER_ERROR,
    error: 'Error setting and fetching polls listener.',
  }
}

function settingPollsListenerSuccess (pollsAndIds) {
  return {
    type: SETTING_POLLS_LISTENER_SUCCESS,
    polls: pollsAndIds.polls,
    pollIds: pollsAndIds.sortedIds,
  }
}

function addPollsListener () {
  return {
    type: ADD_POLLS_LISTENER,
  }
}

export function fetchAndSetPollsListener (authedId) {
  return function (dispatch) {
    let pollsListenerSet = false
    dispatch(settingPollsListener())
    listenToPolls(pollsAndIds => {
      dispatch(settingPollsListenerSuccess(pollsAndIds))
      dispatch(fetchAndHandleUsersPolls(authedId))
    }, error => dispatch(fetchingPollError(error)))
    if (!pollsListenerSet) {
      dispatch(addPollsListener())
      pollsListenerSet = true
    }
  }
}

export function pollFanout (poll, options) {
  return function (dispatch, getState) {
    const uid = getState().authentication.authedId
    savePoll(poll)
      .then((pollWithId) => {
        dispatch(addAndHandleMultipleOptions(pollWithId.pollId, options))
      })
      .catch(err => console.warn('Error in pollFanout', err))
  } 
}

const initialState = {
  isFetching: true,
  error: '',
  polls: {},
  pollIds: [],
  pollsListenerSet: false,
}

export default function polls (state = initialState, action) {
  switch (action.type) {
    case SETTING_POLLS_LISTENER :
      return {
        ...state,
        isFetching: true,
      }

    case SETTING_POLLS_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case SETTING_POLLS_LISTENER_SUCCESS :
      return {
        ...state,
        polls: action.polls,
        pollIds: action.pollIds,
      }
      
    case ADD_POLLS_LISTENER :
      return {
        ...state,
        pollsListenerSet: true,
      }

    default :
      return state
  }
}
