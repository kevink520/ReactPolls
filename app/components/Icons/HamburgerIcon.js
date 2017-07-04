import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

HamburgerIcon.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
}

HamburgerIcon.defaultProps = {
  size: 30,
}

export default function HamburgerIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name="ios-menu-outline"
        size={props.size}
        color={colors.white} />
    </TouchableOpacity>
  )
}
