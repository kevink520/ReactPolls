import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, ListView, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NewPoll } from '~/components'

class NewPollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
  }

  closeNewPollView = () => {
    this.props.navigator.pop()
  }

  render () {
    return (
      <NewPoll
        authentication={this.props.authentication}
        dispatch={this.props.dispatch} 
        closeNewPollView={this.closeNewPollView} />
    )
  }
}

function mapStateToProps ({authentication}) {
  return {
    authentication: authentication,
  }
}

export default connect(
  mapStateToProps
)(NewPollContainer)
