import { sendMessageCreator } from '../redux/dialogs-reducer';
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (newMessageBody: string) => {dispatch(sendMessageCreator(newMessageBody))}
  }
};

//High order Component --- HOC
// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);