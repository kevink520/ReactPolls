import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { Home, PollPreview } from '~/components'

class HomeContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }

  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  handleToNewPoll = () => {
    this.props.navigator.push({
      newPoll: true,
    })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.polls)
    })

    /*this.renderRow = (poll) => {
      const user = this.props.users[poll.uid]
      console.log(user)
      return <PollPreview poll={poll} user={user} />
    }*/
  }

  /*renderRow = (poll) => {
    const user = this.props.users[poll.uid]
    return <PollPreview poll={poll} user={(function() { return user })()} />
  }*/

  render () {
    return (
      <Home
        openDrawer={this.props.openDrawer}
        handleToNewPoll={this.handleToNewPoll}
        dataSource={this.state.dataSource}
        //renderRow={this.renderRow}
        users={this.props.users} />
    )
  }
}

function mapStateToProps(state) {
  //console.log(state)
  let sortedPolls = state.polls.pollIds ? state.polls.pollIds.map(pollId => state.polls.polls[pollId]) : []
  return {
    polls: sortedPolls,
    users: state.users.users,
  }
}

export default connect(
  mapStateToProps
)(HomeContainer)
