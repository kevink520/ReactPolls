import { postOption, fetchOptions } from '~/api/options'
const FETCHING_OPTIONS = 'FETCHING_OPTIONS'
const FETCHING_OPTIONS_ERROR = 'FETCHING_OPTIONS_ERROR'
const FETCHING_OPTIONS_SUCCESS = 'FETCHING_OPTIONS_SUCCESS'
const ADD_OPTION = 'ADD_OPTION'
const ADD_OPTION_ERROR = 'ADD_OPTION_ERROR'
const REMOVE_OPTION = 'REMOVE_OPTION'

function fetchingOptions () {
  return {
    type: FETCHING_OPTIONS,
  }
}

function fetchingOptionsError (error) {
  return {
    type: FETCHING_OPTIONS_ERROR,
    error: 'Error fetching options',
  }
}

function fetchingOptionsSuccess (pollId, options) {
  return {
    type: FETCHING_OPTIONS_SUCCESS,
    options,
    pollId,
    lastUpdated: Date.now(),
  }
}

function addOption (pollId, option) {
  return {
    type: ADD_OPTION,
    pollId,
    option,
  }
}

function addOptionError (error) {
  return {
    type: ADD_OPTION_ERROR,
    error: 'Error adding option',
  }
}

function removeOption (optionId, pollId) {
  return {
    type: REMOVE_REPLY,
    optionId,
    pollId,
  }
}

export function addAndHandleOption (pollId, option) {
  return function (dispatch) {
    const { optionWithId, optionPromise } = postOption(pollId, option)
    //dispatch(addOption(pollId, optionWithId))
    optionPromise.catch((error) => {
      //dispatch(removeOption(optionWithId.optionId, pollId))
      dispatch(addOptionError(error))
    })
  }
}

export function addAndHandleMultipleOptions (pollId, options) {
  return function (dispatch) {
    options.forEach((option) => {
      option.pollId = pollId
      option.timestamp = Date.now()
      option.votesCount = 0
      dispatch(addAndHandleOption(pollId, option))
    })
  }
}

export function fetchAndHandleOptions (pollId) {
  return function (dispatch, getState) {
    dispatch(fetchingOptions())
    fetchOptions(pollId)
      .then((options) => dispatch(fetchingOptionsSuccess(pollId, options)))
      .catch((error) => dispatch(fetchingOptionsError(error)))
  }
}

const initialOption = {
  name: '',
  option: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  optionId: '',
};

function pollOptions(state = initialOption, action) {
  switch (action.type) {
    case ADD_OPTION :
      return {
        ...state,
        [action.option.optionId]: action.option,
      }

    case REMOVE_OPTION :
      return {
        ...state,
        [action.optionId]: undefined,
      }

    default:
      return state
  }
}

const initialPollState = {
  lastUpdated: Date.now(),
  replies: {},
}

function optionsAndLastUpdated(state = initialPollState, action) {
  switch (action.type) {
    case FETCHING_OPTIONS_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.options,
      }

    case ADD_OPTION:
    case REMOVE_OPTION:
      return {
        ...state,
        options: pollOptions(state.options, action),
      }
      
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function options(state = initialState, action) {
  switch (action.type) {
    case FETCHING_OPTIONS :
      return {
        ...state,
        isFetching: true,
      }

    case FETCHING_OPTIONS_ERROR :
    case ADD_OPTION_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case ADD_OPTION :
    case FETCHING_OPTIONS_SUCCESS :
    case REMOVE_OPTION :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.pollId]: optionsAndLastUpdated(state[action.pollId], action),
      }

    default :
      return state
  }
}
