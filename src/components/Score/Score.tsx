import React from "react";
import { View, Text } from "react-native";

interface ScoreProps {
  boardWidth: number;
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ boardWidth, score }) => {
  return (
    <View
      style={{
        width: boardWidth,
        padding: 4,
        borderColor: "black",
        borderWidth: 3,
        backgroundColor: "black",
        alignItems: "flex-end",
      }}
    >
      <Text
        style={{
          color: "red",
          fontSize: 24,
          letterSpacing: 2,
          fontWeight: "bold",
          fontFamily: "display-dismay",
        }}
      >
        {score.toString().padStart(3, "0")}
      </Text>
    </View>
  );
};
