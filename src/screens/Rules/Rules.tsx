import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainNavProps } from "../../navigation/mainNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";

const rules = [
  "Once the game starts the counter start adding every second.",
  "To reveal a cell press on it.",
  "If there isn't a mine it will show the number of mines in adjacent cells.",
  "To flag a cell press longer and a flag will appear.",
  "If you reveal a cell that has a mine you lose the game.",
  "If you reveal a cell that has a mine but it's flagged you will not lose.",
  "To win you have to reveal all cells that don't have mines and flag those that do.",
];

interface RuleProps {
  index: number;
  text: String;
}

function Rule({ index, text }: RuleProps) {
  return (
    <View style={styles.rule}>
      <Text style={styles.index}>{index}.</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

interface RulesProps extends MainNavProps<"Rules"> {}

export const Rules: React.FC<RulesProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Rules</Text>
      </View>
      <View style={styles.container}>
        {rules.map((text, index) => (
          <Rule text={text} index={index + 1} key={index} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#BDBDBD",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "indigo",
  },
  container: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  rule: {
    flexDirection: "row",
    width: "100%",
    padding: 4,
    marginBottom: 8,
  },
  index: {
    fontSize: 20,
    marginRight: 4,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    borderBottomColor: "midnightblue",
    borderBottomWidth: 3,
    backgroundColor: "powderblue",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
  },
});
