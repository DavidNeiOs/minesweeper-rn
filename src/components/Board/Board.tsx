import React, { useRef } from "react";
import { View } from "react-native";

import { CONSTANTS } from "../../constants";
import { Cell } from "../Cell";

interface BoardProps {}

export const Board: React.FC<BoardProps> = ({}) => {
  const { CELL_SIZE, BOARD_SIZE } = CONSTANTS;
  const boardWidth = CELL_SIZE * BOARD_SIZE;
  let grid = Array.apply(null, Array(BOARD_SIZE)).map((row, idx) => {
    return Array.apply(null, Array(BOARD_SIZE)).map((col, idx) => {
      return useRef(null);
    });
  });

  const renderBoard = () => {
    return Array.apply(null, Array(BOARD_SIZE)).map((row, rowIdx) => {
      let cellList = Array.apply(null, Array(BOARD_SIZE)).map((col, colIdx) => {
        return (
          <Cell
            key={`${rowIdx}-${colIdx}`}
            width={CELL_SIZE}
            height={CELL_SIZE}
            x={rowIdx}
            y={colIdx}
            ref={grid[rowIdx][colIdx]}
          />
        );
      });

      return (
        <View style={{ width: boardWidth, flexDirection: "row" }} key={rowIdx}>
          {cellList}
        </View>
      );
    });
  };
  return (
    <View
      style={{
        width: boardWidth,
        height: boardWidth,
        backgroundColor: "#888",
      }}
    >
      {renderBoard()}
    </View>
  );
};
