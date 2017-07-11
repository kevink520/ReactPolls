import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, ListView, StyleSheet, Platform, Dimensions } from 'react-native'
import { NavBar, HamburgerIcon, NewPollIcon, PollPreview } from '~/components'
const valleyBg = require('~/images/valley-bg.jpg')

Home.propTypes = {
  openDrawer: PropTypes.func,
  handleToNewPoll: PropTypes.func.isRequired,
  dataSource: PropTypes.object.isRequired,
  //renderRow: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
}

export default function Home(props) {
  console.log(props.users)
  return (
    <Image source={valleyBg} style={styles.fullScreen}>
      <View style={styles.container}>
        <NavBar
          title="All Polls"
          leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
          rightButton={<NewPollIcon onPress={props.handleToNewPoll} size={30} />} />
        {Object.keys(props.users).length > 0
          ? <ListView 
              dataSource={props.dataSource}
              renderRow={rowData => <PollPreview poll={rowData} user={props.users[rowData.uid]} />}
              style={styles.pollsList} />
          : null}
      </View>
    </Image>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  pollsList: {
    position: 'absolute',
    bottom: 50,
    width: width - 60,
    minHeight: height * 0.62,
    maxHeight: height - 145,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
  },
})
