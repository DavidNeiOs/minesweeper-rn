import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { ModalProvider } from "./src/contexts/ModalContext";
import { Board } from "./src/components/Board";
import { Modal } from "./src/components/Modal";

const fetchFonts = () => {
  return Font.loadAsync({
    "display-dismay": require("./src/assets/fonts/digital-dismay.otf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
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
