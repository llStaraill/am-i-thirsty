import React, { ReactNode } from "react";
import { View } from "react-native";
import { Subheading } from "react-native-paper";
import Style from "./section.scss";

interface SectionProps {
  headline?: string;
  children: ReactNode;
}

const Section = ({ children, headline }: SectionProps) => {
  return (
    <View style={Style.section}>
      {headline && (
        <View style={Style.subheadingContainer}>
          <Subheading style={Style.subheading}>{headline}</Subheading>
        </View>
      )}
      <View>{children}</View>
    </View>
  );
};

export default Section;
