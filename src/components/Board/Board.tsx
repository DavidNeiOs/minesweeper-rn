import React, { useRef, useState, useEffect } from "react";
import { View, Alert, Button } from "react-native";

import { CONSTANTS } from "../../constants";
import { Cell } from "../Cell";

interface BoardProps {}

export const Board: React.FC<BoardProps> = ({}) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const { CELL_SIZE, BOARD_SIZE } = CONSTANTS;
  const boardWidth = CELL_SIZE * BOARD_SIZE;

  // We keep a reference to evey cell since we need to access them later
  let grid = Array.apply(null, Array(BOARD_SIZE)).map((row, idx) => {
    return Array.apply(null, Array(BOARD_SIZE)).map((col, idx) => {
      return useRef(null);
    });
  });

  useEffect(() => {
    // Effect that reveals all cells when the game is over
    if (!isGameOver) return;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        // havent found the proper way to type the useRef hook
        //@ts-ignore
        grid[i][j].current?.onReveal(true);
      }
    }
  }, [isGameOver]);

  const onDie = () => {
    setIsGameOver(true);
    Alert.alert("Ooops you stepped on a mine!");
  };

  /**
   * loop through the surounding and trigger their onReveal function
   * @param x position of empty cell x axis
   * @param y position of empty cell y axis
   */
  const revealNeighbors = (x: number, y: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          x + i >= 0 &&
          x + i <= BOARD_SIZE - 1 &&
          y + j >= 0 &&
          y + j <= BOARD_SIZE - 1
        ) {
          //@ts-ignore
          grid[x + i][y + j].current?.onReveal(false);
        }
      }
    }
  };

  /**
   * Find how many mains are around the cell, if any reveal surounding cells
   * @param x position of the current cell on x postion
   * @param y position of the current cell on y postion
   */
  const onReveal = (x: number, y: number) => {
    let neighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          x + i >= 0 &&
          x + i <= BOARD_SIZE - 1 &&
          y + j >= 0 &&
          y + j <= BOARD_SIZE - 1
        ) {
          //@ts-ignore
          if (grid[x + i][y + j].current?.getIsMined()) {
            neighbors++;
          }
        }
      }
    }
    if (neighbors) {
      //@ts-ignore
      grid[x][y].current?.setNeighbors(neighbors);
    } else {
      revealNeighbors(x, y);
    }
  };

  /**
   * Create a new game by resetting cells state
   */
  const newGame = () => {
    setIsGameOver(false);
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        //@ts-ignore
        grid[i][j].current?.reset();
      }
    }
  };

  /**Create Board */
  const renderBoard = () => {
    return Array.apply(null, Array(BOARD_SIZE)).map((row, rowIdx) => {
      let cellList = Array.apply(null, Array(BOARD_SIZE)).map((col, colIdx) => {
        return (
          <Cell
            onReveal={onReveal}
            onDie={onDie}
            key={`${rowIdx}-${colIdx}`}
            width={CELL_SIZE}
            height={CELL_SIZE}
            x={rowIdx}
            y={colIdx}
            ref={grid[rowIdx][colIdx]}
            isGameOver={isGameOver}
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
      <Button title="New Game" onPress={newGame} />
    </View>
  );
};
