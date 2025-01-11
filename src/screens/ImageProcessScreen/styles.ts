import {Dimensions, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

import useDefaultStyles from '../../config/defaultStyles';

const useStyles = () => {
  const {defaultScreen, defaultText, defaultComponent} = useDefaultStyles();
  const {width, height} = Dimensions.get('window');
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  return StyleSheet.create({
    mainView: {
      ...defaultScreen,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...defaultText,
    },
    takePictureButton: {
      ...defaultComponent,
      borderWidth: 1,
      borderRadius: 100,
      width: width * 0.6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginVertical: height * 0.015,
      paddingVertical: 10,
    },
    moreButton: {
      ...defaultComponent,
      borderWidth: 1,
      borderRadius: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: height * 0.015,
      paddingVertical: 15,
      paddingHorizontal: width * 0.05,
    },
    originalImageView: {
      ...defaultComponent,
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.8,
      height: width * 0.8,
      borderWidth: 1,
      borderRadius: 20,
      overflow: 'hidden',
      marginVertical: height * 0.015,
    },
    processedImagesView: {
      width: width * 0.8,
      height: width * 0.8,
      marginVertical: height * 0.015,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 20,
      overflow: 'hidden',
    },
    processedImageTab: {
      ...defaultComponent,
      width: '100%',
      height: '15%',
      bottom: 0,
      backgroundColor: darkMode ? 'rgba(36, 37, 47, 0.2)' : 'rgba(245, 247, 249, 0.2)',
      padding: 15,
      justifyContent: 'flex-end',
      position: 'absolute',
    },
    imagesScroller: {
      ...defaultComponent,
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },
    icon: {
      ...defaultText,
    },
    modalContainer: {
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalCloseButton: {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    captionText: {
      ...defaultComponent,
      ...defaultText,
      padding: width * 0.3,
      borderRadius: 30,
    },
  });
};

export default useStyles;
