import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View, Text } from "react-native";
import { IconButton, Modal, Portal, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Plant } from "../../../lib/data/model/plants";
import style from "./PlantCard.scss";
import AppStyle from "../../../styles/global.scss";

interface PlantListCardProps {
  plant: Plant;
  index: number;
}

const PlantListCard = ({ plant, index }: PlantListCardProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  let containerStyle = { ...style["plantCard"] };
  if (index % 3 === 0) {
    containerStyle = { ...containerStyle, ...style["plantCard---third"] };
  }

  return (
    <>
      <View style={style["plantCard"]}>
        <TouchableOpacity onLongPress={() => setVisible(!visible)}>
          <ImageBackground
            source={{ uri: plant.image }}
            resizeMode="contain"
            style={style["plantCard__image"]}
          />
          <Icon
            style={style["plantCard__heart"]}
            size={10}
            name={!plant.favorite ? "heart" : "heart-outline"}
            color="#e91e63"
          />
          <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)}>
              <View style={AppStyle["modal"]}>
                <Title>Upload an image</Title>
                <Text>Lorem ipsum dolor</Text>
                <View style={AppStyle["modal__content"]}>
                  <IconButton icon="camera" size={60} color={"#00897b"} />
                  <IconButton icon="image-album" size={60} color={"#00897b"} />
                </View>
              </View>
            </Modal>
          </Portal>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PlantListCard;
