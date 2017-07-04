import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PreSplash } from '~/components'
import { PollsNavigator } from '~/containers'
import { firebaseAuth } from '~/config/constants'
import { onAuthChange } from '~/redux/modules/authentication'

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    firebaseAuth.onAuthStateChanged((user) => this.props.dispatch(onAuthChange(user)))
  }

  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.isAuthenticating
          ? <PreSplash />
          : <PollsNavigator isAuthed={this.props.isAuthed} />}
      </View>
    )
  }
}

function mapStateToProps({authentication}) {
  return {
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
  }
}

export default connect(
  mapStateToProps
)(AppContainer)
