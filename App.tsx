import React from "react";
import { StyleSheet, View } from "react-native";

import { Board } from "./src/components/Board";

export default function App() {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
});
