import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

HamburgerIcon.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

HamburgerIcon.defaultProps = {
  size: 30,
}

export default function HamburgerIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name="ios-menu-outline"
        size={props.size} />
    </TouchableOpacity>
  )
}
