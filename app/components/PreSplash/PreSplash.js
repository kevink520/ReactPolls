import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Animated } from 'react-native'
import { colors } from '~/styles'

const logo = require('~/images/logo.png')

export default class PreSplash extends Component {
  static propTypes = {}
  state = {
    opacity: new Animated.Value(0)
  }

  startAnimation () {
    Animated.sequence([
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 2000,
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 2000,
        }
      ),
    ]).start(() => this.startAnimation())
  }

  componentDidMount () {
    this.startAnimation()
  }

  render () {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={logo} 
          style={[
            styles.logo,
            {
              opacity: this.state.opacity
            }
          ]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pink,
  },

  logo: {
    width: 200,
    height: 200,
  },
})
