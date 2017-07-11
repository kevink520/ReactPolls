import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { fontSizes } from '~/styles'

PollPreview.propTypes = {
  poll: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default function PollPreview (props) {
  return (
    <TouchableOpacity style={styles.poll}>
      <View style={styles.row1}>
        <Image 
          source={{uri: props.user.photoURL}}
          style={styles.userImage} />
        <Text style={styles.pollTitle}>{props.poll.title}</Text>
      </View>
      <View style={styles.row2}>
        <Text>{props.user.displayName}</Text>
        <Text>Count: {props.poll.totalVotesCount}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  poll: {
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    paddingLeft: 30,
  },

  row1: {
    flexDirection: 'row',
  },

  userImage: {
    width: 50,
    height: 50,
  },

  pollTitle: {
    paddingLeft: 15,
    paddingRight: 45,
    fontSize: 18,
  },

  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
})
