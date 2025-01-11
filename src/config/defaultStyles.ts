import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const defaultStyles = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  return StyleSheet.create({
    defaultText: {
      fontFamily: 'sans-serif',
      color: darkMode ? '#DFDFDF' : '#1A1C1E',
    },
    defaultScreen: {
      flex: 1,
      backgroundColor: darkMode ? '#1A191B' : '#FFFFFF',
    },
    defaultComponent: {
      backgroundColor: darkMode ? '#24252F' : '#F5F7F9',
    }
  })
}

export default defaultStyles
