import { savePoll, fetchPoll } from '~/api/polls'
import { addSingleUsersPoll } from './usersPolls'
import { addAndHandleMultipleOptions } from './options'

const FETCHING_POLL = 'FETCHING_POLL'
const FETCHING_POLL_SUCCESS = 'FETCHING_POLL_SUCCESS'
const FETCHING_POLL_ERROR = 'FETCHING_POLL_ERROR'
const ADD_POLL = 'ADD_POLL'
const ADD_MULTIPLE_POLLS = 'ADD_MULTIPLE_POLLS'

function fetchingPoll () {
  return {
    type: FETCHING_POLL,
  }
}

function fetchingPollSuccess (poll) {
  return {
    type: FETCHING_POLL_SUCCESS,
    poll,
  }
}

function fetchingPollError (error) {
  return {
    type: FETCHING_POLL_ERROR,
    error,
  }
}

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}

export function pollFanout (poll, options) {
  return function (dispatch, getState) {
    const uid = getState().authentication.authedId
    savePoll(poll)
      .then((pollWithId) => {
        dispatch(addPoll(pollWithId))
        dispatch(addSingleUsersPoll(uid, pollWithId.pollId))
        dispatch(addAndHandleMultipleOptions(pollWithId.pollId, options))
      })
      .catch(err => console.warn('Error in pollFanout', err))
  } 
}

export function addMultiplePolls (polls) {
  return {
    type: ADD_MULTIPLE_POLLS,
    polls,
  }
}

export function fetchAndHandlePoll (pollId) {
  dispatch(fetchingPoll())
  fetchPoll(pollId)
    .then(poll => dispatch(fetchingPollSuccess(poll)))
    .catch(error => dispatch(fetchingPollError(error)))
}

function updatedPolls (state = {}, action) {
  switch (action.type) {
    case ADD_POLL :
    case FETCHING_POLL_SUCCESS :
      return {
        ...state,
        [action.poll.pollId]: action.poll,
      }
  }
}

const initialState = {
  isFetching: true,
  error: '',
  polls: {},
}

export default function polls (state = initialState, action) {
  switch (action.type) {
    case FETCHING_POLL :
      return {
        ...state,
        isFetching: true,
      }

    case ADD_POLL :
    case FETCHING_POLL_SUCCESS :
      return {
        ...state,
        isFetching: false,
        polls: updatedPolls(state.polls, action),
      }

    case FETCHING_POLL_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    default :
      return state
  }
}