import profileReducer, {actions} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'The first post', likesCount: 1, dislikesCount: 1},
        {id: 2, message: 'The second post', likesCount: 2, dislikesCount: 2}
    ],
    profile: null,
    status: '',
    newPostText: ''
};

it('new posts length is correct', () => {
    // data test
    let action = actions.addPostActionCreator('IT-KAMASUTRA.COM');

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(3);
});

//Test 2

it('new post name should be correct', () => {
    // data test
    let action = actions.addPostActionCreator('IT-KAMASUTRA.COM');

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts[2].message).toBe('IT-KAMASUTRA.COM');

});

it('length after deleting should be decremented', () => {
    // data test
    let action = actions.deletePostAC(1);

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(1);

});