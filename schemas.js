Firebase
/polls
  pollId
    uid
    title
    timestamp
    lastUpdated
    totalVotesCount
    [options]

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
    
/usersPolls
  uid
    pollIds
    lastUpdated


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
