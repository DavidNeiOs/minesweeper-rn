import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ScoreProps {
  boardWidth: number;
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ boardWidth, score }) => {
  return (
    <View style={[{ width: boardWidth }, styles.container]}>
      <Text style={styles.score}>{score.toString().padStart(3, "0")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderColor: "black",
    borderWidth: 3,
    backgroundColor: "black",
    alignItems: "flex-end",
  },
  score: {
    color: "red",
    fontSize: 24,
    letterSpacing: 2,
    fontWeight: "bold",
    fontFamily: "display-dismay",
  },
});
