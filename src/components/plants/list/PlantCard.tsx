import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Plant } from "../../../lib/data/model/plants";
import style from "./PlantCard.scss";

interface PlantListCardProps {
  plant: Plant;
  onPress: () => void;
}

const PlantListCard = ({ plant, onPress }: PlantListCardProps) => {
  return (
    <>
      <View style={style["plantCard"]}>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground
            source={{ uri: plant.image }}
            resizeMode="contain"
            style={style["plantCard__image"]}
          />
          <IconButton
            icon="water"
            size={25}
            style={style["plantCard__water"]}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PlantListCard;
