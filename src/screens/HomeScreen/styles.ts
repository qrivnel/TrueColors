import { Dimensions, StyleSheet } from "react-native";

const useStyles = () => {
    const { width } = Dimensions.get('window');
    const boxSize = width * 0.6
    return StyleSheet.create({
        mainView: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        text: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center'
        },
        providerButton: {
            width: boxSize,
            height: boxSize,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        darkModeButton: {
            alignSelf: 'auto',
        }
    })
}

export default useStyles;