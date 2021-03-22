import Action from './action-types'

export const open = () => {
  return {
    type: Action.INVENTORY_OPEN,
  }
}

export const close = () => {
  return {
    type: Action.INVENTORY_CLOSE,
  }
}

export const moveItem = (startIndex: number, endIndex: number) => {
  return {
    type: Action.INVENTORY_MOVE,
    startIndex: startIndex,
    endIndex: endIndex,
  }
}
