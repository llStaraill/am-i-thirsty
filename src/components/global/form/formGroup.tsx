import React from "react";
import { View } from "react-native";
import style from "./formGroup.scss";

interface FormGroupProps {
  children: any;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <View style={style.formGroup}>{children}</View>;
};

export default FormGroup;
