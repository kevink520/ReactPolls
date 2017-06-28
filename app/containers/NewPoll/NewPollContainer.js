import React, { PropTypes, Component } from 'react'
import { NewPoll } from '~/components'

export default class NewPollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  closeNewPollView = () => {
    this.props.navigator.pop()
  }

  submitNewPoll () {

  }

  render () {
    return (
      <NewPoll
        closeNewPollView={this.closeNewPollView}
        submitNewPoll={this.submitNewPoll} />
    )
  }
}
