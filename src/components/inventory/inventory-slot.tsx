import React from 'react';
import styles from './inventory.module.css';
import { InventoryItem } from '../../store/store';
import { Droppable, Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";

export interface InventorySlotProps {
  item: InventoryItem;
  index: number;
  onContextMenu: (event: any) => void;
}

export class InventorySlot extends React.PureComponent<InventorySlotProps> {
  constructor(props: InventorySlotProps) {
    super(props);
  }

  getStyleClassNames(snapshot: DraggableStateSnapshot): string {
    let classes = styles.inventory_item;
    if (snapshot.isDropAnimating) {
      classes = classes + " " + styles.disable_transition_inventory_item;
    } else if (!snapshot.isDragging) {
      classes = classes + " " + styles.disable_animation_inventory_item;
    }

    return classes;
  }

  render() {
    return (
      <Droppable droppableId={`${this.props.index}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={styles.inventory_slot}
            {...provided.droppableProps}
          >
          {this.props.item &&
            <Draggable draggableId={`${this.props.index}`} index={this.props.index}>
              {(provided, snapshot) => (
                <img
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={this.getStyleClassNames(snapshot)}
                  src={this.props.item.image} alt={"item"}
                  onContextMenu={this.props.onContextMenu}
                />
              )}
            </Draggable>
          }
        </div>
        )}
      </Droppable>
    );
  }
};

export default InventorySlot;