import { ref } from '~/config/constants.js'

function saveToPolls (poll) {
  const pollId = ref.child('polls').push().key
  const pollPromise = ref.child(`polls/${pollId}`).set({...poll, pollId})
  return {
    pollId,
    pollPromise,
  }
}

function saveToUsersPolls (poll, pollId) {
  return ref.child(`usersPolls/${poll.uid}/${pollId}`)
    .set({...poll, pollId})
}

export function savePoll (poll) {
  const {pollId, pollPromise} = saveToPolls(poll)
  return Promise.all([
    pollPromise,
    saveToUsersPolls(poll, pollId)
  ]).then(() => ({...poll, pollId}))
}

export function fetchPoll (pollId) {
  return ref.child(`polls/${pollId}`).once('value')
    .then((snapshot) => snapshot.val())
}
