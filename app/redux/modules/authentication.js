import { getAccessToken, authWithToken, updateUser } from '~/api/auth'
import { fetchAndSetPollsListener } from './polls'
import { fetchAndSetUsersListener } from './users'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'

function authenticating () {
  return {
    type: AUTHENTICATING,
  }
}

function notAuthed () {
  return {
    type: NOT_AUTHED,
  }
}

function isAuthed (uid) {
  return {
    type: IS_AUTHED,
    uid: uid,
  }
}

export function handleAuthWithFirebase () {
  return function (dispatch, getState) {
    dispatch(authenticating())
    return getAccessToken()
      .then(({accessToken}) => {
        authWithToken(accessToken)
    })
      .catch((error) => console.warn('Error in handleAuthWithFirebase: ', error))
  }
}

export function onAuthChange (user) {
  return function (dispatch) {
    if (!user) {
      dispatch(notAuthed())
    } else {
      const { uid, displayName, photoURL } = user
      updateUser({
        uid,
        displayName,
        photoURL,
      })
      .then(() => {
        dispatch(isAuthed(uid))
        dispatch(fetchAndSetPollsListener(uid))
        dispatch(fetchAndSetUsersListener())
      })
    }
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  authedId: '',
}

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true,
      }

    case NOT_AUTHED :
      return {
        isAuthed: false,
        isAuthenticating: false,
        authedId: '',
      }

    case IS_AUTHED :
      return {
        isAuthed: true,
        isAuthenticating: false,
        authedId: action.uid,
      }

    default :
      return state
  }
}
