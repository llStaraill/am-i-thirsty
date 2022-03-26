import React from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";

const PlantListCard = () => {
  return (
    <Card>
      <Card.Title title="Plant Name" />
      <Card.Content>
        <Title>Card Content Title</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
          aperiam sint dicta est officia recusandae quaerat similique doloribus?
          Nemo doloremque nisi assumenda! Est explicabo quia delectus, dicta
          asperiores totam excepturi!
        </Paragraph>
      </Card.Content>
      <Card.Cover
        source={{ uri: "https://reactnative.dev/docs/assets/p_cat2.png" }}
      />
      <Card.Actions>
        <Button>Water</Button>
        <Button>Edit</Button>
      </Card.Actions>
    </Card>
  );
};

export default PlantListCard;
