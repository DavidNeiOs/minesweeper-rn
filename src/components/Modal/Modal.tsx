import React, { useContext } from "react";
import { Modal as NativeModal, View, Text, StyleSheet } from "react-native";
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
            <View style={styles.info}>
              <Text style={styles.title}>{options.title}</Text>
              <Text style={styles.description}>{options.message}</Text>
              {Boolean(options.score) && (
                <Text style={styles.score}>Your score is: {options.score}</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableButton
                onPress={() => {
                  options.action();
                  hideModal();
                }}
                useForeground
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{options.buttonText}</Text>
                </View>
              </TouchableButton>
            </View>
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
    justifyContent: "space-around",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
  },
  info: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
  },
  score: {
    fontSize: 16,
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "dodgerblue",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "navy",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    textTransform: "uppercase",
  },
});
