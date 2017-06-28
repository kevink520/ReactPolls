import React, { PropTypes } from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { NavBar, TextButton } from '~/components'
import { fullScreen, container, placeholderTitle } from '~/styles'
const valleyBg = require('~/images/valley-bg.jpg')
const { height } = Dimensions.get('window')

NewPoll.propTypes = {
  closeNewPollView: PropTypes.func.isRequired,
  submitNewPoll: PropTypes.func.isRequired,
}

export default function NewPoll (props) {
  return (
    <Image source={valleyBg} style={[fullScreen, {paddingBottom: height / 2}]}>
      <View style={container}>
        <NavBar 
          title="New Poll"
          leftButton={<TextButton text="Close" onPress={props.closeNewPollView} />}
          rightButton={<TextButton text="Submit" onPress={props.submitNewPoll} />} />
        <Text style={placeholderTitle}>
          NewPoll
        </Text>
      </View>
    </Image>
  )
}


