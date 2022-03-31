import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { IconButton, Modal, Portal, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

interface ImagePickerComponentProps {
  uri?: string;
}

const ImagePickerComponent = ({ uri }: ImagePickerComponentProps) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (uri) {
      setImage(uri);
    }
  }, [uri]);

  const handleImageFromDevice = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setVisible(false);
  };

  const handleImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setVisible(false);
  };

  const handleDeleteClicked = () => {
    setImage(null);
  };

  return (
    <>
      <View>
        {image ? (
          <>
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{
                uri: image,
              }}
            />
            <TouchableOpacity onPress={() => handleDeleteClicked()}>
              <Icon name="close" size={40} color={"gray"} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon name="plus" size={40} color={"gray"} />
          </TouchableOpacity>
        )}
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              margin: 25,
              borderRadius: 50,
            }}
          >
            <Title style={{ textAlign: "center" }}>Upload an image</Title>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <IconButton
                style={{ flexBasis: 50 }}
                icon="camera"
                size={40}
                color={"#00897b"}
                onPress={() => handleImageFromCamera()}
              />
              <IconButton
                style={{ flexBasis: 50 }}
                icon="image-album"
                size={40}
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
