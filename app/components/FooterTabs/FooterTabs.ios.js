import React from 'react'
import PropTypes from 'prop-types'
import { TabBarIOS, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomeContainer, YourPollsContainer } from '~/containers'
import { colors } from '~/styles'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired,
}

export default function FooterTabs (props) {
  return (
    <TabBarIOS 
      barTintColor={colors.black}
      tintColor={colors.pink2}
      unselectedItemTintColor={colors.white}>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-home-outline'
        title='Home'
        selected={props.activeFooterTab === 'home'}
        onPress={() => props.onTabSelect('home')}>
          <HomeContainer navigator={props.navigator} />
      </Icon.TabBarItem>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-stats-outline'
        title='Your Polls'
        selected={props.activeFooterTab === 'yourPolls'}
        onPress={() => props.onTabSelect('yourPolls')}>
          <YourPollsContainer navigator={props.navigator} />
      </Icon.TabBarItem>
    </TabBarIOS>
  )
}
