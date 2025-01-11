import { TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import MoonIcon from './moon-icon.png'
import SunIcon from './sun-icon.png'
import { Avatar, Icon, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

interface ProviderButtonProps {
    text: string
    interpolatedValueText: any
    interpolatedValueComponent: any
    isLoading: boolean
}

export const ProviderButton = ({ text, interpolatedValueText, interpolatedValueComponent, isLoading }: ProviderButtonProps) => {
    const styles = useStyles()
    const { navigate } = useNavigation<any>()
    const handleToNavigate = () => {
        if (text === 'Renk Körüyüm')
            navigate('image-process')
        else if (text === 'Simülasyon')
            navigate('simulation')
    }
    return (
        <TouchableOpacity disabled={isLoading} onPress={handleToNavigate}>
            <Animated.View style={[styles.providerButton, { backgroundColor: interpolatedValueComponent }]} >
                <Animated.Text style={[styles.text, { color: interpolatedValueText }]}>
                    {text}
                </Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

interface ToggleDarkModeButtonProps {
    toggleToDark: any
    isLoading: boolean
}
export const ToggleDarkModeButton = ({ toggleToDark, isLoading }: ToggleDarkModeButtonProps) => {
    const styles = useStyles()
    const { darkMode } = useSelector((state: RootState) => state.darkMode)
    return (
        <TouchableOpacity disabled={isLoading} onPress={() => toggleToDark()} style={styles.darkModeButton}>
            <Avatar.Icon size={40} icon={darkMode ? SunIcon : MoonIcon} />
        </TouchableOpacity>
    )
}