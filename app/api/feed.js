import { ref } from '~/config/constants.js'

export function listenToFeed (cb, errorCB) {
  ref.child('polls').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errorCB)
}
