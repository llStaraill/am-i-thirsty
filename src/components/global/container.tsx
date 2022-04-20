import { Surface } from "react-native-paper";
import Style from "./container.scss";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <Surface style={Style.container}>{children}</Surface>;
};

export default Container;
