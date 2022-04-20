import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, ScrollView } from "react-native";
import { Divider, Paragraph, Subheading, Title } from "react-native-paper";
import Container from "../components/global/container";
import Section from "../components/global/section";
import { RootStackNavigatorProps } from "../navigators/rootNavigator";

import AppStyles from "../styles/global.scss";

export type SettingScreenProps = NativeStackScreenProps<
  RootStackNavigatorProps,
  "Settings"
>;

const SettingScreen = () => {
  return (
    <ScrollView style={AppStyles.main}>
      <Section headline="About this app">
        <Paragraph>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua.
        </Paragraph>
      </Section>
      <Section headline="Version">
        <Paragraph style={{ textAlign: "center" }}>0.0.1</Paragraph>
      </Section>
      <Section headline="Developer">
        <Paragraph style={{ textAlign: "center" }}>llStaraill</Paragraph>
      </Section>
      <Section headline="Buy me a coffee?">
        <Paragraph style={{ textAlign: "center" }}>Pwease</Paragraph>
      </Section>
    </ScrollView>
  );
};

export default SettingScreen;
