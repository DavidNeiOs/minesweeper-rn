import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  RefForwardingComponent,
  useEffect,
  useRef,
} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextStyle,
  Platform,
} from "react-native";

import Images from "../../assets/img";
import { GameState } from "../../screens/Board";
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect";

const getColor = (neighbors: number): TextStyle => {
  let color = "black";
  if (neighbors === 1) color = "forestgreen";
  if (neighbors === 2) color = "navy";
  if (neighbors >= 3) color = "crimson";
  return {
    color,
  };
};

interface Handles {
  onReveal: (isUserAction: boolean) => void;
  setNeighbors: React.Dispatch<React.SetStateAction<number>>;
  getIsMined: () => boolean;
  setNewValues: () => void;
  reset: () => void;
  isDone: () => boolean;
}

interface CellProps {
  width: number;
  height: number;
  x: number;
  y: number;
  onReveal: (x: number, y: number) => void;
  onDie: () => void;
  isGameOver: GameState;
  getWinner: () => void;
  onFlagCell: (add: boolean) => void;
}

type CellType = RefForwardingComponent<Handles, CellProps>;

const CellComponent: CellType = (
  { width, height, ...props }: CellProps,
  ref
) => {
  const mined = useRef(Math.random() < 0.2);
  const [revealed, setRevealed] = useState(false);
  const [isMined, setIsMined] = useState(mined.current);
  const [neighbors, setNeighbors] = useState(0);
  const [flagged, setFlagged] = useState(false);

  useDidUpdateEffect(() => {
    if (!revealed) return;

    if (isMined && !props.isGameOver.over && !flagged) {
      props.onDie();
      return;
    } else if (flagged && !isMined) {
      props.onFlagCell(false);
    }
    props.onReveal(props.x, props.y);
  }, [revealed]);

  useDidUpdateEffect(() => {
    props.onFlagCell(flagged);
  }, [flagged]);

  const reset = () => {
    setRevealed(false);
    setIsMined(mined.current);
    setNeighbors(0);
    setFlagged(false);
  };

  const setNewValues = () => {
    setRevealed(false);
    mined.current = Math.random() < 0.2;
    setIsMined(mined.current);
    setNeighbors(0);
    setFlagged(false);
  };

  const onReveal = (isUserAction: boolean) => {
    // if the cell has alreday been revealed return
    if (revealed) return;
    // if the reveal was triggered by adjacent cell and this cell is a Mine return
    if (!isUserAction && isMined) return;

    setRevealed(true);
  };

  const flagCell = () => {
    setFlagged((flagged) => !flagged);
  };

  // this hook exposes the fucntions in the returned object
  useImperativeHandle(ref, () => ({
    onReveal,
    setNeighbors,
    setNewValues,
    reset,
    getIsMined: () => isMined,
    isDone: () => {
      return (isMined && flagged) || (!isMined && revealed);
    },
  }));

  const getContent = () => {
    if (!revealed && flagged) {
      return (
        <Image
          source={Images.flag}
          resizeMode="center"
          style={{ width, height }}
        />
      );
    } else if (isMined) {
      if (flagged) {
        return (
          <Image
            source={Images.flaggedMine}
            resizeMode="center"
            style={{ width, height }}
          />
        );
      } else if (revealed) {
        return (
          <Image
            source={Images.mine}
            style={{ width: width / 2, height: height / 2 }}
            resizeMode="contain"
          />
        );
      }
    } else if (neighbors) {
      return (
        <Text style={[styles.neighborsText, getColor(neighbors)]}>
          {neighbors}
        </Text>
      );
    }
    return null;
  };

  const handlePress = () => {
    onReveal(true);
    props.getWinner();
  };

  const handleLongPress = () => {
    flagCell();
    props.getWinner();
  };

  return !revealed ? (
    <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
      <View style={[styles.cell, { width, height }]}>{getContent()}</View>
    </TouchableOpacity>
  ) : (
    <View style={[styles.cellRevealed, { width, height }]}>{getContent()}</View>
  );
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
  neighborsText: {
    fontFamily: Platform.OS === "android" ? "serif" : "Verdana",
    fontWeight: "bold",
    fontSize: 16,
  },
});
