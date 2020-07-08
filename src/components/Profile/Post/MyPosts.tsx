import React from 'react';
import { AddPostFormRedux, AddPostFormValuesType } from "../AddPostForm/AddPostForm";
import Post from "./Post";
import { postType } from "../../../types/types";

export type MapPropsType = {
    posts: Array<postType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    console.log('RENDER')
    console.log(props)

    let postElements = [...props.posts]
        .reverse()
        .map(p => <Post id={p.id} key={p.id} message={p.message}
                                                  likesCount={p.likesCount}
                                                  dislikesCount={p.dislikesCount}/>
    );

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div>
            <div className='form'>
                <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    )
};

const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;