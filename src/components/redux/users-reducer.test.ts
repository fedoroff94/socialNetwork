import usersReducer, { actions, initialStateType } from "./users-reducer";

let state: initialStateType;

beforeEach(() => {
    state = {
        users: [
            {name: 'Artem 0', id: 0, followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {name: 'Artem 1', id: 1, followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {name: 'Artem 2', id: 2, followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {name: 'Artem 3', id: 3, followed: true, photos: {small: null, large: null}, status: 'status 3'}

        ],
        totalItemsCount: 20,
        pageSize: 5,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        portionSize: 10
    };
});

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2));
    expect(newState.users[2].followed).toBeFalsy();
});