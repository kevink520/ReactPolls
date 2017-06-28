import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

export default function TextButton (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}
