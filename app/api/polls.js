import { ref } from '~/config/constants.js'

export function listenToPolls (cb, errorCB) {
  ref.child('polls').on('value', (snapshot) => {
    const polls = snapshot.val() || {}
    const sortedIds = Object.keys(polls).sort((a, b) => {
      polls[b].timestamp - polls[a].timestamp
    })

    cb({polls, sortedIds})
  }, errorCB)
}

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
