import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import useStyles from './styles';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {GEMINI_API_KEY} from '../../config/constants';

interface IImageUri {
  uri: string;
}

const SimulationScreen = () => {
  const {width, height} = Dimensions.get('window');
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const styles = useStyles();
  const [imageUris, setImageUris] = useState<IImageUri[]>([]);
  const [originalImageUri, setOriginalImageUri] = useState<IImageUri>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const handleImagePress = (uri: string) => {
    setSelectedImageUri(uri);
  };

  const closeModal = () => {
    setSelectedImageUri(null);
  };

  const takePicture = async () => {
    launchCamera(
      {cameraType: 'back', mediaType: 'photo', quality: 1, includeBase64: true},
      res => {
        if (res.didCancel) {
          Alert.alert('Fotoğraf çekimi iptal edildi.');
        } else if (res.errorMessage) {
          Alert.alert('Hata: ', res.errorMessage);
        } else {
          if (res) {
            setImageUris([]);
            setOriginalImageUri({uri: res.assets?.[0]?.uri as string});
            uploadImage(res);
          }
        }
      },
    );
  };

  const uploadImage = async (res: any) => {
    const formData = new FormData();
    formData.append('image', {
      uri: res.assets?.[0]?.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      setIsLoading(true);
      await simulation(formData);
    } catch (err) {
      Alert.alert('Error', 'Error uploading image');
    } finally {
      setIsLoading(false);
    }
  };

  const simulation = async (formData: FormData) => {
    const response = await axios.post(
      'http://172.20.10.4:5002/simulation',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const images = response.data;
    images.forEach((image: string, index: number) => {
      setImageUris((prevUris: any) => [
        ...prevUris,
        {uri: 'data:image/jpeg;base64,' + image},
      ]);
    });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.originalImageView}>
          {originalImageUri ? (
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: originalImageUri.uri}}
              alt=""
            />
          ) : (
            <Icon
              source="image-plus"
              color={darkMode ? '#DFDFDF' : '#1A1C1E'}
              size={width * 0.5}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={takePicture}
          disabled={isLoading}>
          <Icon
            source="camera"
            size={width * 0.1}
            color={darkMode ? '#DFDFDF' : '#1A1C1E'}
          />
          <Text
            style={[styles.text, {fontSize: width * 0.06, fontWeight: '500'}]}>
            Fotoğraf Çek
          </Text>
        </TouchableOpacity>
        <View style={styles.processedImagesView}>
          {isLoading ? (
            <ActivityIndicator
              style={{position: 'absolute', zIndex: 1}}
              animating={true}
              color={darkMode ? '#DFDFDF' : '#1A1C1E'}
              size={width * 0.1}
            />
          ) : (
            <ScrollView
              style={styles.imagesScroller}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}>
              {imageUris &&
                imageUris.map((imageUri: IImageUri, index: number) => (
                  <View
                    key={index}
                    style={{width: width * 0.795, height: '100%'}}>
                    <TouchableOpacity
                      onPress={() => handleImagePress(imageUri.uri)}>
                      <Image
                        source={{uri: imageUri.uri}}
                        style={{
                          resizeMode: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </TouchableOpacity>
                    <View style={styles.processedImageTab}>
                      <Text
                        style={[
                          styles.text,
                          {fontSize: 15, fontWeight: 'bold'},
                        ]}>
                        {index === 0 && 'Protan'}
                        {index === 1 && 'Deutan'}
                        {index === 2 && 'Tritan'}
                      </Text>
                      <Text style={[styles.text, {fontSize: 10}]}>
                        {index === 0 && 'Kırmızı Renk Körlüğü'}
                        {index === 1 && 'Yeşil Renk Körlüğü'}
                        {index === 2 && 'Mavi Renk Körlüğü'}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          )}
          {selectedImageUri && (
            <Modal
              visible={Boolean(selectedImageUri)}
              transparent={true}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0,
              }}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeModal}>
                <View style={styles.modalContainer}>
                  {
                    <Image
                      source={{uri: selectedImageUri}}
                      style={{
                        width: width,
                        height: height,
                        resizeMode: 'contain',
                      }}
                    />
                  }
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SimulationScreen;
