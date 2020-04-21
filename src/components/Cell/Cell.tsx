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
import { GameState } from "../Board";

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
  isGameOver: GameState;
  getWinner: () => void;
}

export type CellType = RefForwardingComponent<Handles, CellProps>;

const CellComponent: CellType = (
  { width, height, ...props }: CellProps,
  ref
) => {
  const mined = useRef(Math.random() < 0.2);
  const [revealed, setRevealed] = useState(false);
  const [isMined, setIsMined] = useState(mined.current);
  const [neighbors, setNeighbors] = useState(0);
  const [flagged, setFlagged] = useState(false);
  // This variable tell us if it's the first time the cell renders to avoid our
  // useEffect from running onReveal
  const firtsRender = useRef(true);

  useEffect(() => {
    if (firtsRender.current) {
      firtsRender.current = false;
      return;
    }

    if (!revealed) return;

    if (isMined && !props.isGameOver.over && !flagged) {
      props.onDie();
    } else {
      props.onReveal(props.x, props.y);
    }
  }, [revealed]);

  const reset = () => {
    setRevealed(false);
    setIsMined(mined.current);
    setNeighbors(0);
    setFlagged(false);
  };

  const onReveal = (isUserAction: boolean) => {
    // if the cell has alreday been revealed return
    if (revealed) return;
    // if the reveal was triggerd by adjacent cell and this cell is a Mine return
    if (!isUserAction && isMined) return;

    setRevealed(true);
  };

  const flagCell = () => {
    setFlagged((flagged) => !flagged);
  };

  // this hook exposes the fucntion in the returned object
  useImperativeHandle(ref, () => ({
    onReveal,
    setNeighbors,
    getIsMined: () => isMined,
    reset,
    isDone: () => {
      return (isMined && flagged) || (!isMined && revealed);
    },
  }));

  if (!revealed) {
    return (
      <TouchableOpacity
        onPress={() => {
          onReveal(true);
          props.getWinner();
        }}
        onLongPress={() => {
          flagCell();
          props.getWinner();
        }}
      >
        <View style={[styles.cell, { width, height }]}>
          {flagged ? (
            <Image
              source={Images.flag}
              resizeMode="center"
              style={{ width, height }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  } else {
    let content = null;
    if (isMined) {
      if (flagged) {
        content = (
          <Image
            source={Images.flaggedMine}
            resizeMode="contain"
            style={{ width, height }}
          />
        );
      } else {
        content = (
          <Image
            source={Images.mine}
            style={{ width: width / 2, height: height / 2 }}
            resizeMode="contain"
          />
        );
      }
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
