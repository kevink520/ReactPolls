import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, DrawerLayoutAndroid } from 'react-native'
import { HomeContainer, YourPollsContainer } from '~/containers'
import Drawer from './Drawer'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired,
}

export default function FooterTabs (props) {
  const openDrawer = () => this.drawer.openDrawer()
  const closeDrawer = () => this.drawer.closeDrawer()
  return (
    <DrawerLayoutAndroid
      ref={(drawer) => this.drawer = drawer}
      drawerWidth={290}
      renderNavigationView={() => (
        <Drawer 
          close={closeDrawer}
          activeFooterTab={props.activeFooterTab}
          onTabSelect={props.onTabSelect} />
      )}>
        {props.activeFooterTab === 'home'
          ? <HomeContainer openDrawer={openDrawer} navigator={props.navigator} />
          : <YourPollsContainer openDrawer={openDrawer} navigator={props.navigator} />}
    </DrawerLayoutAndroid>
  )
}
