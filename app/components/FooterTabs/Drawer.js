import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'

Drawer.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

export default function Drawer (props) {
  return (
    <View style={styles.container}>
      <DrawerHeader />
      <DrawerTab
        title='Home'
        selected={props.activeFooterTab === 'home'}
        onPress={() => {
          props.onTabSelect('home')
          props.close()
        }}
        iconName='ios-home-outline' />
      <DrawerTab
        title='Your Polls'
        selected={props.activeFooterTab === 'yourPolls'}
        onPress={() => {
          props.onTabSelect('yourPolls')
          props.close()
        }}
        iconName='ios-stats-outline' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
