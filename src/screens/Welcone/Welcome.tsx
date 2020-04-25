import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainNavProps } from "../../navigation/mainNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";

interface RulesProps extends MainNavProps<"Rules"> {}

export const Welcome: React.FC<RulesProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mine-Sweeper</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPlay]}
          onPress={() => navigation.navigate("Board")}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonRules]}
          onPress={() => navigation.navigate("Rules")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Rules</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BDBDBD",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "indigo",
  },
  container: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    borderBottomWidth: 3,
    minWidth: 100,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonPlay: {
    backgroundColor: "lawngreen",
    borderBottomColor: "green",
  },
  buttonRules: {
    backgroundColor: "mediumpurple",
    borderBottomColor: "indigo",
  },
  buttonText: {
    fontSize: 18,
  },
});
