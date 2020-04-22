import { Dimensions } from 'react-native'

export const CONSTANTS = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  BOARD_SIZE: 10,
  CELL_SIZE: Dimensions.get('screen').width > 390 ? 35 : 30
}