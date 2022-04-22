import React from "react";
import { View } from "react-native";
import { mdiDog } from "@mdi/js";
import { Toxicity } from "../../../lib/data/model/plants";
import Icon from "react-native-vector-icons/FontAwesome";

import style from "./toxicityIndicator.scss";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCat,
  faSkullCrossbones,
  faPerson,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

interface ToxicityIndicatorProps {
  toxicity: Toxicity;
}
export const ToxicityIndicator = ({ toxicity }: ToxicityIndicatorProps) => {
  return (
    <View style={style["toxicity"]}>
      {toxicity.pets || toxicity.humans ? (
        <FontAwesomeIcon icon={faSkullCrossbones} size={30} color="purple" />
      ) : (
        <FontAwesomeIcon icon={faLeaf} size={30} color="turquoise" />
      )}
      {toxicity.humans && (
        <View style={style["toxicity__icon"]}>
          <FontAwesomeIcon icon={faCat} size={20} />
        </View>
      )}
      {toxicity.pets && (
        <View style={style["toxicity__icon"]}>
          <FontAwesomeIcon icon={faPerson} size={20} />
        </View>
      )}
    </View>
  );
};

export default ToxicityIndicator;
