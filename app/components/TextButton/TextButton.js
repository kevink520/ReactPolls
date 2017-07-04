import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import { colors } from '~/styles'

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

export default function TextButton (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={{color: colors.white}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}
