import React from 'react';
import styles from './inventory.module.css';
import { InventoryItem } from '../../store/store';
import { InventorySlot } from './inventory-slot'
import { DragDropContext } from "react-beautiful-dnd";

export interface InventoryProps {
  items: {[slot: number]: InventoryItem};

  onOpenInventory: () => void;
  onCloseInventory: () => void;
  onMoveItem: (startIndex: number, endIndex: number) => void;
}
  
export interface InventoryState {
  context_menu: any;
  inventory_items: InventoryItem[];
  is_visible: boolean;
}

export class Inventory extends React.PureComponent<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);
    this.props.onOpenInventory();
    this.state = {
      context_menu: {
        visible: false, 
        styles: {
          top: '0px',
          left: '0px',
        }
      },
      inventory_items: new Array(40).fill(null),
      is_visible: false,
    }

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.onMessage);
  }
  
  componentWillUnmount() {
    window.removeEventListener('message', this.onMessage);
  }

  componentDidUpdate(prevProps: InventoryProps) {
    if (this.props.items === prevProps.items)
      return;
    let inventory_items: InventoryItem[] = new Array(40).fill(null);
    
    for (const key in this.props.items){
      inventory_items[key] = this.props.items[key];
    }
    this.setState({ inventory_items });
  }

  onMessage = (event: MessageEvent) => {
    if (event.data.action === 'display') {
      this.onOpenInventory();
    }
  }

  onOpenInventory() {
    this.setState({
      is_visible: true,
    });
  }

  onCloseInventory() {
    fetch('http://mo_custom_inventory/closeInventory', { method: 'POST' });
    this.setState({
      is_visible: false,
    });
  }

  onContextMenu(event: any) {
    // Avoid the real one
    event.preventDefault();
    
    // Show contextmenu
    this.setState({
      context_menu: {
        visible: true,
        styles: {
          top: `${event.pageY}px`,
          left: `${event.pageX}px`,
        }
      }
    });
  };

  onContextMenuLeave() {
    // hide contextmenu
    this.setState({
      context_menu: {
        visible: false
      }
    });
  }
  
  onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.props.onMoveItem(+result.source.droppableId, +result.destination.droppableId);
  }

  render() {
    if (!this.state.is_visible)
      return <></>
    return (
      <div id={styles.page}>
        <div id={styles.main_container}>
          <button id={styles.close} onClick={() => this.onCloseInventory()}>X</button>
          
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div id={styles.inventory}>
              {this.state.context_menu.visible &&
                <ul id={styles.custom_menu} 
                    style={this.state.context_menu.styles}
                    onMouseLeave={() => this.onContextMenuLeave()}>
                  <li data-action = "first">First thing</li>
                  <li data-action = "second">Second thing</li>
                  <li data-action = "third">Third thing</li>
                </ul>
              }
              
              {this.state.inventory_items.map((item, index) => (
                <InventorySlot index={index} key={index} item={item} onContextMenu={this.onContextMenu}/>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
};

export default Inventory;