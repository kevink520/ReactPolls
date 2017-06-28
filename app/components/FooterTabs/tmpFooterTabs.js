import React, { PropTypes } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { fullScreen, container, placeholderTitle } from '~/styles'
const valleyBg = require('~/images/valley-bg.jpg')

export default function FooterTabs(props) {
  return (
    <Image source={valleyBg} style={styles.fullScreen}>
      <View style={styles.container}>
        <Text style={styles.placeholderTitle}>
          FooterTabs
        </Text>
      </View>
    </Image>
  )
}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    backgroundColor: 'transparent',
    fontFamily: 'Karla',
    fontSize: 50,
    fontWeight: 'bold',
  }
})
