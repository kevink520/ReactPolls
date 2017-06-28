import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

NewPollIcon.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

NewPollIcon.defaultProps = {
  size: 30,
}

export default function NewPollIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text size={props.size}>+</Text>
    </TouchableOpacity>
  )
}
