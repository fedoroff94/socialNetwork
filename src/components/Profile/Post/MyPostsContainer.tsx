import {actions} from '../../redux/profile-reducer';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { appStateType } from "../../redux/redux-store";

const mapStateToProps = (state: appStateType) => {
    return {
        posts: state.profilePage.posts,
        // newPostText: state.profilePage.newPostText
    }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, appStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;