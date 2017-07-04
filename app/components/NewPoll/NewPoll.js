import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TextInput, ListView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { NavBar, TextButton } from '../../components'
import { fullScreen, container, placeholderTitle } from '~/styles'
const valleyBg = require('~/images/valley-bg.jpg')
const { width, height } = Dimensions.get('window')
import { colors, fontSizes } from '~/styles'

NewPoll.propTypes = {
  newPollState: PropTypes.object.isRequired,
  updatePollTitle: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  addNewOption: PropTypes.func.isRequired,
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
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Poll Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Poll Title"}
              onChangeText={props.updatePollTitle}
              value={props.newPollState.pollTitle} />
          </View>
          <ListView
            dataSource={props.newPollState.dataSource}
            renderRow={props.renderRow} />
        </View>
        <TouchableOpacity onPress={props.addNewOption} style={styles.button}>
          <Text style={styles.buttonText}>New Option</Text>
        </TouchableOpacity>
      </View>
    </Image>
  )
}

const styles = StyleSheet.create({
  form: {
    width: width - 60, 
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30, 
    backgroundColor: colors.white,
  },
  
  inputContainer: {
    width: width - 120,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorderColor,
    marginBottom: 25,
  },

  label: {
    width: width - 120,
    height: 20,
    fontSize: fontSizes.small,
    fontWeight: '700',
    color: colors.pink3,
  },

  textInput: {
    width: width - 120,
    height: 45,
    fontSize: fontSizes.secondary,
    color: colors.black,
  },

  button: {
    justifyContent: 'center',
    width: width - 60,
    height: 45,
    paddingLeft: 30,
    backgroundColor: colors.pink4,
  },

  buttonText: {
    fontSize: fontSizes.secondary,
    color: colors.black,
  }
})
