import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { NavBar, HamburgerIcon, NewPollIcon } from '~/components'
const valleyBg = require('~/images/valley-bg.jpg')

YourPolls.propTypes = {
  openDrawer: PropTypes.func,
}

export default function YourPolls(props) {
  return (
    <Image source={valleyBg} style={styles.fullScreen}>
      <View style={styles.container}>
        <NavBar
          title="Your Polls"
          leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null} />
        <Text style={styles.placeholderTitle}>
          YourPolls
        </Text>
      </View>
    </Image>
  )
}

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  placeholderTitle: {
    marginBottom: height / 2,
    backgroundColor: 'transparent',
    fontFamily: 'Karla',
    fontSize: 50,
    fontWeight: 'bold',
  }
})
