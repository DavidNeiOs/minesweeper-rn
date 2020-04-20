import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  RefForwardingComponent,
  useEffect,
  useRef,
} from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import Images from "../../assets/img";

interface Handles {
  onReveal: (isUserAction: boolean) => void;
  setNeighbors: React.Dispatch<React.SetStateAction<number>>;
  getIsMined: () => boolean;
}

interface CellProps {
  width: number;
  height: number;
  x: number;
  y: number;
  onReveal: (x: number, y: number) => void;
  onDie: () => void;
  isGameOver: boolean;
}

export type CellType = RefForwardingComponent<Handles, CellProps>;

const CellComponent: CellType = (
  { width, height, ...props }: CellProps,
  ref
) => {
  const [revealed, setRevealed] = useState(false);
  const [isMined, setIsMined] = useState(Math.random() < 0.2);
  const [neighbors, setNeighbors] = useState(0);
  // This variable tell us if it's the first time the cell renders to avoid our
  // useEffect from running onReveal
  const firtsRender = useRef(true);

  useEffect(() => {
    if (firtsRender.current) {
      firtsRender.current = false;
      return;
    }

    if (!revealed) return;

    if (isMined && !props.isGameOver) {
      props.onDie();
    } else {
      props.onReveal(props.x, props.y);
    }
  }, [revealed]);

  const reset = () => {
    setRevealed(false);
    setIsMined(Math.random() < 0.2);
    setNeighbors(0);
  };

  const onReveal = (isUserAction: boolean) => {
    // if the cell has alreday been revealed return
    if (revealed) return;
    // if the reveal was triggerd by adjacent cell and this cell is a Mine return
    if (!isUserAction && isMined) return;

    setRevealed(true);
  };

  // this hook exposes the fucntion in the returned object
  useImperativeHandle(ref, () => ({
    onReveal,
    setNeighbors,
    getIsMined: () => isMined,
    reset,
  }));

  if (!revealed) {
    return (
      <TouchableOpacity onPress={() => onReveal(true)}>
        <View style={[styles.cell, { width, height }]}>
          {/**Add flag Image when flagged */}
        </View>
      </TouchableOpacity>
    );
  } else {
    let content = null;
    if (isMined) {
      content = (
        <Image
          source={Images.mine}
          style={{ width: width / 2, height: height / 2 }}
          resizeMode="contain"
        />
      );
    } else if (neighbors) {
      content = <Text>{neighbors}</Text>;
    }
    return (
      <View style={[styles.cellRevealed, { width, height }]}>{content}</View>
    );
  }
};

export const Cell = forwardRef(CellComponent);

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#BDBDBD",
    borderWidth: 3,
    borderTopColor: "#FFF",
    borderLeftColor: "#FFF",
    borderBottomColor: "#7D7D7D",
    borderRightColor: "#7D7D7D",
  },
  cellRevealed: {
    backgroundColor: "#BDBDBD",
    borderWidth: 1,
    borderColor: "#7D7D7D",
    alignItems: "center",
    justifyContent: "center",
  },
});
