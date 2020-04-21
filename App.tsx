import React from "react";
import { StyleSheet, View } from "react-native";

import { ModalProvider } from "./src/contexts/ModalContext";
import { Board } from "./src/components/Board";
import { Modal } from "./src/components/Modal";

export default function App() {
  return (
    <View style={styles.container}>
      <ModalProvider>
        <Board />
        <Modal />
      </ModalProvider>
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
