import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

NewPollIcon.propTypes = {
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
}

NewPollIcon.defaultProps = {
  size: 30,
}

export default function NewPollIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={{fontSize: props.size, color: colors.white}}>+</Text>
    </TouchableOpacity>
  )
}
