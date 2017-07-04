import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Platform, Dimensions } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { colors } from '~/styles'

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

export default function NavBar (props) {
  let optionalAttr = {}
  props.leftButton && (optionalAttr.leftButton = React.cloneElement(props.leftButton, {
    style: {
      marginLeft: 10,
      justifyContent: 'center',
    },
  }))
  props.rightButton && (optionalAttr.rightButton = React.cloneElement(props.rightButton, {
    style: {
      marginRight: 10,
      justifyContent: 'center',
    },
  }))
  return (
    <NavigationBar
      {...optionalAttr}
        style={Platform.OS === 'android' ? [{marginTop: 0, marginBottom: 0}, styles.navbar] : styles.navbar}
        title={{title: props.title, tintColor: colors.white}}
        tintColor={colors.black} />
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  navbar: {
    width: width,
  }
})
