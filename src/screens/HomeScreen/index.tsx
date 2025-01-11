import { Animated, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ProviderButton, ToggleDarkModeButton } from './buttons'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../../redux/DarkMode'
import { RootState } from '../../redux/store'



const HomePage = () => {
  const styles = useStyles()
  const { darkMode } = useSelector((state: RootState) => state.darkMode)
  const [darkModeState, setDarkModeState] = useState(darkMode)
  const animation = useRef(new Animated.Value(darkMode ? 1 : 0)).current;
  const interpolatedValueText = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1A1C1E', '#DFDFDF']
  })

  const interpolatedValueScreen = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#1A191B']
  })

  const interpolatedValueComponent = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F5F7F9', '#24252F']
  })

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const toggleToDark = () => {
    dispatch(setDarkMode(!darkModeState))
    setIsLoading(true)
    const toValue = darkModeState ? 0 : 1
    Animated.timing(animation, {
      toValue,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      setDarkModeState(darkModeState => !darkModeState)
      setIsLoading(false)
    })
  }
  return (
    <Animated.View style={[styles.mainView, { backgroundColor: interpolatedValueScreen }]}>
      <ToggleDarkModeButton isLoading={isLoading} toggleToDark={toggleToDark} />
      <ProviderButton isLoading={isLoading} text='Renk Körüyüm' interpolatedValueText={interpolatedValueText} interpolatedValueComponent={interpolatedValueComponent} />
      <ProviderButton isLoading={isLoading} text='Simülasyon' interpolatedValueText={interpolatedValueText} interpolatedValueComponent={interpolatedValueComponent} />
    </Animated.View>
  )
}

export default HomePage