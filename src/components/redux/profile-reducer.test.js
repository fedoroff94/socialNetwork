import React from 'react';
import profileReducer, {addPostActionCreator, deletePostAC} from "./profile-reducer";

let state = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: '12', dislikesCount: '3'},
        {id: '2', message: 'It is my first post', likesCount: '11', dislikesCount: '4'}
    ]
};

it('new posts length is correct', () => {
    // data test
    let action = addPostActionCreator('IT-KAMASUTRA.COM');

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(3);
});

//Test 2

it('new post name should be correct', () => {
    // data test
    let action = addPostActionCreator('IT-KAMASUTRA.COM');

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts[2].message).toBe('IT-KAMASUTRA.COM');

});

it('length after deleting should be decremented', () => {
    // data test
    let action = deletePostAC(1);

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(1);

});