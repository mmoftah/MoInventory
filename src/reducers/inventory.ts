import Actions from '../actions/action-types';
import { InventoryState } from '../store/store';
import { defaultInitialState } from '../store/defaultInitialState';

export const inventory = (state: InventoryState = defaultInitialState.inventory, action: any) => {
  switch (action.type) {
    case Actions.INVENTORY_OPEN: {
      const newState = {...state};
      newState.items = {0: {image: "https://icons.iconarchive.com/icons/google/noto-emoji-objects/1024/62964-pistol-icon.png"},
                        1: {image: "https://cdn.onlinewebfonts.com/svg/img_506237.png"},
                        8: {image: "https://png.pngtree.com/png-vector/20190328/ourlarge/pngtree-vector-water-bottle-icon-png-image_872322.jpg"},
                        12: {image: "https://icons-for-free.com/iconfiles/png/512/burger-131983756831658909.png"},
                        25: {image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYyLA1YkiNclsQ7FC9Ec_lD5LahU0qvI32hQ"}};
      return newState;
    }

    case Actions.INVENTORY_CLOSE: {
      return {
        ...state,
        items: []
      }
    }

    case Actions.INVENTORY_MOVE: {
        return {
          ...state,
          items: {
            ...state.items,
            [action.startIndex]: state.items[action.endIndex],
            [action.endIndex]: state.items[action.startIndex]
          }
        }
    }

    default:
      return state;
  }
}
