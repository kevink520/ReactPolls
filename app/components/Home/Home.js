import React, { PropTypes } from 'react'
import { View, Image, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { NavBar, HamburgerIcon, NewPollIcon } from '~/components'
const valleyBg = require('~/images/valley-bg.jpg')

Home.propTypes = {
  openDrawer: PropTypes.func,
  handleToNewPoll: PropTypes.func.isRequired,
}

export default function Home(props) {
  return (
    <Image source={valleyBg} style={styles.fullScreen}>
      <View style={styles.container}>
        <NavBar
          title="All Polls"
          leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
          rightButton={<NewPollIcon onPress={props.handleToNewPoll} />} />
        <Text style={styles.placeholderTitle}>
          Home
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
    alignItems: 'center',
    marginBottom: height / 2,
    backgroundColor: 'transparent',
    fontFamily: 'Karla',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
