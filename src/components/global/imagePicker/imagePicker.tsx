import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { IconButton, Modal, Portal, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

import style from "./imagePicker.scss";
import globalStyle from "../../../styles/global.scss";

interface ImagePickerComponentProps {
  uri: string | null;
  setPlantPhoto: (imageUri: any) => void;
}

const ImagePickerComponent = ({
  uri,
  setPlantPhoto,
}: ImagePickerComponentProps) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (uri) {
      setImage(uri);
    }
  }, [uri]);

  const handleImageFromDevice = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setPlantPhoto(result.uri);
    }
    setVisible(false);
  };

  const handleImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setPlantPhoto(result.uri);
    }
    setVisible(false);
  };

  const handleDeleteClicked = () => {
    setImage(null);
  };

  return (
    <>
      <View style={style.imagePicker}>
        {image ? (
          <>
            <ImageBackground
              style={style["imagePicker__image"]}
              resizeMode="center"
              source={{
                uri: image,
              }}
            />
            <TouchableOpacity
              style={{
                ...style["imagePicker__image__button"],
                ...style["imagePicker__image__button--cancel"],
              }}
              onPress={() => handleDeleteClicked()}
            >
              <Icon name="close" size={40} color={"white"} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={style["imagePicker__image"]} />
            <TouchableOpacity
              style={style["imagePicker__image__button"]}
              onPress={() => setVisible(true)}
            >
              <Icon name="plus" size={40} color={"white"} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View style={globalStyle["modal"]}>
            <Title>Upload an image</Title>
            <Text>Lorem ipsum dolor</Text>
            <View style={globalStyle["modal__content"]}>
              <IconButton
                icon="camera"
                size={60}
                color={"#00897b"}
                onPress={() => handleImageFromCamera()}
              />
              <IconButton
                icon="image-album"
                size={60}
                color={"#00897b"}
                onPress={() => handleImageFromDevice()}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default ImagePickerComponent;
