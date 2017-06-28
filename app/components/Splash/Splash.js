import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from '~/styles'
const valleyBg = require('~/images/valley-bg.jpg')
const logo = require('~/images/logo.png')
const { width } = Dimensions.get('window')

Splash.propTypes = {
  onLoginFinished: PropTypes.func.isRequired,
}

export default function Splash(props) {
  return (
    <Image source={valleyBg} style={styles.fullscreen}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.slogan}>React Polls</Text>
        </View>
        <View style={styles.loginContainer}>
          <LoginButton 
            onLoginFinished={props.onLoginFinished}
            style={styles.loginButton} />
          <Text style={styles.assuranceText}>Don&rsquo;t worry, we don&rsquo;t post anything to Facebook.</Text>
        </View>
      </View>
    </Image>
  )
}

const styles = StyleSheet.create({
  fullscreen: {
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
    paddingTop: 75,
    paddingBottom: 75,
  },

  logoContainer: {
    alignItems: 'center',
    position: 'relative',
  },

  logo: {
    width: 200,
    height: 200,
  },

  slogan: {
    position: 'absolute',
    bottom: 0,
    color: colors.black,
    fontFamily: 'Karla',
    fontSize: 50,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },

  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  loginButton: {
    width: width * .8,
    height: 60,
  },

  assuranceText: {
    width: width * .8,
    height: 70,
    paddingTop: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: colors.white,
    fontFamily: 'Karla',
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  }
})
