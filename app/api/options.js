import { ref } from '~/config/constants'

export function postOption (pollId, option) {
  const optionId = ref.child(`options/${pollId}`).push().key
  const optionWithId = {...option, optionId}
  const optionPromise = ref.child(`options/${pollId}/${optionId}`).set(optionWithId)

  return {
    optionWithId,
    optionPromise,
  }
}

export function fetchOptions (pollId) {
  return ref.child(`options/${pollId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
