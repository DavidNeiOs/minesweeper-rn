import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

import { Board } from "../screens/Board";
import { Rules } from "../screens/Rules/Rules";
import { Welcome } from "../screens/Welcone";

export type MainParamList = {
  Welcome: undefined;
  Board: undefined;
  Rules: undefined;
};

export type MainNavProps<T extends keyof MainParamList> = {
  navigation: StackNavigationProp<MainParamList, T>;
  route: RouteProp<MainParamList, T>;
};

const Stack = createStackNavigator<MainParamList>();

export const MainNavigator: React.FC<{}> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="Rules" component={Rules} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
