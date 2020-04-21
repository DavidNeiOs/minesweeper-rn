import React, { useContext } from "react";
import {
  Modal as NativeModal,
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { ModalContext } from "../../contexts/ModalContext";
import { TouchableButton } from "../TouchableButton";

interface ModalProps {}

export const Modal: React.FC<ModalProps> = ({}) => {
  const { isModalShown, options, hideModal } = useContext(ModalContext);

  return (
    <NativeModal visible={isModalShown} transparent onRequestClose={() => {}}>
      <View style={styles.modal}>
        <Animatable.View
          style={styles.container}
          animation="bounceInUp"
          duration={1000}
          easing="ease-out"
        >
          <Animatable.View
            style={styles.alert}
            animation={scale}
            duration={500}
            delay={1000}
          >
            <Text>{options.message}</Text>
            <TouchableButton
              onPress={() => {
                options.action();
                hideModal();
              }}
            >
              <View>
                <Text>RETRY</Text>
              </View>
            </TouchableButton>
          </Animatable.View>
        </Animatable.View>
      </View>
    </NativeModal>
  );
};

const scale: Animatable.CustomAnimation = {
  0: {
    scaleX: 1,
    scaleY: 1,
  },
  0.5: {
    scaleX: 1.4,
    scaleY: 1.4,
  },
  1: {
    scaleX: 1,
    scaleY: 1,
  },
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    width: "75%",
  },
  alert: {
    minHeight: 168,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
  },
});
