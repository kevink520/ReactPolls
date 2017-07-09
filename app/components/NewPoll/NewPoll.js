import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TextInput, ListView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { NavBar, TextButton } from '../../components'
import { pollFanout } from '~/redux/modules/polls'
import { colors, fontSizes, fullScreen, container, placeholderTitle } from '~/styles'
const valleyBg = require('~/images/valley-bg.jpg')
const { width, height } = Dimensions.get('window')

export default class NewPoll extends Component {
  static propTypes = {
    authentication: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    closeNewPollView: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)})
    this.state = {
      pollTitle: '',
      ds: [
        {
          key: 'option1',
          optionName: '',
          placeholder: 'Option 1',
        },
        {
          key: 'option2',
          optionName: '',
          placeholder: 'Option 2',
        },
      ],
      dataSource: ds,
    }
  }

  componentDidMount () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds)
    })
  }

  renderRow = (option, ...rest) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{option.placeholder}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={option.placeholder}
          value={option.optionName}
          onChangeText={(text) => {
            let {ds} = this.state
            ds[rest[1]].optionName = text
            this.setState({
              ds,
            })
          }} />
      </View>
    )
  }

  updatePollTitle = (text) => {
    this.setState({
      pollTitle: text,
    })
  }

  addNewOption = () => {
    this.setState((prevState) => {
      const newIndex = prevState.ds.length + 1
      const ds = prevState.ds;
      ds.push({
        key: `option${newIndex}`,
        optionName: '',
        placeholder: `Option ${newIndex}`,
      })

      return {
        ds,
        dataSource: this.state.dataSource.cloneWithRows(ds),
      }
    })
  }

  submitNewPoll = () => {
    const uid = this.props.authentication.isAuthed ? this.props.authentication.authedId : null
    if (uid !== null) {
      const timestamp = Date.now()
      const poll = {
        title: this.state.pollTitle,
        uid: uid,
        timestamp: timestamp,
        lastUpdated: timestamp,
        totalVotesCount: 0,
      }

      this.props.dispatch(pollFanout(poll, this.state.ds))
      //this.props.closeNewPollView()
    }
  }

  render () {
    return (
      <Image source={valleyBg} style={[fullScreen, {paddingBottom: height / 2}]}>
        <View style={container}>
          <NavBar 
            title="New Poll"
            leftButton={<TextButton text="Close" onPress={this.props.closeNewPollView} />}
            rightButton={<TextButton text="Submit" onPress={this.submitNewPoll} />} />
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Poll Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder={"Poll Title"}
                onChangeText={this.updatePollTitle}
                value={this.state.pollTitle} />
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
          </View>
          <TouchableOpacity onPress={this.addNewOption} style={styles.button}>
            <Text style={styles.buttonText}>New Option</Text>
          </TouchableOpacity>
        </View>
      </Image>
    )
  }
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
