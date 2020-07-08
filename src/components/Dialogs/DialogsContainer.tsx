import { actions } from '../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { appStateType } from "../redux/redux-store";

const mapStateToProps = (state: appStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
};

//High order Component --- HOC
// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose<React.ComponentType>(
  connect(mapStateToProps,
      {...actions}),
  withAuthRedirect
)(Dialogs);