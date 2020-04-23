import React, { useRef, useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import { CONSTANTS } from "../../constants";
import { Cell } from "../../components/Cell";
import { ModalContext, Options } from "../../contexts/ModalContext";
import { Score } from "../../components/Score";
import { MainNavProps } from "../../navigation/mainNavigator";
import { TouchableButton } from "../../components/TouchableButton";

const GameResult = {
  lost: "LOST",
  win: "WIN",
};

export interface GameState {
  over: boolean;
  result: string;
}

interface BoardProps extends MainNavProps<"Board"> {}

export const Board: React.FC<BoardProps> = ({ navigation }) => {
  const [isGameOver, setIsGameOver] = useState<GameState>({
    over: false,
    result: "",
  });
  const { CELL_SIZE, BOARD_SIZE } = CONSTANTS;
  const boardWidth = CELL_SIZE * BOARD_SIZE;

  const { showModal } = useContext(ModalContext);

  const [score, setScore] = useState(0);
  const [flaggedMines, setFlaggedMines] = useState(0);

  const timer = useRef(0);

  useEffect(() => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setScore((score) => score + 1);
    }, 1000);
  }, [isGameOver]);

  // We keep a reference to evey cell since we need to access them later
  let grid = Array.apply(null, Array(BOARD_SIZE)).map((row, idx) => {
    return Array.apply(null, Array(BOARD_SIZE)).map((col, idx) => {
      return useRef(null);
    });
  });

  useEffect(() => {
    // Effect that reveals all cells and shows the modal when the game is over
    if (!isGameOver.over) return;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        // havent found the proper way to type the useRef hook
        //@ts-ignore
        grid[i][j].current?.onReveal(true);
      }
    }
    clearInterval(timer.current);
    timer.current = 0;

    let options = {} as Options;
    if (isGameOver.result === GameResult.lost) {
      options = {
        title: "You Lose!",
        message: "You stepped on a mine.",
        buttonText: "Retry",
        score: 0,
        action: reset,
      };
    } else {
      options = {
        title: "You Win!",
        message: "You found all the mines",
        buttonText: "New Game",
        score,
        action: newGame,
      };
    }

    showModal(options);
  }, [isGameOver]);

  const onDie = () => {
    setIsGameOver({ over: true, result: GameResult.lost });
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
   * Find how many mines are around the cell, if none reveal surounding cells
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
   * add or decrease mine counter
   */
  const onFlagCell = (add: boolean) => {
    setFlaggedMines((val) => {
      if (add) return val + 1;
      if (!add && val === 0) return 0;
      return val - 1;
    });
  };

  /**
   * if all mines have been flagged and non mines unvealed return true
   */
  const getWinner = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        // @ts-ignore
        if (!grid[i][j].current?.isDone()) {
          return;
        }
      }
    }
    setIsGameOver({ over: true, result: GameResult.win });
  };

  /**
   * Reset cells to try again
   */
  const reset = () => {
    setIsGameOver({ over: false, result: "" });
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        //@ts-ignore
        grid[i][j].current?.reset();
      }
    }
    setScore(0);
  };

  /**
   * Start a new game
   */
  const newGame = () => {
    setIsGameOver({ over: false, result: "" });
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        //@ts-ignore
        grid[i][j].current?.setNewValues();
      }
    }
    setScore(0);
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
            getWinner={getWinner}
            onFlagCell={onFlagCell}
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
    <View style={styles.container}>
      <Score
        boardWidth={boardWidth}
        score={score}
        flaggedMines={flaggedMines}
      />
      <View>{renderBoard()}</View>
      <TouchableButton
        style={styles.button}
        onPress={() => {
          navigation.navigate("Rules");
        }}
      >
        <Text style={styles.buttonText}>Rules</Text>
      </TouchableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    borderBottomColor: "green",
    borderBottomWidth: 3,
    backgroundColor: "greenyellow",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
  },
});
