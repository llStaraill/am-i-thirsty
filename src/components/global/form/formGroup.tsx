import React from "react";
import { View } from "react-native";
import style from "./formGroup.scss";

interface FormGroupProps {
  children: any;
  position?: "left" | "center" | "right";
}

const FormGroup = ({ children, position }: FormGroupProps) => {
  return <View style={{ ...style.formGroup }}>{children}</View>;
};

export default FormGroup;
