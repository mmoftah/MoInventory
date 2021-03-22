import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Inventory from '../components/inventory/inventory'
import * as actions from '../actions/inventory';
import { InitialState } from '../store/store';


const mapStateToProps = (state: InitialState) => {
  return {
    items: state.inventory.items
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onOpenInventory: () => dispatch(actions.open()),
  onCloseInventory: () => dispatch(actions.close()),
  onMoveItem: (startIndex: number, endIndex: number) => dispatch(actions.moveItem(startIndex, endIndex)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);