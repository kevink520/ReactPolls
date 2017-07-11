Firebase
/polls
  pollId
    uid
    title
    timestamp
    lastUpdated
    totalVotesCount

/pollOptions
  pollId
    optionId
      optionId
      pollId
      optionName
      timestamp
      votesCount

/users
  uid
    uid
    name
    avatar
    [{pollId, optionId}]
    
/usersPolls
  uid
    pollIds

Redux
.polls
  pollId
    uid
    title
    totalVotesCount
    pollOptions
      optionId
      pollId
      optionName
      votesCount

.users
  uid
    uid
    name
    avatar
