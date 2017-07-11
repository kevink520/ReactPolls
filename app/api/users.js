import { ref } from '~/config/constants'

export function listenToUsers (cb, errorCB) {
  ref.child('users').on('value', (snapshot) => {
    const users = snapshot.val() || {}
    cb(users)
  }, errorCB)
}
