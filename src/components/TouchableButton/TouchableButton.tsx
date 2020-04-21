import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TouchableNativeFeedbackProps,
} from "react-native";

interface TouchableButtonProps extends TouchableNativeFeedbackProps {}

/**
 * Touchable component that switches from TouchableOpacity to TouchableNativeFeedback on android v21+
 */
export const TouchableButton: React.FC<TouchableButtonProps> = ({
  children,
  ...props
}) => {
  if (Platform.OS === "android" && Platform.Version >= 21) {
    return (
      <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};
