import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { ModalProvider } from "./src/contexts/ModalContext";
import { MainNavigator } from "./src/navigation/mainNavigator";
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
    <SafeAreaProvider>
      <ModalProvider>
        <MainNavigator />
        <Modal />
      </ModalProvider>
    </SafeAreaProvider>
  );
}
