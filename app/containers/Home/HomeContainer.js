import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Home } from '~/components'

export default class HomeContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }

  handleToNewPoll = () => {
    this.props.navigator.push({
      newPoll: true,
    })
  }

  render () {
    return (
      <Home
        openDrawer={this.props.openDrawer}
        handleToNewPoll={this.handleToNewPoll} />
    )
  }
}
