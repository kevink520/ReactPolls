import { firebaseAuth, facebookProvider, ref } from '~/config/constants'
import { AccessToken } from 'react-native-fbsdk'

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accessToken) {
  return firebaseAuth
    .signInWithCredential(facebookProvider.credential(accessToken))
}

export function updateUser (user) {
  return ref.child(`users/${user.uid}`).set(user)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}
