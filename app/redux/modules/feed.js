import { addListener } from '~/redux/modules/listeners'
import { listenToFeed } from '~/api/feed'
import { addMultiplePolls } from '~/redux/modules/polls'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_POLL_ID_TO_FEED = 'ADD_NEW_POLL_ID_TO_FEED'

function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError (error) {
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

function settingFeedListenerSuccess (pollIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds,
  }
}

function addNewPollIdToFeed (pollId) {
  return {
    type: ADD_NEW_POLL_ID_TO_FEED,
    pollId,
  }
}

export function resetNewPollsAvailable () {
  return {
    type: RESET_NEW_POLLS_AVAILABLE,
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed === true) {
      return
    }

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultiplePolls(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewPollIdToFeed(sortedIds[0]))
      initialFetch === false
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
  pollIds: [],
}

export default function feed (state = initialState, action) {
  switch(action.type) {
    case SETTING_FEED_LISTENER :
      return {
        ...state,
        isFetching: true,
      }

    case SETTING_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case SETTING_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        pollIds: action.pollIds,
      }

    case ADD_NEW_POLL_ID_TO_FEED :
      return {
        ...state,
        pollIds: [action.pollId].concat(state.pollIds), 
      }

    default:
      return state
  }
}
