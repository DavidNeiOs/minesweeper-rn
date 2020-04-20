import React, { useState, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CONSTANTS } from "../../constants";

interface CellProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const Cell = forwardRef(({ width, height }: CellProps, ref) => {
  const [revealed, setRevealed] = useState(false);
  const [isMined, setIsMined] = useState(Math.random() < 0.2);
  const [neighbors, setNeighbors] = useState(null);

  const onReveal = () => {};

  useImperativeHandle(ref, () => ({
    onReveal,
  }));

  return (
    <TouchableOpacity onPress={onReveal}>
      <View style={[styles.cell, { width, height }]}></View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#BDBDBD",
    borderWidth: 3,
    borderTopColor: "#FFF",
    borderLeftColor: "#FFF",
    borderBottomColor: "#7D7D7D",
    borderRightColor: "#7D7D7D",
  },
});
