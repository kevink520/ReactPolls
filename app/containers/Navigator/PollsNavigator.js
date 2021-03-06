import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { SplashContainer, FooterTabsContainer, NewPollContainer } from '~/containers'

export default class PollsNavigator extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  renderScene = (route, navigator) => {
    if (!this.props.isAuthed) {
      return <SplashContainer navigator={navigator} />
    } 

    if (route.newPoll === true) {
      return <NewPollContainer navigator={navigator} />
    }

    return <FooterTabsContainer navigator={navigator} />
  }

  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }
    
    if (route.newPoll === true) {
      return Navigator.SceneConfigs.FloatFromBottom
    }

    return Navigator.SceneConfigs.FloatFromRight
  }

  render () {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}
