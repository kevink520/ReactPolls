import { ref } from '~/config/constants'

export function fetchUsersPolls (uid) {
  return ref.child(`usersPolls/${uid}`).once('value')
    .then(snapshot => {
      const polls = snapshot.val()
      const pollIds = Object.keys(polls)
        .sort((a, b) => polls[b].timestamp - polls[a].timestamp)
      return pollIds
    })
}
