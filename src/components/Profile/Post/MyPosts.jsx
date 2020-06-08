import React from 'react';
import Post from './Post.jsx';
import {Field, reduxForm} from 'redux-form';
import {MaxLengthCreator, required} from "../../../utils/validators/validstors";
import {Textarea} from "../../../assets/common/FormsControls/FormsControls";

const MyPosts = (props) => {
    console.log('RENDER')
    console.log(props)

    let postElements = [...props.posts]
        .reverse()
        .map(p => <Post id={p.id} key={p.id} message={p.message}
                                                  likesCount={p.likesCount}
                                                  dislikesCount={p.dislikesCount}/>
    );

    let onAddPost = (values) => {
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

const MaxLength10 = MaxLengthCreator(10);

const addPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} placeholder={'Post message'} component={Textarea} type={'text'}
                       validate={[required, MaxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: 'addNewPostForm'})(addPostForm);

export default MyPosts;