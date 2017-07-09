import { ref } from '~/config/constants'

export function fetchUsersPolls (uid) {
  return ref.child(`usersPolls/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
