import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, ListView, Dimensions, StyleSheet } from 'react-native'
import { NewPoll } from '~/components'
import { colors, fontSizes } from '~/styles' 
const { width } = Dimensions.get('window')

export default class NewPollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)})
    this.state = {
      pollTitle: '',
      ds: [
        {
          key: 'option1',
          value: '',
          placeholder: 'Option 1',
        },
        {
          key: 'option2',
          value: '',
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
          value={option.value}
          onChangeText={(text) => {
            let {ds} = this.state
            ds[rest[1]].value = text
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
        value: '',
        placeholder: `Option ${newIndex}`,
      })

      return {
        ds,
        dataSource: this.state.dataSource.cloneWithRows(ds),
      }
    })
    let state = this.state
    console.log(state)
  }

  closeNewPollView = () => {
    this.props.navigator.pop()
  }

  submitNewPoll () {

  }

  render () {
    return (
      <NewPoll
        newPollState={this.state}
        updatePollTitle={this.updatePollTitle}
        renderRow={this.renderRow}
        addNewOption={this.addNewOption}
        closeNewPollView={this.closeNewPollView}
        submitNewPoll={this.submitNewPoll} />
    )
  }
}

const styles = StyleSheet.create({
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
  },
})
